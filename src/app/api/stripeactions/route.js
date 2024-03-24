import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SERVER_KEY);

import { absoluteUrl } from "@/app/lib/utils";
export async function POST(req) {
  const data = await req.json();
  const billingUrl = absoluteUrl("/subscription-plans");
  try {

    if (data.isSubscribed && data.stripeCustomerId && data.isCurrentPlan) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: data.stripeCustomerId,
        return_url: billingUrl,
      });
  
      return { url: stripeSession.url };
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: data.email,
      line_items: [
        {
          price: data.stripePriceId,
          quantity: 1,
        },
      ],
      metadata: {
        userId: data.userId,
      },
    });

    return NextResponse.json({
      success: true,
      res: {
        url: stripeSession.url
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ success: false, message: err.message });
  }
}
