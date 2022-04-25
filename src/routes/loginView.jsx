import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, userExists } from "../firebase/firebase";
import { AuthProviders } from "../components/authProvider";

import style from '../styles/loginView.module.css';

export default function LoginView() {
  const [currentUser, setCurrentUser] = useState(null);
  /**
   * STATE
   * 0: inicializado
   * 1: loading
   * 2: login completo
   * 3: login pero sin registro
   * 4: no hay nadie logueado
   * 5: ya existe el username
   * 6: nuevo username, click para continuar
   * 7: username no existe
   */
  const [state, setCurrentState] = useState(0);
  const navigate = useNavigate();
 
  async function handleOnClick() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);
  }
  async function signInWithGoogle(googleProvider) {
    try {
      const res = await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  }

function handleUserLoggeIn(user){
  navigate('/dashboard');
}
function handleUserNotRegistered(user){
  navigate('/choose-username');
}
function handleUserNotLoggedIn(){
 setCurrentState(4);
}






  

  if (state === 4) {
    return (
      <div className={style.loginView}>
        <h1>
          Personal CV 
        </h1>
        <button className={style.provider}  onClick={handleOnClick}>Login with Google</button>
      </div>
    );
  }
  
  
  
  return (
    <AuthProviders
      onUserLoggedIn={handleUserLoggeIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
    >
      <div>Loading...</div>
    </AuthProviders>
  );
}
