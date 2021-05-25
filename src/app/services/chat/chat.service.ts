import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../../modelos/mensaje';
@Injectable({
  providedIn: 'root'
})
export class MensajesFirestoreService {

  private dbPath = '/mensajeFire';

  MensajesRef: AngularFirestoreCollection<Mensaje>;
  UsuariosRef: AngularFirestoreCollection<any>;
  constructor(
    private db: AngularFirestore,
    private af: AngularFireAuth
  ) {
    this.MensajesRef = db.collection(this.dbPath, ref => ref.orderBy('created'));
    this.UsuariosRef = db.collection('/userLogged');
  }

  getAll(): AngularFirestoreCollection<Mensaje> {
    return this.MensajesRef;
  }

  create(mensajes: Mensaje): any {
    return this.MensajesRef.add({ ...mensajes });
  }

  update(id: string, data: any): Promise<void> {
    return this.MensajesRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.MensajesRef.doc(id).delete();
  }
}
