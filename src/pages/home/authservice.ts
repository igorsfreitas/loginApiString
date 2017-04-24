import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Userpage} from '../userpage/userpage';

import { GlobalServices } from '../home/globalServices';
 
@Injectable()
export class AuthService {
    
    isLoggedin: boolean;
    AuthToken;
    
    constructor(public http: Http, public globalServices: GlobalServices) {
        this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
    }
    
    storeUserCredentials(token) {
        window.localStorage.setItem('raja', token);
        this.useCredentials(token);
        
    }
    
    useCredentials(token) {
        this.isLoggedin = true;
        this.AuthToken = token;
    }
    
    loadUserCredentials() {
        var token = window.localStorage.getItem('raja');
        this.useCredentials(token);
    }
    
    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.clear();
    }
    
    // authenticate(user) {
    //     alert(user.name+" - "+user.password);
    //     var creds = "loginApp=" + user.name + "&senhaApp=" + user.password + "&login=usumobdesenv&senha=passdesenv123";
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //     alert(creds);

    //     // alert(creds+" - "+headers);
        
    //     return new Promise(resolve => {
    //         this.http.post('http://usve79048.serverprofi24.com/newiss/webservice/ws_dadoslogin.php', creds, {headers: headers}).subscribe(data => {
    //             alert(creds);
    //             if(data.json().success){
    //                 this.storeUserCredentials(data.json().token);
    //                 alert("foi");
    //                 resolve(true);
    //             }
    //             else
    //                 alert("nal foi");
    //                 resolve(false);
    //         });
    //     });
    // }


     authenticate(user, loginPadrao, senhaPadrao, urlWebservice) {
         alert(user.name+" - "+user.password);   
         var xhttp = new XMLHttpRequest();

         var data = new FormData();

         data.append('login', loginPadrao);
         data.append('senha', senhaPadrao);
         data.append('loginApp', user.name);
         data.append('senhaApp', user.password);

        xhttp.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var elemento = document.getElementById("demo");

                elemento.innerHTML = this.responseText;

                return;
            }
        };

         xhttp.open("POST", ""+urlWebservice+"/ws_buscaalvara.php", false);
         xhttp.send(data);
     }

     pesquisar(userLogin, userSenha, loginPadrao, senhaPadrao, urlWebservice, pesquisaLetrasPlaca, pesquisaNumerosPlaca, pesquisaCnpj) {
         var xhttp = new XMLHttpRequest();
         var data = new FormData();

         data.append('login', loginPadrao);
         data.append('senha', senhaPadrao);
         data.append('loginApp', userLogin);
         data.append('senhaApp', userSenha);
         //if(pesquisaCnpj!="" && pesquisaCnpj!=" " && pesquisaCnpj!=null && pesquisaCnpj!=undefined){
            data.append('cnpj', pesquisaCnpj);
         //}else if(pesquisaLetrasPlaca!="" && pesquisaLetrasPlaca!=" " && pesquisaLetrasPlaca!=null && pesquisaLetrasPlaca!=undefined){
            data.append('letras', pesquisaLetrasPlaca);
         //}else if(pesquisaNumerosPlaca!="" && pesquisaNumerosPlaca!=" " && pesquisaNumerosPlaca!=null && pesquisaNumerosPlaca!=undefined){
            data.append('numeros', pesquisaNumerosPlaca);
         //}

         alert(data);

        xhttp.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var elemento = document.getElementById("pesquisaUserpage");

                elemento.innerHTML = this.responseText;

                return;
            }
        };

         xhttp.open("POST", ""+urlWebservice+"/ws_buscaalvara.php", false);
         xhttp.send(data);
     }

     listarPrefeituras(){
        var xhttp = new XMLHttpRequest();

        var data = new FormData();

        data.append('login', 'agillApp02SMTP');
        data.append('senha', 'p@SsApp01#SmtP');


        xhttp.onreadystatechange = function()
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                var elemento = document.getElementById("demo");

                elemento.innerHTML = this.responseText;

                return;
            }
        };

        xhttp.open("POST", "http://www.agill.com.br/app_servicos_smtt/ws_prefeituras.php", false);
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send(data);
    }


     // adduser(user) {
     //     var creds = "name=" + user.name + "&password=" + user.password;
     //     var headers = new Headers();
     //     headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
     //     return new Promise(resolve => {
     //         this.http.post('http://localhost:3333/adduser', creds, {headers: headers}).subscribe(data => {
     //             if(data.json().success){
     //                 resolve(true);
     //             }
     //             else
     //                 resolve(false);
     //         });
     //     });
     // }
    
    // getinfo() {
    //     return new Promise(resolve => {
    //         var headers = new Headers();
    //         this.loadUserCredentials();
    //         console.log(this.AuthToken);
    //         headers.append('Authorization', 'Bearer ' +this.AuthToken);
    //         this.http.get('http://localhost:3333/getinfo', {headers: headers}).subscribe(data => {
    //             if(data.json().success)
    //                 resolve(data.json());
    //             else
    //                 resolve(false);
    //         });
    //     })
    // }
    
    logout() {
        this.destroyUserCredentials();
    }
}