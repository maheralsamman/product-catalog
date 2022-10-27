import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, provider } from "../firebase";
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import styles from "../styles/Login.module.css";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const logIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        //const token = credential.accessToken;
        const user = result.user;
        if (user) router.push("/");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        //const errorCode = error.code;
        //const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.customData.email;
        // The AuthCredential type that was used.
        //const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user.displayName, "is logged in");
        //const uid = user.uid;
      }
    });
  }, []);

  return (
    <div className={styles.login}>
      {!user ? (
        <button className={styles.signIn} onClick={logIn}>
          Login with Google
        </button>
      ) : (
        <button className={styles.signOut} onClick={logOut}>
          <span className={styles.signOutText}>Sign out from: </span>
          {user.email}
        </button>
      )}
    </div>
  );
};
export default Login;
