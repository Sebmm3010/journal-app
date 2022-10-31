export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}
export const authenticatedState = {
    status: 'authenticated',
    uid: '123ABC',
    email: 'demo@gmail.com',
    displayName: 'Demo user',
    photoURL: 'https://demo.jpg',
    errorMessage: null,
}
export const notAutheticatedState = {
    status: 'not-autheticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const demoUser = {
   uid:'ABC11234',
   email: 'demo@google.com',
   displayName:'Demo user',
   photoURL: 'https://demo.jpg'
}