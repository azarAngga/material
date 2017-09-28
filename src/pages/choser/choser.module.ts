import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoserPage } from './choser';

@NgModule({
  declarations: [
    ChoserPage,
  ],
  imports: [
    IonicPageModule.forChild(ChoserPage),
  ],
})
export class ChoserPageModule {}
