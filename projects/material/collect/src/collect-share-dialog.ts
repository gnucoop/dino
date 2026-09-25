/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {Clipboard} from '@angular/cdk/clipboard';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormMetricSelector} from '@dino/material/form-metric-selector';
import {Subscription} from 'rxjs';
import {startWith} from 'rxjs/operators';

/**
 * The data of the public link dialog.
 */
export interface CollectShareDialogData {
  /**
   * The id of the public form schema.
   */
  schemaId: string;

  /**
   * The name shown under the title.
   */
  label: string;

  /**
   * True if the form can have one or more null metrics.
   */
  hasOptionalMetrics: boolean;

  /**
   * The secondary metric fields shown next to each metric option.
   */
  secondaryMetricFieldsDisplayed: {[metricName: string]: string | string[]} | null;
}

/**
 * Shows the public link of a form, with a button to copy it and one to open it.
 *
 * The metrics picked in the embedded metric selector are appended to the link as
 * `?<metric>=<id>`, so that the public form opens with them already set.
 */
@Component({
  selector: 'dino-collect-share-dialog',
  templateUrl: 'collect-share-dialog.html',
  styleUrls: ['collect-share-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CollectShareDialog implements AfterViewInit, OnDestroy {
  /**
   * The route params the metric selector reads the form schema from.
   */
  readonly routeParams: {[key: string]: string};

  /**
   * The public link of the form: the `/f/:form_schema_id` route of the app, with the
   * picked metrics.
   */
  url: string;

  /**
   * False while the metric selection is not valid: the link cannot be copied then.
   */
  valid = true;

  /**
   * True once the link has been copied, to confirm it on the button. Changing the
   * metrics clears it, since the copied link is no longer the one shown.
   */
  copied = false;

  @ViewChild(FormMetricSelector) metricSelector?: FormMetricSelector;

  private _baseUrl: string;
  private _metricsSub = Subscription.EMPTY;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: CollectShareDialogData,
    private _clipboard: Clipboard,
    private _cdr: ChangeDetectorRef,
  ) {
    this.routeParams = {'form_schema_id': data.schemaId};
    this._baseUrl = `${window.location.origin}/f/${data.schemaId}`;
    this.url = this._baseUrl;
  }

  ngAfterViewInit(): void {
    const formMetrics = this.metricSelector?.formMetrics;
    if (formMetrics == null) {
      return;
    }
    this._metricsSub = formMetrics.valueChanges
      .pipe(startWith(formMetrics.value))
      .subscribe(value => {
        // Deferred: the first value arrives while this view is being checked.
        Promise.resolve().then(() => {
          const url = shareUrlWithMetrics(this._baseUrl, value);
          this.copied = this.copied && url === this.url;
          this.url = url;
          this.valid = formMetrics.valid;
          this._cdr.markForCheck();
        });
      });
  }

  copy(): void {
    if (this.valid) {
      this.copied = this._clipboard.copy(this.url);
    }
  }

  ngOnDestroy(): void {
    this._metricsSub.unsubscribe();
  }
}

/**
 * Appends the picked metrics to a public form link, as `?<metric>=<id>&…`. A metric with
 * no option picked (empty, or still being typed) is left out.
 * @param baseUrl The link of the public form.
 * @param metrics The value of the metric selector, keyed by metric name.
 */
export function shareUrlWithMetrics(
  baseUrl: string,
  metrics: {[metric: string]: {option?: {id?: string} | null} | string | null} | null,
): string {
  const params = Object.entries(metrics ?? {})
    .map(([metric, value]) => {
      const id = value != null && typeof value === 'object' ? value.option?.id : null;
      return id != null ? `${metric}=${id}` : null;
    })
    .filter((param): param is string => param != null);
  return params.length > 0 ? `${baseUrl}?${params.join('&')}` : baseUrl;
}
