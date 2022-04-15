import React, { useState } from "react"
import { dbService, storageService } from "fbase"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage";

const Nweet = ({ nweetObj, isOwner }) => {

  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);

  const deleteNweet = () => {
    deleteDoc(NweetTextRef)
  }

  const onDeleteClick = async () => {
    const ok = window.confirm("Really Delete?")
    if (ok) {
      await deleteNweet()
      const urlRef = ref(storageService, nweetObj.attatchmentUrl)
      await deleteObject(urlRef)
    }
  }

  const [isEditing, setIsEditing] = useState(false)
  const [newNweet, setNewNweet] = useState(nweetObj.text)
  const editingToggle = () => setIsEditing((prev) => !prev)
  const updateNweet = async () => {
    await updateDoc(NweetTextRef, { text: newNweet })
  }
  const onChange = (event) => {
    const { target: { value } } = event
    setNewNweet(value)
  }
  const onSubmit = (event) => {
    event.preventDefault()
    updateNweet()
    editingToggle()
  }


  return (
    <div>
      {
        isEditing ?
          <>
            {isOwner &&
              (
                <>
                  <form onSubmit={onSubmit}>
                    <input type="text" required placeholder="editing!" value={newNweet} onChange={onChange}></input>
                    <input type="submit" value="Edit Complete"></input>
                  </form>
                  <button onClick={editingToggle}>Cancle</button>
                </>)

            }
          </>
          : <>
            <div key={nweetObj.id}>
              {nweetObj.attatchmentUrl &&
                <img src={nweetObj.attatchmentUrl} width="50px" height="50px" />
              }
              <h4>{nweetObj.text}</h4>
              {isOwner &&
                <>
                  <button onClick={onDeleteClick}>Delete Nweet</button>
                  <button onClick={editingToggle}>Edit Nweet</button>
                </>
              }
            </div>
          </>
      }
    </div>
  )
}

export default Nweet