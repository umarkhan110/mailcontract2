"use client";
import Anthropic from "@anthropic-ai/sdk";
import { useState } from "react";
export default function Home() {
  const [input, setInput] = useState("")
  const [transltedText, setTransltedText] = useState("")

  const anthropic = new Anthropic({
    apiKey: process.env.NEXT_PUBLIC_CLAUDE,
  });
const translate = async () =>{
  const msg = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 1000,
    temperature: 0,
    system: "Translate classical Armenian language to modern Armenian language\nUser will write classical Armenian language and we will give him translated text(modern Armenian language) in response",
    messages: [
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": "Իգական"
          }
        ]
      }
    ]
  });
  setTransltedText(msg.content)
}
  return (
    <>
    <input type="textarea" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Classical Armenian language"/><br />
    <button onClick={translate}>Translate</button><br /><br />
    <div>
      Modren Armenian language
      {transltedText}</div>
    </>
  );
}




// import Anthropic from "@anthropic-ai/sdk";
// // const client = new Anthropic();
// const client = new Anthropic({
//     apiKey: "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",
//   });

// const msg = await client.messages.create({
//   model: "claude-3-opus-20240229",
//   max_tokens: 1000,
//   temperature: 0,
//   system: "Translate classical Armenian language to modern Armenian language\nUser will write classical Armenian language and we will give him translated text(modern Armenian language) in response",
//   messages: [
//     {
//       "role": "user",
//       "content": [
//         {
//           "type": "text",
//           "text": "Իգական"
//         }
//       ]
//     }
//   ]
// });
// console.log(msg , "djkasjdkasdljasldka");