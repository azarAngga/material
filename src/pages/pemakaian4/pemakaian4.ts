import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController } from 'ionic-angular';
import {SignaturePage} from '../signature/signature'
import {DenahPage} from '../denah/denah'
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import 'rxjs/add/operator/map';
//import { ListWoPage } from '../list-wo/list-wo';
import { UriProvider  } from '../../providers/uri/uri';
import { AlertController } from 'ionic-angular';
import { PemakaianPage } from '../pemakaian/pemakaian';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the Pemakaian4Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-pemakaian4',
  templateUrl: 'pemakaian4.html',
})
export class Pemakaian4Page {

  kendala: any;
  loader_gif: any = 'off';
  alasan_decline: any ;
  harga: any ;
  harga_view: any;
  menggunakan_isp_view: any;
  public signatureImage1 : any;
  public signatureImage2 : any;
  public denah : any;
  signatureImage: any;
  data: any;
  data2: any;
  data3: any;
  uri_api_alista: any;
  uri_app_amalia: any;
  uri_api_wimata: any;
  nik: any;
  tanggal_ttd: any
  loader: any;

  nama_signature: any;
  tempat_ttd: any;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private storage: Storage,
    public TransferObject: FileTransferObject,
    private transfer: FileTransfer,
   private screenOrientation: ScreenOrientation,
   public http: Http,
   public uri: UriProvider,
   public loadingCtrl: LoadingController,
   public alertCtrl: AlertController,
    public modalController:ModalController,
    public viewCtrl: ViewController) {
    this.storage.get('nik').then((val) => {
      this.nik = val;  
	   var date = new Date();


    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var millisecond = date.getMilliseconds();

    this.tanggal_ttd = day+"-"+month+"-"+year;

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
    });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pemakaian4Page');
  }

  openSignatureModel1(){
     //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
       let modal1 = this.modalController.create(SignaturePage);
        modal1.onDidDismiss(data => {
          console.log(data);
          this.loading();
         this.signatureImage1 = data.signatureImage;
         this.upload(this.nama_signature+"_1.png",this.signatureImage1);
          //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
       });
      modal1.present();
    
   
  }

  openSignatureModel2(){
     //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
       let modal2 = this.modalController.create(SignaturePage);
       modal2.onDidDismiss(data =>{
       	 this.loading();
        this.signatureImage2 = data.signatureImage;
        this.upload(this.nama_signature+"_2.png",this.signatureImage2);
        //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
       });
      modal2.present();
  }

  openModalDenah(){
     //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
       let modal3 = this.modalController.create(DenahPage);
       modal3.onDidDismiss(data =>{
        this.loading();
        this.denah = data.signatureImage;
        this.upload(this.nama_signature+"_denah.png",this.denah);
        //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
       });
      modal3.present();
  }

  actionPut(){ 

     var data4 = {
          email:"te",
          nik:this.nik,
          kendala:this.kendala,
          alasan_decline:this.alasan_decline,
          harga:this.harga,
          denah:this.denah,
          tempat_ttd:this.tempat_ttd,
          harga_view:this.harga_view,
          menggunakan_isp_view:this.menggunakan_isp_view,
          url_ttd_pelanggan:this.nama_signature+"_1.png",
          url_ttd_mitra:this.nama_signature+"_2.png",
        }
    
        var js = JSON.stringify(this.data);
        var js2 = JSON.stringify(this.data2);
        var js3 = JSON.stringify(this.data3);
        var js4 = JSON.stringify(data4);
        
        var ini = this.uri.uri_api_alista+"amalia_app/put_data_pemakaian.php?halaman1="+js+"&halaman2="+js2+"&halaman3="+js3+"&halaman4="+js4+"&versi="+this.uri.versi;
        console.log(ini);  

    if(this.tempat_ttd == undefined){
        this.showAlert("Kolom Kota tidak boleh kosong");
    }else if(this.signatureImage1 == undefined){
        this.showAlert("Tanda tangan pelanggan tidak boleh kosong");
    }else if(this.signatureImage2 == undefined){
        this.showAlert("Tanda tangan pelanggan tidak boleh kosong");
    }else{
      //this.upload(this.nama_signature+"_1.png",this.signatureImage1);
      //this.upload(this.nama_signature+"_2.png",this.signatureImage2);
      this.showConfirm();
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
     
      var url = this.uri.uri_prod_upload+"upload.php";
      console.log(url);
      const fileTransfer: FileTransferObject = this.transfer.create();
    
     
      //Use the FileTransfer to upload the image
      fileTransfer.upload(path, url, options).then(data => {
      	this.loader.dismiss();
        console.log("berhasil berhasil uye :"+JSON.stringify(data));
      }, err => {
      	this.loader.dismiss();
        console.log("ddd");
        console.log("error",err);
        alert(err);
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

   showConfirm() {

    let confirm = this.alertCtrl.create({
      title: 'Sertakan email pelanggan?',
      inputs: [
        {
          name: 'email',
          placeholder: 'masukan email pelanggan(opsional)'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'OK',
          handler: (data) => {
          //confirm.dismiss();
          this.loader_gif = 'on';


          var data4 = {
          email:data.email,
          nik:this.nik,
          kendala:this.kendala,
          alasan_decline:this.alasan_decline,
          harga:this.harga,
          denah:this.denah,
          tempat_ttd:this.tempat_ttd,
          harga_view:this.harga_view,
          menggunakan_isp_view:this.menggunakan_isp_view,
          url_ttd_pelanggan:this.nama_signature+"_1.png",
          url_ttd_mitra:this.nama_signature+"_2.png",
        }
    
        var js = JSON.stringify(this.data);
        var js2 = JSON.stringify(this.data2);
        var js3 = JSON.stringify(this.data3);
        var js4 = JSON.stringify(data4);
        
        var ini = this.uri.uri_api_alista+"amalia_app/put_data_pemakaian.php?halaman1="+js+"&halaman2="+js2+"&halaman3="+js3+"&halaman4="+js4+"&versi="+this.uri.versi;
        console.log(ini);   
        this.http.get(ini)
          .map(res => res.json())
          .subscribe(data => {
            this.loader.dismiss();
            if(data.status == "ok"){
                this.showAlert(data.message);
                this.navCtrl.setRoot(PemakaianPage);
            }else{
              this.showAlert(data.message);
            }
          },error =>{
            this.loader_gif = 'off';
          });
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();

  }

  actionBack(){
    this.navCtrl.pop();
  }

   showPromptDialog() {
    let prompt = this.alertCtrl.create({
      title: 'Email pelanggan',
      message: "Isi email pelanggan ..",
      inputs: [
        {
          name: 'email',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'submit',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  loading(){
  	this.loader = this.loadingCtrl.create({
  		content: "please Wait.."
  	})

  	// execute loading 
  	this.loader.present();
  }


}
