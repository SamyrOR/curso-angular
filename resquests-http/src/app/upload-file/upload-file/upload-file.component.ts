import { Location } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, take, tap } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  files?: Set<File>;
  progress = 0;
  constructor(
    private service: UploadFileService,
    private alertService: AlertModalService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onChange(event: Event) {
    console.log(event);
    const selectdFiles = <FileList>event.srcElement?.files;
    document.querySelector('.custom-file-label').innerHTML =
      selectdFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectdFiles.length; i++) {
      fileNames.push(selectdFiles[i].name);
      this.files.add(selectdFiles[i]);
    }
    document.querySelector('.custom-file-label').innerHTML = fileNames.join(
      ', '
    );
    this.progress = 0;
  }
  reloadComponent() {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['/upload']);
  }
  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service
        .upload(this.files, '/api/upload')
        .pipe(
          uploadProgress((progress) => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(
          (response) => {
            this.alertService.showAlertSuccess('Upload realizado com sucesso');
            this.reloadComponent();
          },

          // (event: HttpEvent<Object>) => {
          //   if (event.type === HttpEventType.Response) {
          //     this.alertService.showAlertSuccess(
          //       'Upload realizado com sucesso'
          //     ),
          //       this.reloadComponent();
          //   } else if (event.type === HttpEventType.UploadProgress) {
          //     const percentDone = Math.round(
          //       (event.loaded * 100) / event.total
          //     );
          //     this.progress = percentDone;
          //   }
          (error) => {
            this.alertService.showAlertDanger(
              'Erro ao realizar o upload, por favor, tente novamente mais tarde'
            );
            this.reloadComponent();
          }
        );
    }
  }

  onDownloadExcel() {
    this.service.donwload('/api/downloadExcel').subscribe((res: any) => {
      const file = new Blob([res], {
        type: res.type,
      });
      //IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file);
        return;
      }
      const blob = window.URL.createObjectURL(file);

      const link = document.createElement('a');
      link.href = blob;
      link.download = 'report.xlsx';
      //link.click();
      link.dispatchEvent(
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      setTimeout(() => {
        window.URL.revokeObjectURL(blob);
        link.remove();
      }, 100);
    });
  }

  onDownloadPDF() {}
}
