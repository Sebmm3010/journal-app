import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { addNewEmptyNote, setActiveNote } from "./";
import { deleteNoteById, savingNewNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {

    return async (dispatch, getState) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            title: 'Titulo',
            body: 'Cuerpo de la nota',
            imageUrls: [],
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notas`));

        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        // Dispatches
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    }

}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;
        if (!uid) throw new Error('El uid del usuario no existe');

        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;
        const docRef = doc(FirebaseDB, `${uid}/journal/notas/${note.id}`);

        await setDoc(docRef, noteToFireStore, { merge: true });
        dispatch(updateNote(note));
    }
}
export const startUploadingFiles = (files = []) => {
    return async(dispatch)=>{
        dispatch(setSaving());

        // await fileUpload( files[0] );
        const fileUploadPromises= [];

        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ) );
        }
        const photosUrl= await Promise.all( fileUploadPromises );
        dispatch( setPhotosToActiveNote(photosUrl) );
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState)=>{
        const { uid }= getState().auth;
        const { active:note }= getState().journal;

        const docRef = doc(FirebaseDB, `${ uid }/journal/notas/${ note.id }` );
        await deleteDoc( docRef );

        dispatch(deleteNoteById(note.id));
    }
}