import { Component, OnInit, ViewChild } from '@angular/core';
import { ResponseData } from 'src/app/_model/response-data';
import { FormGroup, FormBuilder } from '@angular/forms';
import { WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/websocket';
import { MatDialog, MatTableDataSource, MatPaginator, MatBottomSheet } from '@angular/material';
import { of } from 'rxjs';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';

@Component({
  selector: 'app-ws-crud',
  templateUrl: './ws-crud.component.html',
  styleUrls: ['./ws-crud.component.scss']
})

export class WsCrudComponent implements OnInit {
  dataSource: ResponseData[];
  tableVisible: boolean;
  displayedColumns: string[] = ['name', 'age'];
  fsDisplayedColumns: string[] = ['filename', 'length'];

  wsSpDataSource: ResponseData[];

  wsSptableVisible: boolean;

  form: FormGroup;
  socket$: WebSocketSubject<any>;
  ws$: WebSocketSubject<any>;

  upform: FormGroup;
  resForm: FormGroup;
  insForm: FormGroup;
  spform: FormGroup;

  @ViewChild('file') file;
  files: Set<File> = new Set();

  selectable = true;
  removable = true;
  addOnBlur = true;
  progress: any;
  fsdataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;


  constructor(private fb: FormBuilder, public dialog: MatDialog, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['']
    });

    this.upform = this.fb.group({
      name: ['']
    });

    this.resForm = this.fb.group({
      employeeName: [{ value: '', disabled: true }],
      employeeAgeSlider: [{ value: '', disabled: true }],
      employeeMail: [{ value: '', disabled: true }]
    });

    this.insForm = this.fb.group({
      employeeName: [''],
      employeeAge: [''],
      employeeMail: [''],
      empDate: [''],
      sex: ['']
    });

    this.spform = this.fb.group({
      empsex: [''],
      empage: ['']
    });

    of(this.files).subscribe(f => {
      console.log(f);
    });
  }

  // 單條多條查詢合并，index===1，上面的多條，index===2，下面的單條修改查詢
  wsQueryEmployee(index) {
    let inputName = '';
    if (index === 1) {
      inputName = this.form.get('name').value;
    }
    if (index === 2) {
      inputName = this.upform.get('name').value;
    }

    const m = {
      name: inputName
    };

    this.socket$ = new WebSocketSubject('ws://localhost:2018/wsquerydata');
    this.socket$.next(m);
    this.socket$.subscribe((res) => {
      this.tableVisible = true;
      console.log(res);
      if (res.data) {
        if (index === 1) {
          this.dataSource = res.data;
        }
        if (index === 2) {
          this.resForm.patchValue({
            employeeName: res.data[0].name,
            employeeAgeSlider: res.data[0].age,
            employeeMail: res.data[0].mail
          });
          this.resForm.get('employeeAgeSlider').enable();
          this.resForm.get('employeeMail').enable();
        }
      } else {
        this.openDialog({ title: '失敗', message: '查詢結果為空' });
      }
    },
      (err) => {
        console.error(err);
      },
      () => {
        console.warn('Completed!');
      });
  }

  wsUpdateEmployee() {
    // 傳遞給後臺需要修改的值
    const emp = {
      name: this.resForm.get('employeeName').value,
      age: this.resForm.get('employeeAgeSlider').value,
      mail: this.resForm.get('employeeMail').value
    };
    // 創建ws連接
    this.socket$ = new WebSocketSubject('ws://localhost:2018/wsupdatedata');
    // 通過rxjs的next方法發送ws請求
    this.socket$.next(emp);
    // 處理請求返回
    this.socket$.subscribe((res) => {

      if (res.IsSuccess) {
        this.openDialog({ title: '成功', message: JSON.stringify(res.Message) });
      } else {
        this.openDialog({ title: '失敗', message: '更新失敗' });
      }
    },
      (err) => {
        console.error(err);
      },
      () => {
        console.warn('Completed!');
      });
  }


  wsInsertEmployee() {


    console.log(this.insForm.get('empDate').value);

    const employee = {
      'name': this.insForm.get('employeeName').value,
      'age': this.insForm.get('employeeAge').value,
      'sex': this.insForm.get('sex').value,
      'empDate': this.insForm.get('empDate').value,
      'mail': this.insForm.get('employeeMail').value
    };

    this.socket$ = new WebSocketSubject('ws://localhost:2018/wsinsertdata');
    this.socket$.next(employee);
    this.socket$.subscribe((res) => {

      if (res.IsSuccess) {
        this.openDialog({ title: '成功', message: JSON.stringify(res.Message) });
        this.insForm.reset();
      } else {
        this.openDialog({ title: '失敗', message: '更新失敗' });
      }
    },
      (err) => {
        console.error(err);
      },
      () => {
        console.warn('Completed!');
      });
  }


  wsDeleteEmployee() {

    const emp = {
      name: this.resForm.get('employeeName').value
    };

    this.socket$ = new WebSocketSubject('ws://localhost:2018/wsdeletedata');
    this.socket$.next(emp);
    this.socket$.subscribe((res) => {

      if (res.IsSuccess) {
        this.openDialog({ title: '成功', message: JSON.stringify(res.Message) });
        this.resForm.reset();
        this.upform.reset();
      } else {
        this.openDialog({ title: '失敗', message: '更新失敗' });
      }
    },
      (err) => {
        console.error(err);
      },
      () => {
        console.warn('Completed!');
      });
  }

  wsQueryEmployeeBySp() {
    const emp = {
      sex: this.spform.get('empsex').value,
      age: this.spform.get('empage').value
    };

    this.socket$ = new WebSocketSubject('ws://localhost:2018/wscallsptest');
    this.socket$.next(emp);
    this.socket$.subscribe((res) => {

      if (res.IsSuccess) {

        this.wsSptableVisible = true;
        this.wsSpDataSource = res.ResponseData[0];
        this.spform.reset();
      } else {
        this.openDialog({ title: '失敗', message: '更新失敗' });
      }
    },
      (err) => {
        console.error(err);
      },
      () => {
        console.warn('Completed!');
      });
  }

  /**
   * 使用ws文件上傳相關函數
   */

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
    // 覆蓋websocketsubject的默認配置，主要為了去掉序列化和反序列話中的JSON操作
    const DEFAULT_WEBSOCKET_CONFIG: WebSocketSubjectConfig<any> = {
      url: 'ws://localhost:2018/wsupload',
      deserializer: (e: MessageEvent) => e.data,
      serializer: (value: any) => value,
    };
    // 創建websocket連接
    this.ws$ = new WebSocketSubject(DEFAULT_WEBSOCKET_CONFIG);

    // 構建讀取文件成arraybuffer的函數
    function readAsBytes(file, done) {
      const fr = new FileReader;
      // 注冊了一個onload的事件
      fr.onload = function () {
        done(fr.result);
      };
      fr.readAsArrayBuffer(file);
    }

    // 遍歷所有選中上傳的文件，進行上傳相關操作
    this.files.forEach((file) => {

      // 讀取文件成arraybuffer
      readAsBytes(file, (buf) => {
        // 取得filename
        const fileinfo = {
          name: file.name,
          size: file.size,
          type: file.type
        };
        // 將文件的數據轉為Int8Array數據
        const i8a = new Int8Array(buf);
        /**
         * ws傳兩次，一次為傳輸文件名，一次傳輸文件的數據，後臺會觸發兩次onmessage事件，
         * 但是第一次傳的msg是string類型，第二次是int8Array（object），
         * 所以在onmessge事件中以msg的類型來分別取得filename和filedata，存到文件中
         */
        this.ws$.next(JSON.stringify(fileinfo));
        this.ws$.next(i8a);
      });
    });

    // 文件傳輸完之後的回調處理
    this.ws$.subscribe((res) => {
      if (JSON.parse(res).IsSuccess) {
        this.openDialog({ title: '成功', message: JSON.stringify(JSON.parse(res).Message) });
        this.progress = 1;
      } else {
        this.openDialog({ title: '失敗', message: '上傳失敗' });
      }
    },
      (err) => {
        console.error(err);
      },
      () => {
        console.warn('Completed!');
      });
  }

  clear(file: File) {
    this.files.delete(file);
  }

  /**
   *
   * 使用ws文件下載相關
   */

  // 文件查詢
  queryFile() {
    this.socket$ = new WebSocketSubject('ws://localhost:2018/wsqueryfile');
    this.socket$.next('all');

    this.socket$.subscribe((res) => {

      if (res.IsSuccess) {
        this.fsdataSource = new MatTableDataSource(res.ResponseData);
        this.fsdataSource.paginator = this.paginator;
      } else {
        this.openDialog({ title: '失敗', message: '查詢文件失敗' });
      }
    },
      (err) => {
        console.error(err);
      },
      () => {
        console.warn('Completed!');
      });
  }

  // 文件下載
  download(name) {
    this.bottomSheet.open(BottomSheetComponent);
    this.socket$ = new WebSocketSubject('ws://localhost:2018/wsdownlaod');
    this.socket$.next(name);
    this.socket$.subscribe((res) => {

      // 將數據庫中傳回的buffer轉為blob，
      const array = new Uint8Array(res.filedata.data);
      const blob = new Blob(
        [array],
        {
          type: 'application/octet-stream'
        }
      );

      this.bottomSheet.dismiss();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = name;
      a.click();
      a.remove();
    });
  }

  openDialog(data) {

    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '250px',
      data: { title: data.title, message: data.message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
