import { Component } from '@angular/core';
import * as $ from 'jquery';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import {AuthService} from '../home/authservice';
import { GlobalServices } from '../home/globalServices';

import {HomePage} from '../home/home';

/*
  Generated class for the Userpage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-userpage',
  templateUrl: 'userpage.html'
})
export class Userpage {

  pesquisaLetrasPlaca: string;
  pesquisaNumerosPlaca: string;
  pesquisaCnpj: string;

  infoUsuario: string;
  login: any;
  senha: any;

  urlWebservice: string;
  loginPadrao: string;
  senhaPadrao: string;
  urlNota: string;
  municipio: any;

  constructor(public navCtrl: NavController, private navParams: NavParams, public authservice: AuthService, public alertCtrl: AlertController, public globalServices: GlobalServices) {

    this.infoUsuario = this.navParams.get('param1');
    this.login = this.navParams.get('param2');
    this.senha = this.navParams.get('param3');

    this.urlWebservice = this.navParams.get('param4');
    this.loginPadrao = this.navParams.get('param5');
    this.senhaPadrao = this.navParams.get('param6');
    this.urlNota = this.navParams.get('param7');
    this.municipio = this.navParams.get('param8');

    console.log(this.municipio);

    this.globalServices.setLoginPadrao(this.loginPadrao);
    this.globalServices.setSenhaPadrao(this.senhaPadrao);
    this.globalServices.setUrlWebservice(this.urlWebservice);
    this.globalServices.setUrlNota(this.urlNota);

    authservice.globalServices = globalServices;

  }

  ionViewDidLoad() {
    console.log('Hello Userpage Page');
    alert("Carreguei a userpage");
    document.getElementById("dadosUserpage").innerHTML = "dad0s: "+this.infoUsuario;
  }
  
  pesquisar(pesquisaLetrasPlaca, pesquisaNumerosPlaca, pesquisaCnpj) {
    console.log("placa: "+pesquisaLetrasPlaca + "-" + pesquisaNumerosPlaca + " cnpj: " + pesquisaCnpj);
    this.authservice.pesquisar(this.login, this.senha, this.loginPadrao, this.senhaPadrao, this.urlWebservice, pesquisaLetrasPlaca, pesquisaNumerosPlaca, pesquisaCnpj);
    // var resultJson = document.getElementById("pesquisaUserpage").textContent || document.getElementById("pesquisaUserpage").innerText || "";
    // var jsonResposta = JSON.parse(resultJson);

    // if(jsonResposta.status == 1){
    //  // alert(jsonResposta.status_msg);
    //      this.showAlert('Erro', jsonResposta.status_msg);
    // }else if(jsonResposta.status == 0){      
    //      console.log(JSON.stringify(jsonResposta));
    //      this.showAlert('FOI', 'FOI PORRA');
    //      //this.goToHome(JSON.stringify(jsonResposta), user.name, user.password, this.urlWebservice, this.loginPadrao, this.senhaPadrao, this.urlNota);
    // }
  }

  showAlert(titulo, mensagem){
        let alert = this.alertCtrl.create({
          title: titulo,
          subTitle: mensagem,
          buttons: ['OK']
        });
        alert.present();
    }

  logout() {
        this.authservice.logout();
        this.navCtrl.setRoot(HomePage);
    }
    
    
}