import { useState } from "react";
import { useRouter } from "next/router";
import { auth, provider } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const signIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if(user) router.push("/");
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        router.push("/");
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div>
      {!user ? (
        <button onClick={signIn}>Login with Google</button>
      ) : (
        <button onClick={signOut}>Sign out {user.email}</button>
      )}
    </div>
  );
};
export default Login;
