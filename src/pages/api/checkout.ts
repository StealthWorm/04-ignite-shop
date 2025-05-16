import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";
import { IProduct } from "../../contexts/ProductsContext";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { items } = req.body

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!items) {
    return res.status(400).json({ error: 'No items found in bag.' });
  }

  const lineItems: IProduct[] = items.map((item: IProduct) => ({
    price: item.defaultPriceId,
    quantity: item.quantity || 1,
  }));

  console.log(lineItems);

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment', // tipo de compra (payment = pagou uma vez só pelo produto)
    line_items: lineItems
    // line_items: [
    //   {
    //     price: priceId,
    //     quantity: 1,
    //   }
    // ]
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}
