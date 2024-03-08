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
          // maxWidth: "1400px",
          // display: "flex",
          // justifyContent: "space-between",
          margin: "20px",
        }}
      >
        <div>
          <textarea
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Classical Armenian language"
            style={{ width: "100%", height: "300px", marginBottom: "10px", padding:"20px" }}
          />
          <br />
          <button onClick={translateText} style={{ padding:"10px 15px", borderRadius:"8px"}}>Translate</button>
          <br />
          <br />
        </div>
        <div>
          <h6>Modren Armenian language</h6>
          <br />
          <div style={{maxWidth:"100%", height:"400px", border:"1px solid black"}}>
          {loader ? <p>Loading...</p> : transltedText }
          </div>
        </div>
      </div>
    </div>
  );
}
