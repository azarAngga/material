import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateWoPage } from './create-wo';

@NgModule({
  declarations: [
    CreateWoPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateWoPage),
  ],
})
export class CreateWoPageModule {}
