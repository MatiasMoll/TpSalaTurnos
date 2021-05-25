import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public usuarioLogeado;
  constructor(
    private auth : AuthService
  ) { }

  ngOnInit(): void {
    this.usuarioLogeado = AuthService.tipoUsuarioLogeado;
    console.log(this.usuarioLogeado);
  }

}
