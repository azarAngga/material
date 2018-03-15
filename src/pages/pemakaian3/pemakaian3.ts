import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Pemakaian4Page} from'../pemakaian4/pemakaian4';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


/**
 * Generated class for the Pemakaian3Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pemakaian3',
  templateUrl: 'pemakaian3.html',
})
export class Pemakaian3Page {
 	sn_ont: any;
 	sn_modem: any;
 	modem: any;
 	power: any;
 	dsl: any;
 	internet: any;
 	mac_address: any;

 	nama: any;
 	notel_teknsi: any;
 	psb: any= '1P';
 	migrasi: any = 'infrastruktur';
 	speed: any ='10MB';

 	other: any;
 	other_view: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,private barcodeScanner: BarcodeScanner) {
    
  }

  actionScanOnt(){
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     this.sn_ont = barcodeData.text;
    }, (err) => {
      alert(err);
    });
  }

  actionModem(){
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     this.sn_modem = barcodeData.text;
    }, (err) => {
      alert(err);
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Pemakaian3Page');
  }

  actionNext(){
  	var data3 = {
  		sn_ont:this.sn_ont,
  		sn_modem:this.sn_modem,
  		modem:this.modem,
  		power:this.power,
  		dsl:this.dsl,
  		internet:this.internet,
  		mac_address:this.mac_address,
  		nama:this.nama,
  		notel_teknsi:this.notel_teknsi,
  		psb:this.psb,
  		migrasi:this.migrasi,
  		speed:this.speed,
  		other:this.other
  	}
  		this.storage.set('data3',data3);
  		this.navCtrl.push(Pemakaian4Page);
  }

  actionBack(){
  	this.navCtrl.pop();
  }

  actionChangeKecepatan(x){
  	if(x == 'other'){
  		this.other_view = 1;
  	}else{
  		this.other_view = 0;
  	}
  }



}
