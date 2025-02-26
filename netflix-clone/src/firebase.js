import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAlqtRIr_zUGOPj3GLiusqI5UcrXOWyWpQ",
  authDomain: "netflix-clone-d3260.firebaseapp.com",
  projectId: "netflix-clone-d3260",
  storageBucket: "netflix-clone-d3260.firebasestorage.app",
  messagingSenderId: "503841985346",
  appId: "1:503841985346:web:d937fb5b60dad6a220eedb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;

    await addDoc(collection(db, "users"), {  
      uid: user.uid,
      name,
      authProvider: "local",
      email
    });

  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = async () => { 
  try {
    await signOut(auth);
  } catch (error) {
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

export { auth, db, login, logout, signUp };
