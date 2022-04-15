import { authService } from "fbase";
import React, { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


const AuthForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newAccount, setNewAcount] = useState(true)
  const [error, setError] = useState("")

  const onChange = (event) => {
    const { target: { name, value } } = event;
    if (name === "email") {
      setEmail(value)
    } else if (name === "password") {
      setPassword(value)
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    console.log(email, password)
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(authService, email, password)
      } else {
        data = await signInWithEmailAndPassword(authService, email, password)
      }
      console.log(data)

    } catch (error) {
      console.log(error)
      setError(error.message.replace("Firebase: ", ""))
    }
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
      >
        <input name="email" type="email" placeholder="email" value={email} onChange={onChange} required />
        <input name="password" type="password" placeholder="password" value={password} onChange={onChange} required />
        <input type="submit" value={newAccount ? "make new account" : "log in"} />
        <span>{error}</span>
      </form>
    </div>
  )
}

export default AuthForm