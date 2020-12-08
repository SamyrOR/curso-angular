import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  files?: Set<File>;
  constructor(private service: UploadFileService) {}

  ngOnInit(): void {}

  onChange(event: Event) {
    console.log(event);
    const selectdFiles = <FileList>event.srcElement.files;
    document.querySelector('.custom-file-label').innerHTML =
      selectdFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i = 0; i < selectdFiles.length; i++) {
      fileNames.push(selectdFiles[i].name);
      this.files.add(selectdFiles[i]);
    }
    document.querySelector('.custom-file-label')?.innerHTML = fileNames.join(
      ', '
    );
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service
        .upload(this.files, 'http://localhost:8000/upload')
        .subscribe((response) => console.log('Upload Concluído'));
    }
  }
}
