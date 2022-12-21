import { env } from "@/env/server.mjs";

const stripeApi = "https://api.stripe.com/v1";
const headers = {
  Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
};

export async function fetchStripeProduct(productId: string) {
  const productResponse = await fetch(`${stripeApi}/products/${productId}`, {
    headers,
  });
  return await productResponse.json();
}

export async function fetchStripeProductDefaultPriceId(productId: string) {
  const product = await fetchStripeProduct(productId);
  return product["default_price"];
}

export async function fetchStripeProductPrice(productId: string) {
  const priceId: string = await fetchStripeProductDefaultPriceId(productId);
  const priceResponse = await fetch(`${stripeApi}/prices/${priceId}`, {
    headers,
  });
  const priceData = await priceResponse.json();
  const price: number = priceData["unit_amount"];
  return price / 100;
}
