import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB2uShNOYHj7ncBvthAXcOiY3YH3LKIVPQ",
  authDomain: "netflixclone-d4e1d.firebaseapp.com",
  projectId: "netflixclone-d4e1d",
  storageBucket: "netflixclone-d4e1d.appspot.com",
  messagingSenderId: "802922790353",
  appId: "1:802922790353:web:453526914ad8e38e5ef4f0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


const signup = async (name,email,password)=>{
   try {
    const res =  await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await addDoc(collection(db,"users"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email
    })
   } catch (error) {
     console.log(error)
     toast.error("SignUp Failed")
   }
}


const login = async (email,password) => {
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error)
        toast.error("Incorrect Email or Password")
    }
}


const logout = ()=>{
    signOut(auth)
}

export {auth,db,login,signup,logout}