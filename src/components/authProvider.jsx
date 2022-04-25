import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, getUserInfo, registerNewUser, userExists } from "../firebase/firebase";
export  function AuthProviders({
  children,
  onUserLoggedIn,
  onUserNotRegistered,
  onUserNotLoggedIn,
}) {
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          const userInfo = await getUserInfo(user.uid);
          if(userInfo.processCompleted){
            onUserLoggedIn(userInfo);
          }else{
            onUserNotRegistered(userInfo);
          }
        } else {
          await registerNewUser({
            uid: user.uid,
            displayName: user.displayName,
            profilePicture:'',
            username:'',
            processCompleted: false
          });
          onUserNotRegistered(user);
        }
      } else {
        onUserNotLoggedIn(user);
      }
    });
  }, [onUserLoggedIn, onUserNotRegistered, onUserNotLoggedIn]);

  return <div>{children}</div>;
}
