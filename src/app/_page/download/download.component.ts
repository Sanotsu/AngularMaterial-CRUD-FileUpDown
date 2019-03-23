import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatBottomSheet } from '@angular/material';
import { ResponseData } from 'src/app/_model/response-data';
import { DataService } from 'src/app/_service/data.service';
import { BottomSheetComponent } from 'src/app/_page/bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

  dataSource: MatTableDataSource<ResponseData>;
  displayedColumns: string[] = ['filename', 'length'];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private dataService: DataService, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }

  queryFile() {
    this.dataService.queryFile().subscribe((res: ResponseData) => {

      this.dataSource = new MatTableDataSource(res.ResponseData);
      this.dataSource.paginator = this.paginator;
    });
  }

  download(name) {
    this.bottomSheet.open(BottomSheetComponent);
    this.dataService.downloadFile(name).subscribe((res) => {

      console.log(res);

      this.bottomSheet.dismiss();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(res);
      a.download = name;
      a.click();
      a.remove();
    });
  }
}
