import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";

export async function POST(req) {
  const data = await req.json();
  const anthropic = new Anthropic({
    apiKey: process.env.NEXT_PUBLIC_CLAUDE,
  });

  try {
    let content;
    if (data.text === "") {
      content = {
        type: "image",
        source: {
          type: "base64",
          media_type: "image/jpeg",
          data: data?.image,
        },
      };
    } else if (data.text !== "") {
      content = {
        type: "text",
        text: data?.text,
      };
    }
    // const msg = await anthropic.messages.create({
    //   model: "claude-3-opus-20240229",
    //   max_tokens: 1000,
    //   temperature: 0,
    //   system: "Translate classical Armenian language to modern Armenian language\nUser will write classical Armenian language and we will give him translated text(modern Armenian language) in response.\nor\nuser can upload a Armenian classical language pdf or image to modern Armenian language text.",
    //   messages: [
    //     {
    //       "role": "user",
    //       "content": [
    //         content
    //       ]
    //     }
    //   ]
    // });
    const userDocRef = doc(db, "users", data.userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const subscriptionEndDate = new Date(userDoc.data().subscriptionEndDate);
      if (subscriptionEndDate > new Date()) {
        if (userDoc.data().planId === 1) {
          const currentFreeHits = userDoc.data().freehits || 0;
          if (currentFreeHits > 0) {
            await updateDoc(userDocRef, {
              freehits: currentFreeHits - 1,
            });

            // const msg = await anthropic.messages.create({
            //   model: "claude-3-opus-20240229",
            //   max_tokens: 1000,
            //   temperature: 0,
            //   system: "Translate classical Armenian language to modern Armenian language\nUser will write classical Armenian language and we will give him translated text(modern Armenian language) in response.\nor\nuser can upload a Armenian classical language pdf or image to modern Armenian language text.",
            //   messages: [
            //     {
            //       "role": "user",
            //       "content": [
            //         content
            //       ]
            //     }
            //   ]
            // });
            return NextResponse.json({ success: true, translatedText: "msg" });
          } else {
            return NextResponse.json({
              success: false,
              message: "No free hits remaining",
            });
          }
        } else {
          const msg = await anthropic.messages.create({
            model: "claude-3-opus-20240229",
            max_tokens: 1000,
            temperature: 0,
            system: "Translate classical Armenian language to modern Armenian language\nUser will write classical Armenian language and we will give him translated text(modern Armenian language) in response.\nor\nuser can upload a Armenian classical language pdf or image to modern Armenian language text.",
            messages: [
              {
                "role": "user",
                "content": [
                  content
                ]
              }
            ]
          });
          return NextResponse.json({ success: true, translatedText: msg });
        }
      } else {
        return NextResponse.json({
          success: false,
          message: "Your plan is expiried",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Please Login First",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
