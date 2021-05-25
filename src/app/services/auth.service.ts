import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';   
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase';


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private usersLogged:string = '/userLogged';
    public isLogged:Boolean;
    public static userNameLogged:string;
    public static showSpinner:boolean = false;
    public static tipoUsuarioLogeado:string;
    private dataBase:AngularFirestore;

    UsuariosRef: AngularFirestoreCollection<any>;

    constructor(
        public afAuth: AngularFireAuth,
        public router: Router, // Inject Firebase auth service
        public db:AngularFirestore
    ) { 
        this.dataBase = db;
        this.UsuariosRef = db.collection(this.usersLogged);
    }

    // Sign in with Google
    GoogleAuth() {
        return this.AuthLogin(new firebase.default.auth.GoogleAuthProvider());
    }

    // Auth logic to run auth providers
    AuthLogin(provider) {
        return this.afAuth.signInWithPopup(provider)
        .then((result) => {
            console.log('You have been successfully logged in!');
            console.log(provider);
            console.log(result.additionalUserInfo.profile);
            AuthService.userNameLogged = result.additionalUserInfo.profile['name'];
            this.isLogged = true;
            
            this.router.navigate(['home']);

        }).catch((error) => {
            console.log(error)
        })
    }

    //Auth with emailAndPassword
    loginWithEmailAndPassword(name:string,pass:string){
        AuthService.showSpinner = true;


        this.afAuth.signInWithEmailAndPassword(name,pass)
            .then((result)=>{
                let loggedUser: AngularFirestoreCollection<any> = this.dataBase.collection(this.usersLogged,ref => ref.where('email','==',name));
                let usuarioLogeaddo;               
                loggedUser.valueChanges().subscribe((data)=> {
                    AuthService.tipoUsuarioLogeado = data[0].tipo;
                    console.log(AuthService.tipoUsuarioLogeado);
                    AuthService.showSpinner = false;
                    this.router.navigate(['home']);
                });            
                this.isLogged = true;
                //this.UsuariosRef.add({email:name,logged:Date.now()});                
                console.log(AuthService.tipoUsuarioLogeado);
                
            })
            .catch((res)=>{
                alert(res);
                AuthService.showSpinner = false;
                this.router.navigate(['error']);
            });      
    }
    
    registroWithEmailAndPassword(name:string,pass:string,email:string,tipoUsuario:string){
        AuthService.showSpinner = true;
        this.afAuth.createUserWithEmailAndPassword(email,pass)
            .then(()=>{
                this.isLogged = true;
                this.router.navigate(['home']);
                this.UsuariosRef.add({email:email,logged:Date.now(),tipo:tipoUsuario})
                AuthService.showSpinner = false;
                alert('Usuario registrado correctamente');
            })
            .catch((res)=>{
                AuthService.showSpinner = false;
                console.log(res);
                alert('Ingrese Email y contraseña validos');
                
            });
    }

}