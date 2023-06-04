import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig: Object = {
    apiKey: 'AIzaSyArG7R8uPvld3IL1LKjyDGxo-M8cDsg7MM',
    authDomain: 'music-p Artlayer-fa87c.firebaseapp.com',
    projectId: 'music-player-fa87c',
    storageBucket: 'music-player-fa87c.appspot.com',
    messagingSenderId: '263857665039',
    appId: '1:263857665039:web:6112b14b26113e01955f7a'
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = firebase.firestore()

const usersCollection = db.collection('users')

export { auth, db, usersCollection }
