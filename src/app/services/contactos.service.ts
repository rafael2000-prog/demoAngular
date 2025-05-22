import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Contacto {
  id?: string;
  nombre: string;
  direccion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  constructor() { }
  private firestore = inject(Firestore);

  addContacto(nombre: string, direccion: string){

    return addDoc(collection(this.firestore, 'contactos'), {'nombre': nombre, 'direccion': direccion})

  }

  getContactos(): Observable<any[]> {
    const contactosRef = collection(this.firestore, 'contactos');
    return collectionData(contactosRef, { idField: 'id' });
  }

  updateContacto(contacto: Contacto) {
    const contactoRef = doc(this.firestore, `contactos/${contacto.id}`);
    const { id, ...data } = contacto;
    return updateDoc(contactoRef, data);
  }

  deleteContacto(id: string) {
    const contactoRef = doc(this.firestore, `contactos/${id}`);
    return deleteDoc(contactoRef);
  }
}
