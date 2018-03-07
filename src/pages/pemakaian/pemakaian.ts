import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { MitraPage } from '../mitra/mitra';

/**
 * Generated class for the PemakaianPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pemakaian',
  templateUrl: 'pemakaian.html',
})
export class PemakaianPage {
	nama_mitra: any ;
	start_date: any ;
	end_date: any ;
	no_wo: any ;
	sto: any ;
	no_permintaan: any ;
	no_telepon: any ;
	no_inet: any ;
	nama_pelanggan: any ;

	hk: any ;
	dp: any ;
	klem_primer: any ;
	klem_sec: any  ;

	panjang_drop_core: any ;
	drop_core: any ;
	panjang_utp: any ;
	panjang_pvc: any ;
	jumlah_breket: any ;
	jumlah_klem_ring: any ;
	jumlah_tiang_telpn: any ;
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
   	  //this.tanggal_mulai 	= new Date().toISOString();
	  //this.tanggal_selesai 	= new Date().toISOString();
      var date1 = new Date();
      var date2 = new Date();

      this.start_date = date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();
      this.end_date = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PemakaianPage');
  }

   presentProfileModal() {
   		let profileModal = this.modalCtrl.create(MitraPage, { userId: 8675309 });
   		profileModal.onDidDismiss(data => {
		     console.log("inii"+data.data);
		     this.nama_mitra = data.data;
		});
   		profileModal.present();
 	}

 	changeStart(val: any){
 		console.log("start");
 		this.start_date = val.year+"-"+val.month+"-"+val.day;
 		console.log("ee"+JSON.stringify(val));

 	}

 	changeEnd(val: any){
 		console.log("end");
 		this.end_date = val.year+"-"+val.month+"-"+val.day;
 		console.log(this.start_date);


 	}

}
