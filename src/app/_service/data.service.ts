import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Employee } from 'src/app/_model/employee';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private URL = 'http://localhost:2018';

  constructor(private http: HttpClient) { }

  getUrl() {
    return this.URL;
  }

  // 后臺適用express，此處傳JSON參數，才能解析，使用JSON.stringify()之後無法獲取
  login(username, password) {
    // return this.http.post(this.URL + '/login', JSON.stringify({ acc: username, pwd: password }));
    return this.http.post(this.URL + '/login', { acc: username, pwd: password });
  }

  queryEmployee(employeName) {
    return this.http.post(this.URL + '/querydata', { name: employeName });
  }


  queryEmployeeBySp(empsex, empage) {
    return this.http.post(this.URL + '/callsptest', { sex: empsex, age: empage });
  }


  insertEmployee(emp: Employee) {
    return this.http.post(this.URL + '/insertdata', emp);
  }

  updateEmployee(emp: Employee) {
    return this.http.post(this.URL + '/updatedata', emp);
  }

  deleteEmployee(emp: Employee) {
    return this.http.post(this.URL + '/deletedata', emp);
  }

  upload(files: Set<File>) {
    const status = {};
    files.forEach(file => {
      const fd = new FormData();
      fd.append('Filename', file, file.name);
      const req = new HttpRequest('POST', this.URL + '/up', fd, {
        reportProgress: true
      });
      const progress = new Subject<number>();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          const msg = JSON.parse(JSON.stringify(event.body));
          if (!msg.IsSuccess) {
            status[file.name] = {
              progress: progress.unsubscribe(),
            };
            console.log(file.name, '上傳失敗，原因：', msg.Message);
            alert(file.name + '上傳失敗，原因：' + msg.Message);
          } else {
            progress.complete();
          }
        }
      });
      status[file.name] = {
        progress: progress.asObservable()
      };
    });
    return status;
  }

  queryFile() {
    return this.http.post(this.URL + '/queryfile', {});
  }

  downloadFile(filename) {
    return this.http.post(this.URL + '/down', { 'name': filename }, { responseType: 'blob' });
  }

  queryAccessCount() {
    return new Observable<string>(obs => {
      const es = new EventSource('http://localhost:2018/sse');
      es.addEventListener('totalCount', (evt: MessageEvent) => {
        obs.next(evt.data);
      });
      return () => es.close();
    });
  }

}
