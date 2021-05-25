import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public tipoUsuario:string;
  public nuevoUsr:string;
  public nuevoPass:string;
  public formGroup:FormGroup;
  public selectedValue:string;
  public especialidades;
  public opcionSeleccionada;
  public showSpinner:boolean = false;
  public seAgregoEsp:boolean;

  constructor(
    public router:Router,
    public activeRoute:ActivatedRoute,
    public auth:AuthService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.especialidades = [
      {'id':'card','name':'Cardiologia'},
      {'id':'oft','name':'Oftalmologia'}
    ];
    this.tipoUsuario = this.activeRoute.snapshot.paramMap.get('isEspecialista');
    if(this.tipoUsuario == 'paciente'){
      this.formGroup = this.formGroupPaciente();
    }else if(this.tipoUsuario == 'especialista'){
      this.formGroup = this.formGroupEspecialista();
    }
    
  }

  registroWithEmailAndPassword(){
    let email = this.formGroup.controls['email'].value;
    let pass = this.formGroup.controls['contraseña'].value;
    let nombre = this.formGroup.controls['nombre'].value;
    this.showSpinner = true;
    this.auth.registroWithEmailAndPassword(nombre,pass,email,this.tipoUsuario);
    this.showSpinner = AuthService.showSpinner;
    let mensaje = "Se ha enviado un correo de verificacion a la casilla " + email;
    if(this.tipoUsuario == 'paciente'){
      alert(mensaje);
      this.showSpinner = false;
    } 
    
  }


  agregarEsp(){
    console.log(this.formGroup.controls['especialidad'].value);
    if(this.formGroup.controls['especialidad'].value == 'agregar'){
      this.seAgregoEsp = true;
    }else{
      this.seAgregoEsp = false;
    }
  }


  formGroupEspecialista(){
    return this.fb.group({
      'nombre':['',[Validators.required,this.spaceValidator]],
      'apellido':['',Validators.required],
      'edad':['',[Validators.required,Validators.min(18),Validators.max(99)]],
      'dni':['',Validators.required],
      'email':['',[Validators.required,Validators.email]],
      'contraseña':['',Validators.required],
      'especialidad':['',Validators.required]
    });
  }
  
  formGroupPaciente(){
    return this.fb.group({
      'nombre':['',[Validators.required,this.spaceValidator]],
      'apellido':['',Validators.required],
      'edad':['',[Validators.required,Validators.min(18),Validators.max(99)]],
      'dni':['',Validators.required],
      'email':['',[Validators.required,Validators.email]],
      'contraseña':['',Validators.required],
      'obraSocial':['',Validators.required]
    });

  }
  private spaceValidator(control: AbstractControl): null | object {
    const nombre = <string> control.value;
    const espacios = nombre.includes(' ');

    if(espacios){
      return {
        contieneEspacios:true
      }
    }else{
      return null;
    }
  }
}
