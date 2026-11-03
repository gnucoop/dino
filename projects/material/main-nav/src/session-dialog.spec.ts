import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TRANSLATIONS_CONFIG, TranslationsConfig} from '@dino/core/translations';
import {BehaviorSubject, Observable} from 'rxjs';
import {
  MainNavModule,
  SessionDeleteBlock,
  SessionDialog,
  SessionDialogData,
  SessionDialogKind,
} from './public_api';

const defaultLanguageConfig: TranslationsConfig = {
  defaultLanguage: 'ENG',
};

describe('SessionDialog', () => {
  let closeSpy: jasmine.Spy;

  const render = (
    kind: SessionDialogKind,
    deleteBlocked?: Observable<SessionDeleteBlock>,
  ): ComponentFixture<SessionDialog> => {
    const data: SessionDialogData = {kind, deleteBlocked};
    closeSpy = jasmine.createSpy('close');
    TestBed.configureTestingModule({
      imports: [MainNavModule],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: data},
        {provide: MatDialogRef, useValue: {close: closeSpy}},
        {provide: TRANSLATIONS_CONFIG, useValue: defaultLanguageConfig},
      ],
    });
    const fixture = TestBed.createComponent(SessionDialog);
    fixture.detectChanges();
    return fixture;
  };

  afterEach(() => TestBed.resetTestingModule());

  it('offers, on a logout, the choice between deleting the data and keeping it', () => {
    const fixture = render('logout');
    const buttons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('button'),
    );

    // Three, and no more: delete, keep, and change your mind.
    expect(buttons.length).toBe(3);

    fixture.nativeElement.querySelector('.dino-session-dialog-logout-button').click();
    expect(closeSpy).toHaveBeenCalledWith('logout');

    fixture.nativeElement.querySelector('.dino-session-dialog-keep-button').click();
    expect(closeSpy).toHaveBeenCalledWith('end-session');

    fixture.nativeElement.querySelector('.dino-session-dialog-cancel-button').click();
    expect(closeSpy).toHaveBeenCalledWith(undefined);
  });

  it('holds back only the delete choice while the sync runs, and frees it when the sync ends', () => {
    const block = new BehaviorSubject<SessionDeleteBlock>('syncing');
    const fixture = render('logout', block);
    const deleteButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.dino-session-dialog-logout-button',
    );
    const keepButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.dino-session-dialog-keep-button',
    );

    expect(deleteButton.disabled).toBeTrue();
    expect(
      fixture.nativeElement.querySelector('.dino-session-dialog-delete-blocked'),
    ).not.toBeNull();
    // Refused even if the click gets through: that is the data loss the block is for.
    fixture.componentInstance.respond('logout');
    expect(closeSpy).not.toHaveBeenCalled();
    // Keeping the data deletes nothing, so it is the way out a stuck sync must not take away.
    expect(keepButton.disabled).toBeFalse();
    keepButton.click();
    expect(closeSpy).toHaveBeenCalledWith('end-session');

    block.next(null);
    fixture.detectChanges();
    expect(deleteButton.disabled).toBeFalse();
    expect(fixture.nativeElement.querySelector('.dino-session-dialog-delete-blocked')).toBeNull();
    deleteButton.click();
    expect(closeSpy).toHaveBeenCalledWith('logout');
  });

  it('holds back the delete choice while offline', () => {
    const fixture = render('logout', new BehaviorSubject<SessionDeleteBlock>('offline'));

    expect(
      fixture.nativeElement.querySelector('.dino-session-dialog-logout-button').disabled,
    ).toBeTrue();
    expect(
      fixture.nativeElement.querySelector('.dino-session-dialog-keep-button').disabled,
    ).toBeFalse();
  });

  it('offers, on an expired session, the login page or nothing at all', () => {
    const fixture = render('session-expired');

    fixture.nativeElement.querySelector('.dino-session-dialog-login-button').click();
    // Ending the session is what makes the login page reachable, and it keeps the
    // data collected on this device.
    expect(closeSpy).toHaveBeenCalledWith('end-session');

    fixture.nativeElement.querySelector('.dino-session-dialog-cancel-button').click();
    expect(closeSpy).toHaveBeenCalledWith(undefined);
  });

  it('offers no action at all when the server refuses the data', () => {
    const fixture = render('data-refused');
    const buttons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('button'),
    );

    // The whole point of this message: nothing here may end the session. A logout
    // would destroy the very data the user still has to export, and a login fixes
    // nothing - the server refuses the documents, it is not asking for a token.
    expect(buttons.length).toBe(1);

    buttons[0].click();
    expect(closeSpy).toHaveBeenCalledWith(undefined);
    expect(closeSpy).not.toHaveBeenCalledWith('logout');
    expect(closeSpy).not.toHaveBeenCalledWith('end-session');
  });
});
