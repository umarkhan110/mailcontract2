"use client";
import Anthropic from "@anthropic-ai/sdk";
export default function Home() {
  const anthropic = new Anthropic({
    apiKey: process.env.NEXT_PUBLIC_CLAUDE,
  });

  const main = async () => {
    async function main() {
      const message = await anthropic.messages.create({
        max_tokens: 1024,
        messages: [{ role: 'user', content: 'Hello, Claude' }],
        model: 'claude-3-opus-20240229',
      });
    
      console.log(message.content);
    }
    
    main();
  };
  return (
    <>
    <button onClick={main}>ABC</button>
    </>
  );
}
