import { chekingCredencials } from "./authSlice"


export const checkingAuthentication=( email, password )=>{
    return async( dispatch )=>{
        dispatch( chekingCredencials() );
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(chekingCredencials());
    }
}