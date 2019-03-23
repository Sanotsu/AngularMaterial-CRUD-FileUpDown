import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadComponent } from 'src/app/_page/download/download.component';
import { UploadComponent } from 'src/app/_page/upload/upload.component';
import { DeleteDataComponent } from 'src/app/_page/delete-data/delete-data.component';
import { UpdateDataComponent } from 'src/app/_page/update-data/update-data.component';
import { InsertDataComponent } from 'src/app/_page/insert-data/insert-data.component';
import { MultipleQueryComponent } from 'src/app/_page/multiple-query/multiple-query.component';
import { SingleQueryComponent } from 'src/app/_page/single-query/single-query.component';
import { Routes, RouterModule } from '@angular/router';
import {
  MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDividerModule,
  MatDialogModule, MatTableModule, MatStepperModule, MatSliderModule, MatSnackBarModule,
  MatProgressBarModule, MatTooltipModule, MatListModule, MatChipsModule, MatPaginatorModule,
  MatProgressSpinnerModule,
  MatBottomSheetModule,
  MatAutocompleteModule,
  MatExpansionModule,
  MatRadioModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatCardModule
} from '@angular/material';
import { MessageDialogComponent } from 'src/app/_page/message-dialog/message-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BottomSheetComponent } from 'src/app/_page/bottom-sheet/bottom-sheet.component';
import { GallaryComponent } from '../../_page/gallary/gallary.component';
import { CarouselModule, CardsFreeModule, WavesModule } from 'angular-bootstrap-md';
import { VideoComponent } from 'src/app/_page/video/video.component';
import { WsCrudComponent } from 'src/app/_page/ws-crud/ws-crud.component';

const routes: Routes = [
  {
    path: 'SingleQuery',
    component: SingleQueryComponent
  },
  {
    path: 'MultipleQuery',
    component: MultipleQueryComponent
  },
  {
    path: 'InsertData',
    component: InsertDataComponent
  },
  {
    path: 'UpdateData',
    component: UpdateDataComponent
  },
  {
    path: 'DeleteData',
    component: DeleteDataComponent
  },
  {
    path: 'Upload',
    component: UploadComponent
  },
  {
    path: 'Download',
    component: DownloadComponent
  },
  {
    path: 'Gallary',
    component: GallaryComponent
  },
  {
    path: 'Video',
    component: VideoComponent
  },
  {
    path: 'WSCRUD',
    component: WsCrudComponent
  }

];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatDialogModule,
    MatTableModule,
    MatStepperModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSliderModule,
    MatSnackBarModule,
    MatListModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatChipsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatGridListModule,
    MatCardModule,
    WavesModule,
    CarouselModule,
    CardsFreeModule
  ],
  declarations: [
    VideoComponent,
    GallaryComponent,
    SingleQueryComponent,
    MultipleQueryComponent,
    InsertDataComponent,
    UpdateDataComponent,
    DeleteDataComponent,
    UploadComponent,
    DownloadComponent,
    MessageDialogComponent,
    BottomSheetComponent,
    WsCrudComponent
  ],
  entryComponents: [MessageDialogComponent, BottomSheetComponent],
  exports: [
    RouterModule
  ]
})
export class MaterialDemoModule { }
