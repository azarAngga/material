import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Pemakaian3Page } from '../pemakaian3/pemakaian3';
/**
 * Generated class for the Pemakaian2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pemakaian2',
  templateUrl: 'pemakaian2.html',
})
export class Pemakaian2Page {
	kriteria1: any = 'good1';
	kriteria2: any = 'good2';
	kriteria3: any = 'good3';

	gmai

	test_ping: any;
	test_upload: any;
	test_download: any;
	hasil_ukur: any;

	catatan_khusus: any ="catatan1";
	other: any;

	other_view: any = 0;

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		private storage: Storage) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad Pemakaian2Page');
	}

	actionNext(){
		var data = {
			'kriteria1':this.kriteria1,
			'kriteria2':this.kriteria2,
			'kriteria3':this.kriteria3,
			'test_ping':this.test_ping,
			'test_upload':this.test_upload,
			'test_download':this.test_download,
			'hasil_ukur':this.hasil_ukur,
			'catatan_khusus':this.catatan_khusus,
			'other':this.other
		}

	  	this.storage.set('data2',data);
	  	this.navCtrl.push(Pemakaian3Page);
	  }

	changeCatatanKhusus(x){
		if(x == 'catatan3'){
			this.other_view = 1;
		}else{
			this.other_view  = 0;
		}
	}


	actionBack(){
		this.navCtrl.pop();
	}

}
