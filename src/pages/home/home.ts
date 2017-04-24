import { Component } from '@angular/core';

import {AlertController, NavController, NavParams, ViewController} from 'ionic-angular';

import {AuthService} from './authservice';
import {Userpage} from '../userpage/userpage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  
})
export class HomePage {

  usercreds = {
       name: '',
       password: ''
  };

  loginPadrao: string;
  senhaPadrao: string;
  uf: string;
  urlWebservice: string;
  urlNota: string;
  arrayDados: any;
  novoArray: any;
  municipio: any;

  constructor(public navCtrl: NavController, public authservice: AuthService, private viewCtrl: ViewController, public alertCtrl: AlertController) {  
    
  }

   ionViewDidLoad(){ //EXECUTAR DEPOIS DE CARREGAR O APLICATIVO
    this.carregarPrefeituras();
  }

  carregarPrefeituras(){
        this.authservice.listarPrefeituras();
       
         var resultJson = document.getElementById("demo").textContent || document.getElementById("demo").innerText || "";
       
         var jsonResposta = JSON.parse(resultJson);

         this.arrayDados = jsonResposta.dados;
        
         var i;

         this.novoArray = [];

         for(i = 0; i < this.arrayDados.length; i++)
         {
             if(this.arrayDados[i].nome != null)
                 this.novoArray.push(this.arrayDados[i]);
         }
    }

  persisteSelectTelaInicial(valor){
        var i;
        for(i = 0; i < this.arrayDados.length; i++)
        {
            if(this.arrayDados[i].nome == valor)
            {
                this.municipio = this.arrayDados[i].nome;
                this.uf = this.arrayDados[i].uf;
                this.urlWebservice = this.arrayDados[i].link_webservice;
                this.loginPadrao = this.arrayDados[i].usuario;
                this.senhaPadrao = this.arrayDados[i].senha;
                this.urlNota = this.arrayDados[i].link_nota;
            }
        }
    }
  
  login(user) {
     //     this.authservice.authenticate(user).then(data => {
     //         if(data) {
     //             this.navCtrl.setRoot(Userpage);
     //         }
     // });

     if(this.urlWebservice){
       this.authservice.authenticate(user, this.loginPadrao, this.senhaPadrao, this.urlWebservice);
       var resultJson = document.getElementById("demo").textContent || document.getElementById("demo").innerText || "";
       var jsonResposta = JSON.parse(resultJson);

       if(jsonResposta.status == 1){
  			// alert(jsonResposta.status_msg);
  	        this.showAlert('Erro', jsonResposta.status_msg);
  		}
  		
  		else if(jsonResposta.status == 0){      
  	        console.log(JSON.stringify(jsonResposta));
  			this.goToHome(JSON.stringify(jsonResposta), user.name, user.password, this.urlWebservice, this.loginPadrao, this.senhaPadrao, this.urlNota);
  		}
    }else{
      this.showAlert('Erro', 'Selecione um Município');
    }
		
	}

	goToHome(informacoesUsuario, login, senha, urlWebservice, loginPadrao, senhaPadrao, urlNota){
		// this.nav.push(HomePage, {param1: informacoesUsuario, param2: login, param3: senha});
		this.navCtrl.push(Userpage, {param1: informacoesUsuario, param2: login, param3: senha, param4: urlWebservice, param5: loginPadrao, param6: senhaPadrao, param7: urlNota, param8: this.municipio}).then(() => {
        // first we find the index of the current view controller:
        	const index = this.viewCtrl.index;
        // then we remove it from the navigation stack
        	this.navCtrl.remove(index);
        });
        //this.navCtrl.setRoot(Userpage);
	}

	showAlert(titulo, mensagem){
        let alert = this.alertCtrl.create({
          title: titulo,
          subTitle: mensagem,
          buttons: ['OK']
        });
        alert.present();
    }


}