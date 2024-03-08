"use client";
import { useState } from "react";
import { translate } from "./service/translate";
export default function Home() {
  const [input, setInput] = useState("");
  const [transltedText, setTransltedText] = useState("");
  const [loader, setLoader] = useState(false);

  const translateText = async () => {
    setLoader(true);
    const response = await translate(input);
    // console.log(response.translateText)
    // console.log(response.translatedText.content[0].text)
    setTransltedText(response?.translatedText?.content[0]?.text);
    setLoader(false);
  };
  return (
    <div style={{margin:"10px"}}>
      <h4>Translate Classical Armenian language to Modren Armenian language</h4>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "50px 20px",
        }}
      >
        <div style={{marginRight:"50px"}}>
        <h6>Enter Classical Armenian language</h6>
        <br />
          <textarea
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Classical Armenian language"
            style={{  height: "300px", marginBottom: "10px", padding:"20px" }}
          />
          <br />
          <button onClick={translateText} style={{ padding:"10px 15px", borderRadius:"8px"}}>Translate</button>
          <br />
          <br />
        </div>
        <div style={{height:"300px", width:"500px", marginLeft:"50px"}}>
          <h6>Modren Armenian language</h6>
          <br />
          <div style={{height:"100%", border:"1px solid black", padding:"20px"}}>
          {loader ? <p>Loading...</p> : transltedText }
          </div>
        </div>
      </div>
    </div>
  );
}
