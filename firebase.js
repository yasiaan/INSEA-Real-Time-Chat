import firebase from 'firebase/app'

import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCN8AhL_y5kgELkI9XbJE3EMxma7UK4MqU",
  authDomain: "chat-clone-build.firebaseapp.com",
  projectId: "chat-clone-build",
  storageBucket: "chat-clone-build.appspot.com",
  messagingSenderId: "881509759372",
  appId: "1:881509759372:web:7df4385140f7a3714b7ea9"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };