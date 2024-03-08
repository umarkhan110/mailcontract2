import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(req) {
  const data = await req.json();
  const anthropic = new Anthropic({
    apiKey: process.env.NEXT_PUBLIC_CLAUDE,
  });
  try {
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
              "text": data
            }
          ]
        }
      ]
    });

    return NextResponse.json({ success: true, translatedText: msg });
;
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}