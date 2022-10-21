import { signInWithGoogle } from "../../firebase/providers";
import { chekingCredencials, login, logout } from "./authSlice"


export const checkingAuthentication=( email, password )=>{
    return async( dispatch )=>{
        dispatch( chekingCredencials() );
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(chekingCredencials());

        const result= await signInWithGoogle();
        if( !result.ok ) return dispatch( logout( result.errorMessage ) );

        dispatch( login( result ) );
    }
}