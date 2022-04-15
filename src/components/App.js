import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";


function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [init, setInit] = useState(false)
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true)
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => updateProfile(user, { displayName: user.displayName }),
        })
      } else {
        setIsLogin(false)
      }
      setInit(true)
    })
  }, []
  )

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  }

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} checkLogin={isLogin} userObj={userObj} /> : <div>initializing...</div>
      }
    </>
  );
}

export default App;
