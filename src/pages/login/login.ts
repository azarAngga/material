import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Events } from 'ionic-angular';
import { ListWoPage } from '../list-wo/list-wo';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: any;
  password: any;
  items: any;
  rootPage: any = LoginPage;
  loader: any;
  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public http: Http,
  public alertCtrl: AlertController,
  public loadingCtrl: LoadingController,
  public storage: Storage,
  public events: Events) 
  {

    this.setData("nok");
    this.pages = [];
    this.events.publish('menu:tampil', this.pages);
     this.events.publish('menu:tampilNama',"","","hana_splashx3.png");
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad LoginPage');
  }

  putLogin(){
    if(this.username != null && this.password != null && this.username != "" && this.password != ""){
        this.presentLoading();
        //console.log('http://10.40.108.153/api_test/amalia/login.php?username='+this.username+'&password='+this.password);
        //this.http.get('http://apps.telkomakses.co.id/hana/ios/get_data_hana_login_default.php?username='+this.username+'&password='+this.password).map(res => res.json()).subscribe(data => {
        this.http.get('http://10.204.200.8/API/amalia/get_data_hana_login_default.php?username='+this.username+'&password='+this.password).map(res => res.json()).subscribe(data => {
        //this.http.get('http://10.40.108.153/api_test/amalia/login.php?username='+this.username+'&password='+this.password).map(res => res.json()).subscribe(data => {
         this.items = data;
         console.log(this.items);
         if(this.items.result[0].status != ""){
          if(this.items.result[0].status == "sukses"){
            this.loadMenu();
            this.setFoto(this.items.result[0].foto);
            this.events.publish('menu:tampil', this.pages);
            this.loadMenu();
            this.setData("oke");


            //this.setNik(this.username); 
            this.setNik('95130650');


            this.navCtrl.setRoot(HomePage);
            this.loader.dismiss();
         }else{
            this.showAlert(this.items.result[0].message);
            this.loader.dismiss();
         }
       }

        });
    }else{
         this.showAlert("username dan password tidak boleh kosong");
    }

    
  }

   showAlert(x) {
    let alert = this.alertCtrl.create({
      title: 'Mohon Maaf',
      subTitle: x,
      buttons: ['OK']
    });
    alert.present();
  }


  presentLoading() {

    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();

  }

  setData(x){
    console.log("set data set");
    this.storage.set('session',x);
  }

  setFoto(x){
    this.storage.set('foto',x);
  }

  setNik(x){
    this.storage.set('nik',x);
  }

  loadMenu(){
    this.pages = [
        { title: 'Update Material Alista', component: HomePage },
        { title: 'List Stok Barang', component: ListWoPage },
        { title: 'Logout', component: LoginPage }
    ];
  }

}
