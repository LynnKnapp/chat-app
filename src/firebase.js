import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyBMmlWWfdL2DQ2-3MEBzY6CzKW1mBozi0c",
    authDomain: "chit-chat-app-a9ad3.firebaseapp.com",
    databaseURL: "https://chit-chat-app-a9ad3.firebaseio.com",
    projectId: "chit-chat-app-a9ad3",
    storageBucket: "chit-chat-app-a9ad3.appspot.com",
    messagingSenderId: "137705152572",
    appId: "1:137705152572:web:fedacb5c999a5aab612339",
    measurementId: "G-MMPD3DLT4M"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

  export default firebase