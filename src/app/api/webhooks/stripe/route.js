import { db } from "@/app/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { headers } from "next/headers";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SERVER_KEY);
export async function POST(request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || "",
    );
    console.log("event", event)
  } catch (err) {
    return new Response(
      `Webhook Error: ${err ? err.message : "Unknown Error"}`,
      { status: 400 },
    );
  }

  const session = event.data.object;

  if (!session?.metadata?.userId) {
    return new Response(null, {
      status: 200,
    });
  }
  const userDocRef = doc(db, "users", session?.metadata?.userId);
  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription,
    );
    await updateDoc(userDocRef, {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      });
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription,
    );

    await updateDoc(userDocRef, {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      });
    // Update the price id and set the new period end.
  }

  return new Response(null, { status: 200 });
}