import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    TruncatePipe
  ],
  imports: [
    CommonModule
  ],
  exports : [
    TruncatePipe
  ]
})
export class CoreModule { }
