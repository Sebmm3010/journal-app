import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImgGallery } from "../components"


export const NoteView = () => {
    return (
        <Grid container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ mb: 1 }}
        >
            {/* Titulo */}
            <Grid item>
                <Typography fontSize={39} fontWeight='light'> 17 de octubre, 2022 </Typography>
            </Grid>
            {/* Boton guardar */}
            <Grid item>
                <Button color='primary' sx={{ padding:2 }} >
                    <SaveOutlined sx={{ fontSize: 30, mr:1 }}/>
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
                />

                <TextField
                    type='text'
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Que hay de nuevo?"
                    label="Nota"
                    minRows={5}
                />
            </Grid>

            {/* Galeria */}
            <ImgGallery/>
        </Grid>
    )
}
