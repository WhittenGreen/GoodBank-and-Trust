
const firebaseConfig = {
    apiKey: "AIzaSyAyzXtZd8w1FxfEp_KeNqfXlVieDY8MvG0",
    authDomain: "goodbank-d8d18.firebaseapp.com",
    projectId: "goodbank-d8d18",
    storageBucket: "goodbank-d8d18.appspot.com",
    messagingSenderId: "612884250368",
    appId: "1:612884250368:web:21df86dda29ed12a2ebde5",
    measurementId: "G-E2SC00JT8S"
  };

firebase.initialize(firebaseConfig);

function createAccount(name, email, password) {
    const auth  = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email,password);
	promise.catch(e => console.log(e.message));
}
