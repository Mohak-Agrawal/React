import * as firebase from 'firebase' 
import 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyC8Qq_PlO7IDCL4drGiJpQSGh3V01EQOt4",
    authDomain: "database-8faeb.firebaseapp.com",
    databaseURL: "https://database-8faeb.firebaseio.com",
    projectId: "database-8faeb",
    storageBucket: "database-8faeb.appspot.com",
    messagingSenderId: "83582050366",
    appId: "1:83582050366:web:b3a45dafc39ad8916b716f"
  };

  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  export default firebase;