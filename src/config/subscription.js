export const subscriptionPlans = [
  {
    id: 1,
    name: "Free Trial",
    detail: "Just for testing purpose",
    price: 0,
    hits: 3,
    extraFeature: [
      "During the trial period, you have three attempts to use the app. After reaching the limit, a subscription is required to continue accessing our services",
    ],
  },
  {
    id: 2,
    name: "Basic Plan",
    detail: "Access essential features to get started.",
    price: 10,
    hits: "Unlimited",
    extraFeature: [
      "Translate Classical Armenian Text",
      "Translate Classical Armenian Image",
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRODUCT,
  },
  {
    id: 3,
    name: "Premium Plan",
    detail:
      "Gain access to all features, including advanced tools and resources.",
    price: 20,
    hits: "Unlimited",
    extraFeature: [
      "Translate Classical Armenian Text",
      "Translate Classical Armenian Image",
      "Translate Modren Armenian Text",
      "Translate into English",
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRODUCT,
  },
  {
    id: 4,
    name: "Test",
    detail: "Access essential features to get started.",
    price: 1,
    hits: "Unlimited",
    extraFeature: [
      "Translate Classical Armenian Text",
      "Translate Classical Armenian Image",
    ],
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_TEST_PRODUCT,
  },
];
