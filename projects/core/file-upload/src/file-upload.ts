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

import {AjfFile} from '@ajf/core/file-input';
import {HttpClient} from '@angular/common/http';
import {Inject, Injectable, isDevMode} from '@angular/core';
import {AuthService, AuthServiceConfig, AUTH_SERVICE_CONFIG} from '@dino/core/auth';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {StorageUploadResponse} from './file-upload-response';

export const storageEndpoint = '/files';

/**
 * Service that can upload files on cloud
 */
@Injectable({providedIn: 'root'})
export class FileUploadService {
  /**
   * The Auth service configuration settings stream.
   */
  private _authConfig: BehaviorSubject<AuthServiceConfig>;
  get authConfig(): AuthServiceConfig {
    return this._authConfig.value;
  }

  private _baseUrl: string;

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService,
    @Inject(AUTH_SERVICE_CONFIG) readonly config: AuthServiceConfig,
  ) {
    this._authConfig = new BehaviorSubject<AuthServiceConfig>(this.config);
    this._baseUrl = this._removeSlashes(this._authConfig.value.host);
  }

  /**
   * Upload a file into the nhost storage
   * @param fileToUpload the File to be uploaded in nhost storage
   * @returns An observable with the response of the upload
   */
  uploadFileInStorage(file: File): Observable<StorageUploadResponse | null> {
    if (file == null) {
      return obsOf(null);
    }
    return this._authConfig.pipe(
      switchMap(config => {
        const url = this._generateUrl(
          storageEndpoint,
          this._removeSlashes(config.host.replace('auth', 'storage')),
        );
        const headers =
          config.apiKey != null
            ? {Authorization: config.apiKey}
            : {Authorization: `Bearer ${this._authService.getAuthToken()}`};

        const formData = new FormData();
        formData.append('file', file);
        return this._httpClient.post<StorageUploadResponse>(url, formData, {headers}).pipe(
          map(res => {
            if (res != null) {
              const filePublicUrl = url + '/' + res.id;
              return {...res, filePublicUrl} as StorageUploadResponse;
            }
            return {isUploaded: false} as StorageUploadResponse;
          }),
          catchError(err => {
            if (isDevMode()) {
              console.log(err.error ?? err);
            }
            return obsOf({
              isUploaded: false,
              error: err.error,
            } as StorageUploadResponse);
          }),
        );
      }),
    );
  }

  /**
   * Upload a file into the nhost storage
   * @param fileToUpload the AjfFile to be uploaded in nhost storage
   * @returns An observable with the response of the upload
   */
  uploadFile(fileToUpload: AjfFile): Observable<StorageUploadResponse | null> {
    if (fileToUpload == null || fileToUpload.content == null || fileToUpload.content.length === 0) {
      return obsOf(null);
    }
    const blob = this._convertBase64ToBlob(fileToUpload.content);
    const file = new File([blob], fileToUpload.name);
    return this.uploadFileInStorage(file);
  }

  /**
   * Upload a list of files into the nhost storage
   * @param filesToUpload the AjfFile list to be uploaded in nhost storage
   * @returns A list observable with the response of the uploads
   */
  uploadFiles(files: AjfFile[]): Observable<StorageUploadResponse | null>[] {
    const apiCall: Observable<StorageUploadResponse | null>[] = [];
    if (files) {
      files.forEach(file => {
        if (file) {
          const uploadedFileObs = this.uploadFile(file);
          apiCall.push(uploadedFileObs);
        }
      });
    }
    return apiCall;
  }

  /**
   * Delete a file from the nhost storage
   * @param url the url to be deleted in nhost storage
   * @returns An observable with the response of the delete
   */
  deleteFile(url: string): Observable<any> {
    if (url == null) {
      return obsOf(null);
    }
    return this._authConfig.pipe(
      switchMap(config => {
        const headers =
          config.apiKey != null
            ? {Authorization: config.apiKey}
            : {Authorization: `Bearer ${this._authService.getAuthToken()}`};

        return this._httpClient.delete<any>(url, {headers}).pipe(
          catchError(err => {
            if (isDevMode()) {
              console.log(err.error ?? err);
            }
            return obsOf({error: err});
          }),
        );
      }),
    );
  }

  /**
   * Delete a list of files from the nhost storage
   * @param files the list of AjfFile to be deleted in nhost storage
   * @returns A list observable with the response of the delete
   */
  deleteFiles(files: AjfFile[]): Observable<any>[] {
    const apiCall: Observable<any>[] = [];
    if (files) {
      files.forEach(file => {
        if (file && file.url) {
          const deleteFileObs = this.deleteFile(file.url);
          apiCall.push(deleteFileObs);
        }
      });
    }
    return apiCall;
  }

  /**
   * Return the files in form, to be uploaded or deleted
   * @param formValue All the form value fields
   * @returns two lists of AjfFile, one to be uploaded, one to be deleted
   */
  getFilesInForm(formValue: {[key: string]: any}): {
    filesToUpload: AjfFile[];
    filesToDelete: AjfFile[];
  } {
    const filesToUpload: AjfFile[] = [];
    const filesToDelete: AjfFile[] = [];
    Object.keys(formValue).forEach(key => {
      if (key !== '$value') {
        if (this.isAjfFileField(formValue[key])) {
          filesToUpload.push(formValue[key] as AjfFile);
        }
        if (this.isAjfFileFieldToDelete(formValue[key])) {
          filesToDelete.push(formValue[key] as AjfFile);
        }
      }
    });
    return {filesToUpload, filesToDelete};
  }

  /**
   * Remove in the form values all the selected file
   * @param formValue All the form value fields
   * @returns The form value without all the file
   */
  removeAllFiles(formValue: {[key: string]: any}): {[key: string]: any} {
    if (formValue) {
      Object.keys(formValue).forEach(key => {
        if (this.isAjfFileField(formValue[key])) {
          formValue[key] = null;
        }
      });
    }
    return formValue;
  }

  /**
   * Return the public url in the storage
   * @param storageResponse The storage service response for a file upload request
   * @returns The public url
   */
  getUploadedFileUrl(storageResponse: StorageUploadResponse): string | null {
    if (
      storageResponse &&
      'isUploaded' in storageResponse &&
      storageResponse['isUploaded'] &&
      'filePublicUrl' in storageResponse &&
      storageResponse['filePublicUrl']
    ) {
      return storageResponse['filePublicUrl'];
    }
    return null;
  }

  /**
   * Replace in the form values the file with the public url in the storage
   * @param formValue All the form value fields
   * @param storageResponse The storage service response for a file upload request
   * @returns The form value with the public url instead of the base64 content file
   */
  replaceUploadedFile(
    formValue: {[key: string]: any},
    storageResponse: StorageUploadResponse,
  ): {[key: string]: any} {
    if (
      formValue &&
      storageResponse &&
      'isUploaded' in storageResponse &&
      storageResponse['isUploaded'] &&
      'filePublicUrl' in storageResponse &&
      storageResponse['filePublicUrl']
    ) {
      Object.keys(formValue).forEach(key => {
        if (
          key !== '$value' &&
          this.isAjfFileField(formValue[key]) &&
          formValue[key]['name'] === storageResponse['name']
        ) {
          formValue[key]['url'] = storageResponse['filePublicUrl'];
          formValue[key]['content'] = '';
        }
      });
    }
    return formValue;
  }

  /**
   * Check if a value is an AjfFile field with a valid content
   * @param value the value to be checked
   * @param uploadSignature if true, signature pngs are uploaded to the storage. Defaults to false.
   * @returns true if the input value is an AjfFile field
   */
  isAjfFileField(value: any, uploadSignature: boolean = false): boolean {
    if (value === null || value === undefined || typeof value !== 'object') {
      return false;
    }
    if ('name' in value && 'content' in value && value['content'] && value['content'].length) {
      if (!uploadSignature && 'signature' in value && value['signature']) {
        return false;
      }
      return true;
    }
    return false;
  }

  /**
   * Check if a value is an AjfFile field with a valid url
   * @param value the value to be checked
   * @returns true if the input value is an AjfFile field
   */
  isAjfFileFieldToDelete(value: any): boolean {
    if (value === null || value === undefined || typeof value !== 'object') {
      return false;
    }
    if ('url' in value && value['url'] && value['url'].length && value['deleteUrl']) {
      return true;
    }
    return false;
  }

  /**
   * Convert a base64 into a Blob
   * @param base64File The base64 file to convert
   * @returns A Blob after base64 conversion
   */
  private _convertBase64ToBlob(base64File: string): Blob {
    const parts = base64File.split(';base64,');
    const fileType = parts[0].split(':')[1];
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: fileType});
  }

  private _removeSlashes(uri: string): string {
    return uri.replace(/^\/+|\/+$/g, '');
  }

  /**
   * Generate a full URL given an authentication endpoint.
   * @param endpoint The authentication endpoint.
   * @returns The full URL
   */
  private _generateUrl(endpoint: string, baseUrl?: string): string {
    return `${baseUrl ?? this._baseUrl}/${this._removeSlashes(endpoint)}`;
  }
}
