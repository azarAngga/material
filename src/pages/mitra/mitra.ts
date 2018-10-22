import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UriProvider  } from '../../providers/uri/uri';
import { LoadingController } from 'ionic-angular';

/**
 * Generated class for the MitraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-mitra',
  templateUrl: 'mitra.html',
})
export class MitraPage {
  nama_mitra: any;
  items: any;
  loader: any;
  search: any;
  json_data_vendor2: any;
  constructor(public navCtrl: NavController,public uri: UriProvider,public loadingCtrl: LoadingController, public navParams: NavParams,public http: Http,public viewCtrl: ViewController) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MitraPage');
  }

  loadData(){
      this.loading();
      this.http.get(this.uri.uri_api+"master/get_data_all_master_mitra.php?nama="+this.search)
      .map(res => res.json())
      .subscribe(data => {
      	this.nama_mitra = data.data;
      	this.json_data_vendor2 = data.mitra;
      	this.initializeItems();
        this.loader.dismiss();
      });
  }

  initializeItems() {
    this.items = this.json_data_vendor2;
  }

  searchAction(){
    this.loadData();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;
    //console.log("search"+this.items);

    // if the value is an empty string don't filter the items

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        try{
           return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }catch(err){
           return "error"; 
        }
      })
    }
  }

 dismiss(x) {
   let data = { 'data': x };
   this.viewCtrl.dismiss(data);
 }

 loading(){
      this.loader = this.loadingCtrl.create({
        content: "please Wait.."
      })

      // execute loading 
      this.loader.present();
    }

  
}
