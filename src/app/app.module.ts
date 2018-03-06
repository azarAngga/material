import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule  } from '@ionic/storage';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PemakaianPage } from '../pages/pemakaian/pemakaian';
import { Pemakaian2Page } from '../pages/pemakaian2/pemakaian2';
import { Pemakaian3Page } from '../pages/pemakaian3/pemakaian3';
import { Pemakaian4Page } from '../pages/pemakaian4/pemakaian4';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ChoserPage } from '../pages/choser/choser';
import { ListWoPage } from '../pages/list-wo/list-wo';
import { CreateWoPage } from '../pages/create-wo/create-wo';
import { ModalNikBawahanPage } from '../pages/modal-nik-bawahan/modal-nik-bawahan'; 

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PemakaianPage,
    Pemakaian2Page,
    Pemakaian3Page,
    Pemakaian4Page,
    ListPage,
    LoginPage,
    ChoserPage,
    ListWoPage,
    CreateWoPage,
    ModalNikBawahanPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PemakaianPage,
    Pemakaian2Page,
    Pemakaian3Page,
    Pemakaian4Page,
    ListPage,
    LoginPage,
    ChoserPage,
    ListWoPage,
    CreateWoPage,
    ModalNikBawahanPage
  ],
  providers: [
  Device,
  FilePath,
  File,
  Camera,
  FileTransferObject,
  FileTransfer,
    FileChooser,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
