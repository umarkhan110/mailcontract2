"use client";
import Anthropic from "@anthropic-ai/sdk";
export default function Home() {
  const anthropic = new Anthropic({
    apiKey: process.env.NEXT_PUBLIC_CLAUDE,
  });

  const main = async () => {
    const msg = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0,
      system: "Translate classical Armenian language to modern Armenian language",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "Ինձ մի բաժակ ջուր տուր"
            }
          ]
        }
      ]
    });
    console.log(msg);
  };
  return (
    <>
    <button onClick={main}>ABC</button>
    </>
  );
}
