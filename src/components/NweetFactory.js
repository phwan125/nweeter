import React, { useState } from "react";
import Nweet from "components/Nweet";
import { dbService, storageService } from "fbase";
import { addDoc, collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 } from "uuid";




const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("")
  const [attatchment, setAttatchment] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault()
    let attatchmentUrl = ""
    if (attatchment !== "") {
      const attatchmentRef = ref(storageService, `${userObj.uid}/${v4()}`)
      const response = await uploadString(attatchmentRef, attatchment, "data_url")
      console.log(response.ref)
      attatchmentUrl = await getDownloadURL(response.ref)
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      createdId: userObj.uid,
      attatchmentUrl
    }
    try {
      const docRef = await addDoc(collection(dbService, "nweets"), nweetObj)
      console.log("Document written with ID: ", docRef.id);
      setNweet("")
      setAttatchment("")
    } catch (error) {
      console.error("error is : ", error)
    }
  }

  const onChange = (event) => {
    const { target: { value } } = event
    setNweet(value)
  }

  const fileOnChange = (e) => {
    const previewFile = e.target.files[0];
    const reader = new FileReader()
    reader.readAsDataURL(previewFile)
    reader.onloadend = (finishedEvent) => {
      const { target: { result } } = finishedEvent
      setAttatchment(result)
    }
  };
  const onClearClick = () => {
    setAttatchment(null)
  }


  return (<form onSubmit={onSubmit}>
    <input type="text" placeholder="댓글~~" maxLength={120} value={nweet} onChange={onChange}></input>
    <input type="file" accept="image/*" onInput={fileOnChange} />
    <input type="submit" value="Nweet"></input>
    {attatchment &&
      <div>
        <img src={attatchment} width="50px" height="50px" />
        <button onClick={onClearClick}>Clear</button>
      </div>
    }

  </form>)
}

export default NweetFactory