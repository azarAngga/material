import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaPage } from './ba';

@NgModule({
  declarations: [
    BaPage,
  ],
  imports: [
    IonicPageModule.forChild(BaPage),
  ],
})
export class BaPageModule {}
