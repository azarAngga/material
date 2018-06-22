import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController,ViewController } from 'ionic-angular';
import {SignaturePage} from '../signature/signature'
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import 'rxjs/add/operator/map';
//import { ListWoPage } from '../list-wo/list-wo';
import { UriProvider  } from '../../providers/uri/uri';
import { AlertController } from 'ionic-angular';
import { PemakaianPage } from '../pemakaian/pemakaian';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

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

  kendala: any;
  alasan_decline: any ;
  harga: any ;
  harga_view: any;
  menggunakan_isp_view: any;
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
  tanggal_ttd: any;

  nama_signature: any;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   private storage: Storage,
    public TransferObject: FileTransferObject,
    private transfer: FileTransfer,
   private screenOrientation: ScreenOrientation,
   public http: Http,
   public uri: UriProvider,
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
         this.signatureImage1 = data.signatureImage;
          //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
       });
      modal1.present();
    
   
  }

  openSignatureModel2(){
     //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
       let modal2 = this.modalController.create(SignaturePage);
       modal2.onDidDismiss(data =>{
        this.signatureImage2 = data.signatureImage;
        //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
       });
      modal2.present();
  }

  actionChangeAlasanDecline(){
		// if(x == 'Harga yang diinginkan'){
		// 	this.harga_view = 1;
		// }else if(x =='menggunakan ISP'){
		// 	this.menggunakan_isp_view = 1;
		// 	this.harga_view = 0;
		// }else{
		// 	this.menggunakan_isp_view = 0;
		// 	this.harga_view = 0;
		// }
  }

  actionPut(){ 
    if(this.signatureImage1 == undefined){
        this.showAlert("Tanda tangan pelanggan tidak boleh kosong");
    }else if(this.signatureImage2 == undefined){
        this.showAlert("Tanda tangan pelanggan tidak boleh kosong");
    }else{
      this.upload(this.nama_signature+"_1.png",this.signatureImage1);
      this.upload(this.nama_signature+"_2.png",this.signatureImage2);
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
        var data4 = {
          email:data.email,
          nik:this.nik,
          kendala:this.kendala,
          alasan_decline:this.alasan_decline,
          harga:this.harga,
          harga_view:this.harga_view,
          menggunakan_isp_view:this.menggunakan_isp_view,
          url_ttd_pelanggan:this.nama_signature+"_1.png",
          url_ttd_mitra:this.nama_signature+"_2.png",
        }
    
        var js = JSON.stringify(this.data);
        var js2 = JSON.stringify(this.data2);
        var js3 = JSON.stringify(this.data3);
        var js4 = JSON.stringify(data4);
        
        var ini = this.uri.uri_api_alista+"amalia_app/put_data_pemakaian.php?halaman1="+js+"&halaman2="+js2+"&halaman3="+js3+"&halaman4="+js4;
        console.log(ini);   
        this.http.get(ini)
          .map(res => res.json())
          .subscribe(data => {
            if(data.status == "ok"){
                this.showAlert(data.message);
                this.navCtrl.setRoot(PemakaianPage);
            }else{
              this.showAlert(data.message);
            }
          },error =>{});
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


}
