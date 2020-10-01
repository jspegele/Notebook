import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyASC_CYHhQKzKpaxSDeIfwiV2XasBbri3Y",
  authDomain: "notebook-ae43e.firebaseapp.com",
  databaseURL: "https://notebook-ae43e.firebaseio.com",
  projectId: "notebook-ae43e",
  storageBucket: "notebook-ae43e.appspot.com",
  messagingSenderId: "388830655598",
  appId: "1:388830655598:web:69b53ed338018341ace27f",
  measurementId: "G-TWBZP7YR6K"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
