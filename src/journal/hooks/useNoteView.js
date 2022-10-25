import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";

export const useNoteView = (formValidations) => {
    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)


    const [formSubbmited, setFormSubbmited] = useState(false);
    const { body, title, date, onInputChange, formState,
        bodyValid, titleValid, isFormValid } = useForm(note, formValidations);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toDateString() + '.';
    }, [date]);


    const onSaveNote = () => {
        setFormSubbmited(true);
        if (!isFormValid) return;
        dispatch(startSaveNote());
        setFormSubbmited(false);
    }
    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        dispatch(startUploadingFiles(target.files));
    }
    const onDelete = () => {
        dispatch(startDeletingNote());
    }

    return{
        messageSaved,
        dateString,
        onFileInputChange,
        isSaving,
        onSaveNote,
        title,
        titleValid,
        formSubbmited,
        onInputChange,
        body,
        bodyValid,
        onDelete,
        note
    }
}