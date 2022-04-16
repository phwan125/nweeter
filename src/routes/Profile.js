import MyNweets from "components/MyNweets";
import { authService, dbService } from "fbase";
import { updateProfile } from "firebase/auth";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


const Profile = ({ userObj, refreshUser }) => {
  const [newProfileName, setNewProfileName] = useState(userObj.displayName)
  const [myNweets, setMyNweets] = useState([])

  const history = useHistory()
  const onLogOutClick = () => {
    authService.signOut()
    history.push("/")
  }

  const getMyNweets = async () => {
    const myQuery = query(collection(dbService, "nweets"), where("createdId", "==", `${userObj.uid}`))
    const querySnapshot = await getDocs(myQuery)
    querySnapshot.forEach((doc) => {
      // console.log(doc.id, "=> ", doc.data())
      setMyNweets(prev => [doc.data(), ...prev])
    })
  }
  useEffect(() => {
    getMyNweets()
  }, [])

  const onChange = (event) => {
    const { target: { value } } = event
    setNewProfileName(value)
  }
  const onSubmit = async (event) => {
    event.preventDefault()
    if (userObj.displayName !== newProfileName) {
      await updateProfile(authService.currentUser, { displayName: newProfileName })
      refreshUser()
    }

  }
  console.log(myNweets)

  return (<>
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="" value={newProfileName} onChange={onChange} />
      <input type="submit" value="update profile" />
    </form>
    <button onClick={onLogOutClick}>Log Out</button>
    <div>
      {myNweets && myNweets.map((doc) => <MyNweets myNweetObj={doc} key={doc.createdAt} />)}
    </div>
  </>)
}


export default Profile