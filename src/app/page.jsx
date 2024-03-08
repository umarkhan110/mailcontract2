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
    setTransltedText(response?.translatedText?.content[0]?.text);
    setLoader(false);
  };
  return (
    <div style={{ margin: "10px" }}>
      <h4 className="text-center">
        Translate Classical Armenian language to Modern Armenian language
      </h4>

      <div className="row justify-content-center mt-5" style={{ marginLeft: '100px', marginRight: '100px' }}>
        <div className="col-md-6 mb-4">
          <h6>Enter Classical Armenian language</h6>
          <textarea
            className="form-control mb-3"
            rows="5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Classical Armenian language"
          ></textarea>
          <button className="btn btn-primary" onClick={translateText}>
            Translate
          </button>
        </div>

        <div className="col-md-6">
          <h6>Modern Armenian language</h6>
          <div className="border p-3" style={{ minHeight: "200px" }}>
            {loader ? <p>Loading...</p> : transltedText}
          </div>
        </div>
      </div>
    </div>
  );
}
