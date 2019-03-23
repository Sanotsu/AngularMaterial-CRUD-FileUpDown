import { Component, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { DataService } from 'src/app/_service/data.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @ViewChild('file') file;
  files: Set<File> = new Set();
  progress;
  selectable = true;
  removable = true;
  addOnBlur = true;

  constructor(private dataService: DataService, ) { }

  ngOnInit() {
    of(this.files).subscribe(f => {
      console.log(f);
    });
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {

    if (this.progress) {
      this.files.clear();
      this.progress = null;
    }

    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key]);
      }
    }
  }

  upload() {
    this.progress = this.dataService.upload(this.files);

    console.log(this.progress);
  }

  clear(file: File) {
    this.files.delete(file);
  }

}
