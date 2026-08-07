import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslocoService} from '@ajf/core/transloco';
import {Capacitor} from '@capacitor/core';
import {Directory} from '@capacitor/filesystem';
import write_blob from 'capacitor-blob-writer';
import {from} from 'rxjs';
import {take} from 'rxjs/operators';
import {ajfCommonFunctions} from '../../../ajf-functions/ajf-functions.common';
import {acceptTermsContent, pandinoUrl} from '../conf';

@Component({
  selector: 'dinoapp-datachat',
  templateUrl: './datachat.component.html',
  styleUrls: ['./datachat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DataChatComponent {
  ajfCustomFunctions = ajfCommonFunctions;
  baseDataChatAPIurl = pandinoUrl;
  validateEndpoint = 'validateapikey';
  startEndpoint = 'startdatachat';
  endEndpoint = 'enddatachat';
  dataChatEndpoint = 'datachat';
  endpointUrls = {
    validateEndpoint: this.validateEndpoint,
    startEndpoint: this.startEndpoint,
    endEndpoint: this.endEndpoint,
    dataChatEndpoint: this.dataChatEndpoint,
  };
  acceptTermsContent = acceptTermsContent;

  constructor(private _snackBar: MatSnackBar, private _ts: TranslocoService) {}

  /**
   * Saves a DataChat export file, downloaded by the DataChat component.
   * @param blob The downloaded file
   * @param filename The file name suggested by the DataChat API
   */
  saveExport(blob: Blob, filename: string): void {
    if (Capacitor.getPlatform() !== 'web') {
      from(
        write_blob({
          path: filename,
          directory: Directory.Documents,
          blob,
          on_fallback(error) {
            console.error(error);
          },
        }),
      )
        .pipe(take(1))
        .subscribe(() =>
          this._snackBar.open(
            this._ts.translate('Export file saved in your Documents folder'),
            'EXPORT SAVED',
            {duration: 10000},
          ),
        );
    } else {
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename;
      link.click();
      setTimeout(() => window.URL.revokeObjectURL(objectUrl));
    }
  }
}
