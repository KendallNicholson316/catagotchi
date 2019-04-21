import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import Rebase from 're-base'

const config = {
  apiKey: "AIzaSyAO5QHBNHnT5kwvTzdNC0sKvW6VFciNbjE",
  authDomain: "catagotchi.firebaseapp.com",
  databaseURL: "https://catagotchi.firebaseio.com",
  projectId: "catagotchi",
  storageBucket: "catagotchi.appspot.com",
  messagingSenderId: "780470680502"
};

const app = firebase.initializeApp(config)

//configure database
const db = firebase.database(app)
const base = Rebase.createClass(db)

//configure authentication
export const auth = firebase.auth()
export const googleProvider = new firebase.auth.GoogleAuthProvider()

export default base
