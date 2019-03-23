import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss']
})
export class GallaryComponent implements OnInit {

  url: string;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.url = this.dataService.getUrl();
  }

}
