import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from '@dino/core/auth';
import {FileUploadService} from '@dino/core/file-upload';
import {take} from 'rxjs';
import {namespaces, pandinoUrl, graphqlUrl, filesUrl} from '../conf';
import {Apollo, gql} from 'apollo-angular';
import {HttpHeaders} from '@angular/common/http';

const storeEndpoint = pandinoUrl + '/storeragfile';
// const storeEndpoint = "http://127.0.0.1:5000/storeragfile";

interface File {
  id: string;
  name: string;
  createdAt?: string;
  mimeType?: string;
  metadata?: {[key: string]: string};
}

@Component({
  selector: 'dinoapp-rag',
  templateUrl: './rag.component.html',
  styleUrls: ['./rag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RagComponent {
  readonly filesUrl = filesUrl;

  files: File[] = [];
  namespaces = namespaces == null || namespaces.length === 0 ? [''] : namespaces;
  namespace = this.namespaces[0];
  statusMessage = 'Select a file';
  fileUrl = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private upload: FileUploadService,
    private auth: AuthService,
    apollo: Apollo,
  ) {
    const token = auth.authToken.getValue() || '';
    const headers = (new HttpHeaders()).set('Authorization', 'Bearer ' + token);
    const query = gql<{files: File[]}, {}>(`query Pippo {
      files {
        id
        name
        createdAt
        mimeType
        metadata
      }
    }`);
    apollo.query({query, context: {headers}, errorPolicy: 'all'}).pipe(take(1)).subscribe(res => {
      this.files = [...res.data.files];
      cdr.markForCheck();
    });
  }

  onNamespaceChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.namespace = select.value;
    console.log('Namespace set to ' + this.namespace);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files == null || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    if (!(
      file.name.endsWith('.txt') ||
      file.name.endsWith('.mp3') ||
      file.name.endsWith('.jpg') ||
      file.name.endsWith('.jpeg') ||
      file.name.endsWith('.png') ||
      file.name.endsWith('.pdf') ||
      file.name.endsWith('.md')
    )) {
      this.statusMessage = 'Unsupported file type';
      this.fileUrl = '';
      this.cdr.markForCheck();
      return;
    }
    this.statusMessage = 'Uploading file to storage...';
    this.fileUrl = '';
    this.cdr.markForCheck();

    this.upload.uploadFileInStorage(file).pipe(take(1)).subscribe(async resp => {
      if (resp == null || resp.filePublicUrl == null) {
        this.statusMessage = "Error: unable to retrieve file's public url";
        this.cdr.markForCheck();
        return;
      }
      this.statusMessage = 'File uploaded, parsing file contents...';
      this.fileUrl = resp.filePublicUrl;
      this.cdr.markForCheck();

      const data = new FormData();
      data.append('graphqlUrl', graphqlUrl);
      data.append('authToken', this.auth.authToken.getValue() || '');
      data.append('file', file);
      data.append('namespace', this.namespace);
      data.append('url', resp.filePublicUrl);

      try {
        const response = await fetch(storeEndpoint, {body: data, method: 'post'});
        const text = await response.text();
        if (response.ok) {
          this.statusMessage = 'File parsed successfully';
          console.log(text);
          this.files.push({id: resp.id, name: file.name});
        } else {
          this.statusMessage = `Error ${response.status}: ${text}`;
        }
      } catch (err: any) {
        this.statusMessage = err.message;
      }
      this.cdr.markForCheck();
    });
  }
}
