import { useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, IconButton, InputAdornment, Link, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunk';
import { Visibility, VisibilityOff } from '@mui/icons-material';


const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value = '') => value.includes('@'), 'El email necesita llevar un @'],
  password: [(value = '') => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres'],
  displayName: [(value = '') => value.length >= 1, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {

  const dispath= useDispatch(); 

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage }= useSelector( state=> state.auth );
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const { displayName, email, password, onInputChange, formState,
          displayNameValid, emailValid, passwordValid, isFormValid} = useForm(formData, formValidations);

  const handleSubmit = (event) => {
    
    event.preventDefault();
    
    setFormSubmitted(true);
    
    if(!isFormValid) return;

    dispath( startCreatingUserWithEmailPassword(formState) );

  }
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (

    <AuthLayout title="Crear una cuenta">
      <form onSubmit={handleSubmit} className='animate__animated animate__fadeIn animate__faster  ' >
        <Grid container>
          <Grid item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Nombre"
              type="text"
              placeholder="Nombre"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>


          <Grid item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Correo"
              type="email"
              placeholder="exaple@gmail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item
            xs={12}
            sx={{ mt: 2 }}
          >
            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          {/* Grid de botones */}
          <Grid container
            spacing={2}
            sx={{ mb: 2, mt: 1 }}
          >
            <Grid container
              display={!!errorMessage ? '' : 'none'}

            >
              <Grid item
                xs={12}
              >
                <Alert
                  severity='error'
                >{errorMessage}</Alert>
              </Grid>
            </Grid>
            <Grid item
              xs={12}
            >
              <Button
                disabled={isCheckingAuthentication}
                type='submit'
                variant="contained"
                fullWidth
              >
                Crear cuanta
              </Button>
            </Grid>


            {/* Link a RegisterPage */}
            <Grid container
              direction='row'
              justifyContent='end'
              sx={{ mt: 2 }}
            >
              <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
              <Link component={RouterLink}
                color="inherit"
                to="/auth/login"
              >
                Ingresar
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
