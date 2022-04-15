import { authService, firebaseInstance } from "fbase";
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import AuthForm from "components/AuthForm";


const Auth = () => {

  const [newAccount, setNewAcount] = useState(true)

  const toggleChange = () => {
    setNewAcount((prev) => !prev)
  }

  const onSocialClick = async (event) => {
    const { target: { name } } = event;
    const provider = new GoogleAuthProvider()
    const data = await signInWithPopup(authService, provider);
    console.log(data)

  }

  return (
    <div>
      <AuthForm />
      <div>
        <button>Go with Email</button>
        <button onClick={onSocialClick} name="google">Go with Google</button>
        <span onClick={toggleChange}>{newAccount ? "SignIn" : "New Account"}</span>
      </div>
    </div>
  )
}

export default Auth