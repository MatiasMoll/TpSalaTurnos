import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-agregar-especialidad',
  templateUrl: './modal-agregar-especialidad.component.html',
  styleUrls: ['./modal-agregar-especialidad.component.css']
})
export class ModalAgregarEspecialidadComponent implements OnInit {

  @Output() eventClose:EventEmitter<any>;
  @Output() eventNewSpeciality:EventEmitter<any>;
  public nameSpeciality: string = '';

  constructor() {
    this.eventNewSpeciality = new EventEmitter<any>();
    this.eventClose = new EventEmitter<any>();
  }

  ngOnInit(): void {

  }

  eventoCerrar(){
    this.eventClose.emit();
  }

  agregarEspecialidad(){
    console.log(this.nameSpeciality);
    this.eventNewSpeciality.emit(this.nameSpeciality);
  }
}
