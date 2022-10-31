import { authSlice, chekingCredencials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => {
    test('debe de regresar el estado inicial y llamarse "auth"', () => {
        expect(authSlice.name).toBe('auth');
        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
    });

    test('Debe de realizar la autenticacion', () => {

        const state = authSlice.reducer(initialState, login(demoUser));
        expect(state).toEqual({
            status: 'authenticated',
            uid: 'ABC11234',
            email: 'demo@google.com',
            displayName: 'Demo user',
            photoURL: 'https://demo.jpg',
            errorMessage: null,
        })
    });

    test('Realizar el logout sin argumentos', () => {
        const state = authSlice.reducer(authenticatedState, logout());
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });
    test('Debe realizar logout y mostrar un mensaje de error', () => {
        const errorMessage = 'Credenciales no son correctas';

        const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));

        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        })
    });
    test('debe de cambiar el estado a checking', () => {

        const state = authSlice.reducer(authenticatedState, chekingCredencials());
        expect(state.status).toBe('checking');
    });
});