import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  url: string;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.url = this.dataService.getUrl();
  }
}
