import { loginWithEmailPassword, logoutFireBase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { clearNoteLogout } from "../journal";
import { chekingCredencials, login, logout } from "./authSlice"


export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {
        dispatch(chekingCredencials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(chekingCredencials());

        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    }
}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async (dispatch) => {

        dispatch(chekingCredencials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });
        if (!ok) return dispatch(logout(errorMessage));

        dispatch(login({ uid, displayName, email, photoURL }));
    }
}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {

        dispatch(chekingCredencials());

        const { ok, uid, displayName,photoURL, errorMessage }= await loginWithEmailPassword({ email, password });

        if (!ok) return dispatch(logout(errorMessage));

        dispatch(login({ ok,uid, displayName,email, photoURL }));
    }
}

export const startLogout = () => {
   
    return async( dispatch )=>{

        await logoutFireBase();
        dispatch(logout({errorMessage:null}));
        dispatch(clearNoteLogout());
    }
}