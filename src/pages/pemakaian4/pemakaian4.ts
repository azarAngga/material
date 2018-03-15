import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController } from 'ionic-angular';
import {SignaturePage} from '../signature/signature'
import { Storage } from '@ionic/storage';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
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
  public signatureImage1 : any;
  public signatureImage2 : any;
  signatureImage: any;
  data: any;
  data2: any;
  data3: any;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private storage: Storage,
   public http: Http,
    public modalController:ModalController,
    public viewCtrl: ViewController) {
        // this.signatureImage1 = navParams.get('signatureImage');;
        // console.log(this.signatureImage1);
      this.storage.get('data').then((val) => {
        console.log('con', val);
        this.data = val;
      });

      this.storage.get('data2').then((val) => {
        console.log('con', val);
        this.data2 = val;
      });

      this.storage.get('data3').then((val) => {
        console.log('con', val);
        this.data3 = val;
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pemakaian4Page');
  }

  openSignatureModel1(){
    
       let modal1 = this.modalController.create(SignaturePage);
        modal1.onDidDismiss(data => {
          console.log(data);
         this.signatureImage1 = data.signatureImage;
       });
      modal1.present();
    
   
  }

  openSignatureModel2(){
       let modal2 = this.modalController.create(SignaturePage);
       modal2.onDidDismiss(data =>{
        this.signatureImage2 = data.signatureImage;
       });
      modal2.present();
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


  actionPut(){   
    var js = JSON.stringify(this.data);
    var js2 = JSON.stringify(this.data2);
    var js3 = JSON.stringify(this.data3);

    var ini = "http://10.40.108.153/api_test/amalia/amalia_app/put_data_pemakaian.php?halaman1="+js+"&halaman2="+js2+"&halaman3="+js3;
    console.log(ini);   
    this.http.get(ini)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data[0]);
      },error =>{});
  }

}
