import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http }from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
/**
 * Generated class for the ListWoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list-wo',
  templateUrl: 'list-wo.html',
})
export class ListWoPage {
  items: any;
  loader: any;

  constructor(public navCtrl: NavController,
   public navParams: NavParams,
   public http: Http,
   public loadingCtrl: LoadingController
   ){
    this.loading();
  	this.http.get('http://api.telkomakses.co.id/API/alista/ios/get_data_list_material.php?nik=97150427')
  	.map(res => res.json())
  	.subscribe(data =>{
      console.log(data);
      this.items = data;
  		this.loader.dismiss();
  	});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListWoPage');
  }

  loading(){
    this.loader = this.loadingCtrl.create({
      content: "please Wait.."
    })
    this.loader.present();
  }
}
