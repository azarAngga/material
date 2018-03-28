import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UriProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UriProvider {
 

  uri_api_alista: any = 'http://10.204.200.8/API/alista/';
  //uri_app: any = 'http://10.204.200.8/API/ios/';
  uri_app_amalia: any = 'http://10.204.200.8/API/amalia/';
  uri_api_wimata: any = 'http://10.204.200.8/API/wimata/';
  uri_api_amalia: any = 'http://10.204.200.8/API/amalia/';
  constructor(public http: Http) {
    console.log('Hello UriProvider Provider');
  }

}
