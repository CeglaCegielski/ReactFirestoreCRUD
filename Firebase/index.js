import { initializeApp } from "firebase/app";
import { getFirestore,collection,addDoc,getDocs,doc, updateDoc,deleteDoc  } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDjbK0TEVXiFnrBqaQoPfGxtlIT0JET4Go",
  authDomain: "reactnativefirebasecrud-1a0d4.firebaseapp.com",
  projectId: "reactnativefirebasecrud-1a0d4",
  storageBucket: "reactnativefirebasecrud-1a0d4.firebasestorage.app",
  messagingSenderId: "20042184761",
  appId: "1:20042184761:web:04865b009e4ea3537235e8"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export{app,db,getFirestore,collection,addDoc,getDocs,doc, updateDoc,deleteDoc };