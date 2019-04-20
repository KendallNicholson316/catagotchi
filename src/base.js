import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyAO5QHBNHnT5kwvTzdNC0sKvW6VFciNbjE",
  authDomain: "catagotchi.firebaseapp.com",
  databaseURL: "https://catagotchi.firebaseio.com",
  projectId: "catagotchi",
  storageBucket: "catagotchi.appspot.com",
  messagingSenderId: "780470680502"
};

firebase.initializeApp(config)

//configure authentication
export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
