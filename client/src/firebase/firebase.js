import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBHZ8gcsHr6Xn6n54m715hawQkizfiEPTc",
  authDomain: "mern-graphql.firebaseapp.com",
  // databaseURL: "https://mern-graphql.firebaseio.com",
  projectId: "mern-graphql",
  storageBucket: "mern-graphql.appspot.com",
  // messagingSenderId: "858391887425",
  appId: "1:858391887425:web:70c5502db6d247b5fbd0c0",
  measurementId: "G-X7BZKQMH9R"
};

// initialize firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();