import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  	public usrName:string;
	public usrPass:string;
	public showSpinner:boolean = false;

	constructor(
		public fireAuth:AngularFireAuth,
		public router:Router,
		public authService: AuthService
	) {
			
	}

	ngOnInit() {
	}
	irAlRegistro(tipoUsuario:string){
		console.log(tipoUsuario);
		this.router.navigate(['/registro',tipoUsuario]);
	}
	loginWithGoogle(){
		this.authService.GoogleAuth();
	}

	login(){
		this.showSpinner = true;
		this.authService.loginWithEmailAndPassword(this.usrName,this.usrPass);
		setTimeout(()=>{
			this.showSpinner = false;
		},2000);
		
	}        
	clearInputs(){
		this.usrName = "";
	}
	
	fillInputs(){
		this.usrName = "test@gmail.com";
		this.usrPass = "isanoe20";
	}
}
