import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id:'ABC123',
        //     title: '',
        //     body: '',
        //     date: 12345,
        //     imageUrls: []
        // }

    },
    reducers: {

        savingNewNote: (state)=>{
            state.isSaving=true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving=false;
        },
        setActiveNote: (state, action) => {
            state.active=action.payload;
        },
        setNotes: (state, action) => {
            state.notes= action.payload;
        },
        setSaving: (state) => {
            state.isSaving= true;
        },
        updateNote: (state, {payload}) => {
            state.isSaving = false;
            state.notes= state.notes.map(note=>{
                if(note.id===payload.id){
                    return payload;
                }
                return note;
            });
            state.messageSaved=`${payload.title} | Guardado`;
        },
        deleteNoteById: (state, action) => {

        },
    }
});


// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteByIdt
} = journalSlice.actions;