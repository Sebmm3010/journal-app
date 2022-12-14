import { useEffect, useRef } from "react"

import { SaveOutlined, FileUploadOutlined, Notes, DeleteOutline } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { ImgGallery } from "../components"
import { useNoteView } from "../hooks";



const formValidations = {
    title: [(value = '') => value.length >= 1, 'No es posible guardar notas sin titulo'],
    body: [(value = '') => value.length >= 1, 'No es posible guardar notas sin contenido']
}

export const NoteView = () => {

    // const dispatch = useDispatch();
    // const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)


    // const [formSubbmited, setFormSubbmited] = useState(false);
    // const { body, title, date, onInputChange, formState,
    //     bodyValid, titleValid, isFormValid } = useForm(note, formValidations);

    // useEffect(() => {
    //     dispatch(setActiveNote(formState));
    // }, [formState]);



    // const dateString = useMemo(() => {
    //     const newDate = new Date(date);
    //     return newDate.toDateString() + '.';
    // }, [date]);


    // const onSaveNote = () => {
    //     setFormSubbmited(true);
    //     if (!isFormValid) return;
    //     dispatch(startSaveNote());
    //     setFormSubbmited(false);
    // }
    // const onFileInputChange = ({ target }) => {
    //     if (target.files === 0) return;
    //     dispatch(startUploadingFiles(target.files));
    // }
    // const onDelete=()=>{
    //     dispatch(startDeletingNote());
    // }
    const {
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
        note,
        messageSaved
    } = useNoteView(formValidations);
    useEffect(() => {
        if (messageSaved.length > 0) {
            toast.success(messageSaved, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }, [messageSaved]);

    const fileInputRef = useRef();
    return (
        <>
            <Grid container
                className=" animate___animated animate__fadeInUp animate__faster"
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                sx={{ mb: 1 }}
            >
                {/* Titulo */}
                <Grid item>
                    <Typography fontSize={39} fontWeight='light'> {dateString} </Typography>
                </Grid>
                {/* Boton guardar */}
                <Grid item>
                    <input
                        type="file"
                        multiple
                        name=""
                        id=""
                        onChange={onFileInputChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                    />

                    <IconButton
                        color="primary"
                        disabled={isSaving}
                        onClick={() => fileInputRef.current.click()}
                    >
                        <FileUploadOutlined />
                    </IconButton>

                    <Button
                        disabled={isSaving}
                        onClick={onSaveNote}
                        color='primary'
                        sx={{ padding: 2 }}
                    >
                        <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                        Guardar
                    </Button>
                </Grid>

                {/* Nota */}
                <Grid container>
                    <TextField
                        type='text'
                        variant="filled"
                        fullWidth
                        placeholder="Ingrese el titulo de la nota"
                        label="Titulo"
                        sx={{ border: 'none', mb: 1 }}
                        name="title"
                        value={title}
                        onChange={onInputChange}
                        error={!!titleValid && formSubbmited}
                        helperText={formSubbmited ? titleValid : ''}
                    />

                    <TextField
                        type='text'
                        variant="filled"
                        fullWidth
                        multiline
                        placeholder="??Que hay de nuevo?"
                        label="Nota"
                        minRows={5}
                        name="body"
                        value={body}
                        onChange={onInputChange}
                        error={!!bodyValid && formSubbmited}
                        helperText={formSubbmited ? bodyValid : ''}
                    />
                </Grid>
                <Grid container
                    justifyContent='end'
                >
                    <Button
                        onClick={onDelete}
                        sx={{ mt: 2 }}
                        color='error'
                    >
                        <DeleteOutline />
                        Borrar
                    </Button>
                </Grid>

                {/* Galeria */}
                <ImgGallery images={note.imageUrls} />
            </Grid>
            <ToastContainer />
        </>
    )
}
