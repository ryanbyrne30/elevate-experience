import { env } from "@/env/server.mjs";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export async function createStripeSession(
  productName: string,
  unitPrice: number,
  quantity: number,
  redirectUrl: string
) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: productName,
          },
          unit_amount: unitPrice * 100,
        },
        quantity,
      },
    ],
    mode: "payment",
    success_url: `${redirectUrl}?status=success`,
    cancel_url: `${redirectUrl}?status=cancel`,
  });
}
