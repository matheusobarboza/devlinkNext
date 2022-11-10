import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYzOFG9YSK5v_o1xw8VVj9VrRcn9WsONA",
  authDomain: "devlink-992d8.firebaseapp.com",
  projectId: "devlink-992d8",
  storageBucket: "devlink-992d8.appspot.com",
  messagingSenderId: "642002923446",
  appId: "1:642002923446:web:160c85443836823bc91b17",
  measurementId: "G-8KXZFPR7T1"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };

