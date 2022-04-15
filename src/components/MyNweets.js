import React from "react";


const MyNweets = ({ myNweetObj }) => {
  console.log("my", myNweetObj)
  return <div>
    {myNweetObj.text}
  </div>
}


export default MyNweets