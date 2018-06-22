import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { UriProvider  } from '../../providers/uri/uri';

import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the BaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ba',
  templateUrl: 'ba.html',
})
export class BaPage {

  nik: any;
  loader: any;
  list: any;
  uri_app_amalia: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private transfer: FileTransfer,
    private fileOpener: FileOpener,
    public uri: UriProvider,
    private storage: Storage,
    public http: Http,
    public loadingCtrl: LoadingController,
    private file: File) {
    this.uri_app_amalia = this.uri.uri_app_amalia;
    this.storage.get('nik').then((val) => {
      this.nik = val;  
      this.getlistBA(this.nik);
    });
	}

  getlistBA(nik){
    var ini = this.uri.uri_api_alista+'amalia_app/get_data_list_wo.php?nik=95130650';
    this.http.get(ini)
          .map(res => res.json())
          .subscribe(data => {
            this.list = data;
            console.log(data);
    }); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BaPage');
  }

  download(no_wo){
    this.loading();
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = this.uri.uri_api_alista+'ios/TCPDF/examples/isi_ba.php?no_wo='+no_wo;
    fileTransfer.download(url, this.file.externalRootDirectory + no_wo+"_"+this.nik+".pdf").then((entry) => {
      
    this.fileOpener.open(this.file.externalRootDirectory + no_wo+"_"+this.nik+".pdf", 'application/pdf')
      .then(() => this.loader.dismiss())
      .catch(e => this.loader.dismiss());

    }, (error) => {
      alert(error);
    });
  }

  loading(){
    this.loader = this.loadingCtrl.create({
      content: "please Wait.."
    })

    // execute loading 
    this.loader.present();
  }

}
