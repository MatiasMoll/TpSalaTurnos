import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class JuegosService {

  private dbPath = '/juegos';

  juegosRef: AngularFirestoreCollection<any>;
  mapUsuarioMayorPuntaje = new Map<any,any>();
  constructor(
    private db: AngularFirestore,
    private af: AngularFireAuth
  ) { 
    
    this.juegosRef = db.collection(this.dbPath,ref => ref.orderBy('jugador'));
   
  }

 

  uploadScore(score){
    return this.juegosRef.add({...score});
  }

  allScores(){
    return this.juegosRef;
  }

  getCurrentUserScore(juego){
    let scores = {
      'juego':juego,
      'juegosEmpatados':0,
      'juegosGanados':0,
      'juegosPerdidos':0,
      'jugador':'',
      'jugadorName':''
    };
    let juegosTotales = -1;
    this.allScores().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      console.log(data);
      data.forEach(element => {
        console.log(element);
        if(element['jugador'] == AuthService.iudUserLogged && element['juego'] == juego){
          let juegosGuardados = element['juegosGanados'] + element['juegosEmpatados'] + element['juegosPerdidos'];
          if(juegosGuardados > juegosTotales){
            juegosTotales = juegosGuardados;
            scores = {
              'juego':juego,
              'juegosEmpatados':element['juegosEmpatados'],
              'juegosGanados':element['juegosGanados'],
              'juegosPerdidos':element['juegosPerdidos'],
              'jugador':element['jugador'],
              'jugadorName':element['jugadorName']
            };
          }
        }
      })
    
    });
    return scores;
  }


  getAllScoreOfAGame(juego){
    let listaScores = Array<any>();
    let scores = {
      'juego':juego,
      'juegosEmpatados':0,
      'juegosGanados':0,
      'juegosPerdidos':0,
      'jugador':'',
      'jugadorName':''
    };
    let juegosTotales = -1;
    let jugadorActual = '';
    return this.allScores().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({...c.payload.doc.data() })
        )
      )
    );
  }
}
