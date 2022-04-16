import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService } from "fbase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";


const Home = ({ userObj }) => {
  const [nweetsList, setNweetsList] = useState([])
  // const getNweets = async () => {
  //   const q = query(collection(dbService, "nweets"))
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     const nweetObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     }
  //     setNweetsList((prev) => [nweetObj, ...prev])
  //   })
  // }

  useEffect(() => {
    const q = query(collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    )
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setNweetsList(nweetArr)
    })

  }, [])

  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {
          nweetsList.map((nweet) => (
            <Nweet nweetObj={nweet} key={nweet.id} isOwner={nweet.createdId === userObj.uid} />))
        }
      </div>
    </div>
  )
}

export default Home