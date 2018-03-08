import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Pemakaian4Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pemakaian4',
  templateUrl: 'pemakaian4.html',
})
export class Pemakaian4Page {

  kendala: any = 'Alamat Tidak Jelas';
  alasan_decline: any ='menggunakan ISP';
  harga: any ;
  harga_view: any = 0;
  menggunakan_isp_view: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pemakaian4Page');
  }

  actionChangeAlasanDecline(x){
		if(x == 'Harga yang diinginkan'){
			this.harga_view = 1;
		}else if(x =='menggunakan ISP'){
			this.menggunakan_isp_view = 1;
			this.harga_view = 0;
		}else{
			this.menggunakan_isp_view = 0;
			this.harga_view = 0;
		}
  }

}
