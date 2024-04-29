import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-text-input-autocomp',
  templateUrl: 'text-input-autocomp.html',
  styleUrls: ['text-input-autocomp.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TextInputAutocomp {
  @Input() label: string = '';
  private _options: string[] = [];
  @Input()
  get options(): string[] {
    return this._options;
  }
  set options(opts: string[]) {
    this._options = opts;
    this.filteredOptions = opts;
  }

  showClearButton = false;
  filteredOptions: string[] = [];

  @ViewChild('input', {static: false, read: ElementRef}) input!: ElementRef<HTMLInputElement>;

  constructor(private cdr: ChangeDetectorRef) {}

  onInput() {
    const val = this.input.nativeElement.value.toLowerCase();
    this.showClearButton = val !== '';
    this.filteredOptions = this._options.filter(opt => opt.toLowerCase().includes(val));
    this.cdr.markForCheck();
  }

  onSelect() {
    this.showClearButton = true;
    this.cdr.markForCheck();
  }

  clear(event: Event) {
    event.stopPropagation();
    this.input.nativeElement.value = '';
    this.showClearButton = false;
    this.filteredOptions = this._options;
    this.cdr.markForCheck();
  }
}
