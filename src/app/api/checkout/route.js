import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SERVER_KEY);
export async function POST(req, res) {
  const data = await req.json();
  console.log(data);
  try {
    const stripeRes = await stripe.charges.create({
      source: data.tokenId,
      amount: data.amount * 100,
      currency: "usd",
    });
  
    return NextResponse.json({ success: true, res: stripeRes });
  } catch (error) {
    return NextResponse.json({ success: false, res: error.message });
  }
  
}
