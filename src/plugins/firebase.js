import { firebase } from "@firebase/app";
import "@firebase/firestore";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAaLcoIBSvXMaF79gSjgNmQgA5TEeY7_rs",
  authDomain: "todotify.firebaseapp.com",
  databaseURL: "https://todotify.firebaseio.com",
  projectId: "todotify",
  storageBucket: "todotify.appspot.com",
  messagingSenderId: "867691522301",
  appId: "1:867691522301:web:6bd2cf782b9424638ff694",
  measurementId: "G-281Z8H980R",
});

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

export default firestore;
