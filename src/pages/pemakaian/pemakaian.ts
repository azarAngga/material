import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { MitraPage } from '../mitra/mitra';
import * as $ from 'jquery';
declare var $: $;
import { Storage } from '@ionic/storage';
import { Pemakaian2Page }from '../pemakaian2/pemakaian2';


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

	view_nama_mitra: any = 1;
	perusahaan: any = "telkom akses";
	no_row: any = 0;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public modalCtrl: ModalController,
   private storage: Storage
   ) {
   	  //this.tanggal_mulai 	 = new Date().toISOString();
	  //this.tanggal_selesai = new Date().toISOString();
      var date1 = new Date();
      var date2 = new Date();

      storage.get('data').then((val) => {
	    console.log('con', val);
	  });

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

 	changePerusahan(val){
 		if(val == 'mitra'){
 			this.view_nama_mitra = 2;
 		}else{
 			this.view_nama_mitra = 1;
 		}
 	}

 	newElement(){
 		this.no_row = this.no_row+1;
 		var no = this.no_row;
 		$('#parent').append('<div id="el'+no+'">New Item '+no+'<table><tr><td width="50%"><input placeholder="ID Barang" type="text" id="id_barang'+no+'" class="classInput"/></td><td width="30%"><input type="text" placeholder="volume" id="volume'+no+'" class="classInput"/></td><td width="20%"><input type="text" placeholder="satuan" id="satuan'+no+'" class="classInput"/></td></tr></table></div>');
 	}

 	removeElememt(){
 		var no = this.no_row;
 		$('#el'+no).remove();
 		this.no_row = this.no_row-1;
 		if(this.no_row < 0){
 			this.no_row = 0;
 		}
 	}

 	ngAfterViewInit(){
 		//$('#parent').append('dfddf');
 	}

 	actionNext(){
 		var no = 1;
 		var id_barang = [];
 		var volume = [];
 		var satuan = [];
 		while(no <= this.no_row){
 			var id_barang_ = $('#id_barang'+no).val();
 			var volume_ = $('#volume'+no).val();
 			var satuan_ = $('#satuan'+no).val();
 			id_barang.push(id_barang_);
 			volume.push(volume_);
 			satuan.push(satuan_);
 			no++;
 		}

		var data = {
			'nama_mitra':this.nama_mitra,
			'sto':this.sto,
			'no_permintaan':this.no_permintaan ,
			'no_telepon':this.no_telepon ,
			'no_inet':this.no_inet ,
			'start_date':this.start_date ,
			'end_date':this.end_date ,
			'nama_pelanggan':this.nama_pelanggan ,
			'hk':this.hk ,
			'dp':this.dp ,
			'klem_primer':this.klem_primer ,
			'klem_sec':this.klem_sec ,
			'other': {'id_barang':id_barang,'volume':volume,'satuan':satuan} ,
		};
		this.storage.set('data',data);
 		this.navCtrl.push(Pemakaian2Page);
 	}

 	// set a key/value
	// storage.set('name', 'Max');

	//   // Or to get a key/value pair
	//   storage.get('age').then((val) => {
	//     console.log('Your age is', val);
	//   });

}
