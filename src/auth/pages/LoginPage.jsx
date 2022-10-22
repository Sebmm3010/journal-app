import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from '../layout/AuthLayout';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useForm } from '../../hooks';


const formData = {
  email: '',
  password: ''
}

const formValidations = {
  email: [(value = '') => value.includes('@'), 'El email necesita llevar un @'],
  password: [(value = '') => value.length >= 6, 'La contraseña debe tener al menos 6 caracteres']
}

export const LoginPage = () => {


  const { status, errorMessage } = useSelector(state => state.auth);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { email, password, onInputChange, formState,
    emailValid, passwordValid, isFormValid } = useForm(formData, formValidations);

  const isAuthtenticated = useMemo(() => status === 'checking', [status]);

  const dispatch = useDispatch();

  const onSubmit = (event) => {

    event.preventDefault();

    setFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startLoginWithEmailPassword(formState));
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  }

  return (

    <AuthLayout title="Login">

      <form onSubmit={onSubmit} >
        <Grid container>
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
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          {/* Grid de botones */}
          <Grid container
            spacing={2}
            sx={{ mb: 2, mt: 1 }}
          >
            <Grid item
              xs={12}
              display={!!errorMessage ? '' : 'none'}
            >
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>
            <Grid item
              xs={12}
              sm={6}
            >
              <Button
                disabled={isAuthtenticated}
                type="submit"
                variant="contained"
                fullWidth>
                Iniciar sesión
              </Button>
            </Grid>

            <Grid item
              xs={12}
              sm={6}
            >
              <Button
                disabled={isAuthtenticated}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}>
                <Google />
                <Typography sx={{ ml: 1 }} >Google</Typography>
              </Button>
            </Grid>
            {/* Link a RegisterPage */}
            <Grid container
              direction='row'
              justifyContent='end'
              sx={{ mt: 2 }}
            >
              <Link component={RouterLink}
                color="inherit"
                to="/auth/registro"
              >
                Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
