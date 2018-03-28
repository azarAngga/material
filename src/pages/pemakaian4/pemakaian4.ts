import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController } from 'ionic-angular';
import {SignaturePage} from '../signature/signature'
import { Storage } from '@ionic/storage';
import { Http,Headers,RequestOptions } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import 'rxjs/add/operator/map';
import { ListWoPage } from '../list-wo/list-wo';
import { UriProvider  } from '../../providers/uri/uri';
import { AlertController } from 'ionic-angular';
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
  uri_api_alista: any;
  uri_app_amalia: any;
  uri_api_wimata: any;
  nik: any;

  nama_signature: any;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private storage: Storage,
    public TransferObject: FileTransferObject,
    private transfer: FileTransfer,
   public http: Http,
   public alertCtrl: AlertController,
    public uri: UriProvider,
    public modalController:ModalController,
    public viewCtrl: ViewController) {
    this.nik = "95130650";
    var date = new Date();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var millisecond = date.getMilliseconds();

    this.nama_signature = year+""+month+""+day+""+hours+""+minutes+""+seconds+""+millisecond+""+this.nik;
    console.log(this.nama_signature);


    this.uri_api_alista = this.uri.uri_api_alista;
    this.uri_app_amalia = this.uri.uri_app_amalia;
    this.uri_api_wimata = this.uri.uri_api_wimata;
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
    console.log("test : "+this.signatureImage1);
    this.upload(this.nama_signature+"_1.png",this.signatureImage1);
    this.upload(this.nama_signature+"_2.png",this.signatureImage2);

    if(this.signatureImage1 == undefined){
        this.showAlert("Tanda tangan pelanggan tidak boleh kosong");
    }else if(this.signatureImage2 == undefined){
        this.showAlert("Tanda tangan pelanggan tidak boleh kosong");
    }else{
      var data4 = {
        kendala:this.kendala,
        alasan_decline:this.alasan_decline,
        harga:this.harga,
        harga_view:this.harga_view,
        menggunakan_isp_view:this.menggunakan_isp_view
      }
    
      var js = JSON.stringify(this.data);
      var js2 = JSON.stringify(this.data2);
      var js3 = JSON.stringify(this.data3);
      var js4 = JSON.stringify(data4);
      
      var ini = "http://10.40.108.153/api_test/amalia/amalia_app/put_data_pemakaian.php?halaman1="+js+"&halaman2="+js2+"&halaman3="+js3+"&halaman4="+js4;
      console.log(ini);   
      this.http.get(ini)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data[0]);
        },error =>{});
    }


  }

  upload(nama,path){
    console.log("test");
      var options = {
        fileKey: "file",
        fileName: nama,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': nama}
      };
     
      var url = this.uri_app_amalia+"uploads.php";
      console.log(url);
      const fileTransfer: FileTransferObject = this.transfer.create();
    
     
      //Use the FileTransfer to upload the image
      fileTransfer.upload(path, url, options).then(data => {
        console.log("berhasil berhasil uye :"+JSON.stringify(data));
      }, err => {

        console.log("ddd");
        console.log(err);
      });
  }

  showAlert(x){
    let alert = this.alertCtrl.create({
      title: 'Alert',
      subTitle: x,
      buttons: ['OK']
    });
    alert.present();
  }

}
