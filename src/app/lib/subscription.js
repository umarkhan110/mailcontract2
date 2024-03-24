// import { subscriptionPlans } from "@/config/subscription";
// import { stripe } from "./stripe";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { auth, db } from "../firebase/config";
// import { onAuthStateChanged } from "firebase/auth";

// export async function getUserSubscriptionPlan() {
// //   let userId;
// //     onAuthStateChanged(auth, (user) => {
// //       console.log(user)
// //       if (user) {
// //         userId = user.uid;
// //       } else {
// //         userId = null;
// //       }
// //     });

// // console.log("userId",userId)
//   const userDocRef = doc(db, "users", "XA579LQ4ZXbBMKswxv2s08X328C2");
//   const userDoc = await getDoc(userDocRef);

//   if (!userDoc.exists()) {
//     const userData = {
//       subscriptionStatus: "",
//       subscriptionStartDate: "",
//       subscriptionEndDate: "",
//       planId: "",
//       planName: "",
//       price: "",
//       extraFeature: "",
//       stripePriceId: "",
//       stripeCurrentPeriodEnd: "",
//       stripeSubscriptionId: "",
//       stripeCustomerId: "",
//     };
//     try {
//       await setDoc(userDocRef, userData);
//     } catch (error) {
//       throw new Error("Error creating user document: " + error.message);
//     }
//   }
//   const newUserSnapshot = await getDoc(userDocRef);
//   const user = newUserSnapshot.data();
//   const isSubscribed =
//     user.stripePriceId &&
//     user.stripeCurrentPeriodEnd &&
//     user.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now();

//   const plan = isSubscribed
//     ? subscriptionPlans.find(
//         (plan) => plan.stripePriceId === user.stripePriceId
//       )
//     : null;

//   let isCanceled = false;
//   if (isSubscribed && user.stripeSubscriptionId) {
//     const stripePlan = await stripe.subscriptions.retrieve(
//       user.stripeSubscriptionId
//     );
//     isCanceled = stripePlan.cancel_at_period_end;
//   }

//   return {
//     ...plan,
//     stripeSubscriptionId: user.stripeSubscriptionId,
//     stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd,
//     stripeCustomerId: user.stripeCustomerId,
//     isSubscribed,
//     isCanceled,
//   };
// }
