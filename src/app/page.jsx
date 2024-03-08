"use client";
import { useState } from "react";
import { translate } from "./service/translate";
export default function Home() {
  const [input, setInput] = useState("")
  const [transltedText, setTransltedText] = useState("")

const translateText = async () =>{
  const response = await translate(input);
  // console.log(response.translateText)
  // console.log(response.translatedText.content[0].text)
  setTransltedText(response?.translatedText?.content[0]?.text)
}
  return (
    <>
<h4>Translate Classical Armenian language to Modren Armenian language</h4>
    <div style={{width:"900px", display:"flex", justifyContent:"space-between", margin:"20px"}}>
      <div>
    <input type="textarea" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Classical Armenian language"  style={{width:"400px", height:"400px", marginBottom:"10px"}}/><br />
    <button onClick={translateText}>Translate</button><br /><br />
      </div>
    <div>
      Modren Armenian language<br />
      {transltedText}</div>
      </div>
    </>
  );
}
