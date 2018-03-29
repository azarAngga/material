import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { MitraPage } from '../mitra/mitra';
import * as $ from 'jquery';
import { AlertController } from 'ionic-angular';	
declare var $: $;
import { Storage } from '@ionic/storage';
import { Pemakaian2Page }from '../pemakaian2/pemakaian2';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


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
	menu: any  = "order";
	nik: any = '95130809';

	hk: any ;
	dp: any ;
	klem_primer: any ;
	klem_sec: any  ;

	tanggal_mulai: any;
	tanggal_selesai: any;

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
	no_row_dsg: any = 0;
	data_material: any;
	arr_material: any;


  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public alertCtrl: AlertController,
   public modalCtrl: ModalController,
   public http: Http,
   private storage: Storage
   ) {
   	  this.tanggal_mulai 	 = new Date().toISOString();
	  this.tanggal_selesai = new Date().toISOString();
      var date1 = new Date();
      var date2 = new Date();

      storage.get('data').then((val) => {
	    console.log('con', val);
	  });

      //this.start_date = date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();
       this.start_date = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
      this.end_date   = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
      
      this.actionGetMaterial();
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
 		var data = this.arr_material;
 		var no_ = 0;
 		var str_app = "";

 		if(data[0]['id_barang'] != "-"){
      		while(no_ < data.length){
      			str_app +="<option>"+data[no_]['id_barang']+"</option>";
	      		no_++;
	      	}
      	}

 		$('#parent').append('<div id="el'+no+'">New Item '+no+'<table><tr><td width="50%"><select id="id_barang'+no+'" >'+str_app+'</select></td><td width="30%"><input type="text" placeholder="volume" id="volume'+no+'" class="classInput"/></td><td width="20%"></td></tr></table></div>');
 	}

 	newElementDsg(){
 		var data = this.arr_material;
 		var no_ = 0;
 		var str_app = "";

 		if(data[0]['id_barang'] != "-"){
      		while(no_ < data.length){
      			str_app +="<option value='"+data[no_]['id_barang']+"'>"+data[no_]['id_barang']+"</option>";
	      		no_++;
	      	}
      	}

 		this.no_row_dsg = this.no_row_dsg+1;
 		var no = this.no_row_dsg;
 		$('#parentDsg').append('<div id="dsg'+no+'"><table width="100%"><tr><td width="50%"><div align="center">Designator</div></td><td width="40%" colspan="2"><div align="center">Jumlah</div></td></tr><tr><td width="40%"><div align="center"><select width="10" id="designator'+no+'">'+str_app+'</select></div><td><td width="40%"><div align="center"><input  width="5" type="number" id="jumlah_dsg'+no+'" style="border-width: 1px;" /></div><td><td width="20%"><br/><br/><br/></td><td></tr></table></div>');
 	}

 	removeElememt(){
 		var no = this.no_row;
 		//alert(x);
 		$('#el'+no).remove();
 		this.no_row = this.no_row-1;
 		if(this.no_row < 0){
 			this.no_row = 0;
 		}
 	}

 	removeElememtDsg(){
 		var no = this.no_row_dsg;
 		$('#dsg'+no).remove();
 		this.no_row_dsg = this.no_row_dsg-1;
 		if(this.no_row_dsg < 0){
 			this.no_row_dsg = 0;
 		}
 	}

 	ngAfterViewInit(){
 		
 	}



 	actionNext(){

 		var no = 1;
 		var id_barang = [];
 		var volume = [];
 		var satuan = [];

 		if(this.no_wo == undefined){
 			this.showAlert("No WO Tidak boleh kosong");
 		}else if(this.sto == undefined){
 			this.showAlert("STO Tidak boleh kosong");
 		}else if(this.no_permintaan == undefined){
 			this.showAlert("No Permintaan Tidak boleh kosong");
 		}else if(this.no_telepon == undefined){
 			this.showAlert("No Telepon Tidak boleh kosong");
 		}else if(this.no_inet == undefined){
 			this.showAlert("No Inet Tidak boleh kosong");
 		}else if(this.start_date == undefined){
 			this.showAlert("Start Date Tidak boleh kosong");
 		}else if(this.end_date == undefined){
 			this.showAlert("End Date Tidak boleh kosong");
 		}else if(this.nama_pelanggan == undefined){
 			this.showAlert("Nama Pelanggan Tidak boleh kosong");
 		}else if(this.hk == undefined){
 			this.showAlert("HK/MSAN/ODC Tidak boleh kosong");
 		}else if(this.dp == undefined){
 			this.showAlert("DP/ODP Tidak boleh kosong");
 		}else if(this.klem_primer == undefined){
 			this.showAlert("Klem Primer/Feeder Tidak boleh kosong");
 		}else if(this.klem_sec == undefined){
 			this.showAlert("Klem Sec/Distribusi Tidak boleh kosong");
 		}else{
 			
 			while(no <= this.no_row){
	 			var id_barang_ = $('#id_barang'+no).val();
	 			var volume_ = $('#volume'+no).val();
	 			var satuan_ = $('#satuan'+no).val();
	 			id_barang.push(id_barang_);
	 			volume.push(volume_);
	 			satuan.push(satuan_);
	 			no++;
	 		}

	 		no = 1;
	 		var designator = [];
	 		var jumlah     = [];
	 		while(no <= this.no_row_dsg){
	 			designator.push($('#designator'+no).val());
	 			jumlah.push($('#jumlah_dsg'+no).val());
	 			console.log($('#designator'+no).val());
	 			no++;
	 		}

	 		var data = {
	 			'jumlah_tiang_telpn':this.jumlah_tiang_telpn,
	 			'jumlah_klem_ring':this.jumlah_klem_ring,
	 			'jumlah_breket':this.jumlah_breket,
	 			'panjang_pvc':this.panjang_pvc,
	 			'panjang_utp':this.panjang_utp,
	 			'panjang_drop_core':this.panjang_drop_core,
	 			'drop_core':this.drop_core,
				'nama_mitra':this.nama_mitra,
				'no_wo':this.no_wo,
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
				'designator': {'designator':designator,'jumlah':jumlah} ,
			};
			this.storage.set('data',data);
	 		this.navCtrl.push(Pemakaian2Page);
 		}
 	}

 	actionGetMaterial(){
 	  this.http.get("http://10.40.108.153/api_test/alista/ios/get_data_list_material.php?nik="+this.nik)
      .map(res => res.json())
      .subscribe(data => {
      	console.log("data materila :"+data.length);
      	console.log("data materila :"+JSON.stringify(data));
      	var no = 0;
      	var arr_ = [];
      	this.arr_material = data;
      	console.log(arr_);
      	// while(no < data.length){
      	// }
      },error =>{});
 	}

 	showAlert(x){
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: x,
        buttons: ['OK']
      });
      alert.present();
    }

 	// set a key/value
	// storage.set('name', 'Max');

	//   // Or to get a key/value pair
	//   storage.get('age').then((val) => {
	//     console.log('Your age is', val);
	//   });

}
