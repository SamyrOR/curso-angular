import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onChange(event) {
    console.log(event);
    const selectdFiles = <FileList>event.srcElement.files;
    document.querySelector(
      '.custom-file-label'
    )?.innerHTML = selectdFiles[0].name;

    const fileNames = [];
    for (let i = 0; i < selectdFiles.length; i++) {
      fileNames.push(selectdFiles[i].name);
    }
    document.querySelector('.custom-file-label')?.innerHTML = fileNames.join(
      ', '
    );
  }
}
