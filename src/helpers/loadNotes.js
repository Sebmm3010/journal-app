import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";


export const loadNotes = async( uid='' ) => {

    if (!uid) throw new Error('El uid del usuario no existe');

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notas`);
    const q= query(collectionRef, orderBy('date', 'asc'));
    const docs= await getDocs( q );

    const notes=[];
    docs.forEach( doc=>{
        notes.push({ id: doc.id, ...doc.data() });
    });
    return notes;
}