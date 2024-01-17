import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, ImagesProducts, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  costumerName: string;
  products: {
    id: string,
    name: string,
    imageUrl: string,
  }[];
}

export default function Success({ costumerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        {/* remove indexação de web crawlers */}
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImagesProducts>
          {products.map((product) => {
            return (
              <ImageContainer key={product.id}>
                <Image src={product.imageUrl} width={120} height={110} alt="" />
              </ImageContainer>
            )
          })}
        </ImagesProducts>

        <h1>Compra efetuada</h1>

        {products.length > 1
          ?
          (<p>
            Uhuul <strong>{costumerName}</strong>, sua compra de <strong>{products.length}</strong> camisas já está a caminho da sua casa.
          </p>)
          :
          (<p>
            Uhuul <strong>{costumerName}</strong>, sua compra da <strong>{products[0].name}</strong> já está a caminho da sua casa.
          </p>)
        }

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer >
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      // notFound: true, mostra uma tela 404
      redirect: {
        destination: '/',
        permanent: false, //define se vai redirecionar permanentemente, no caso não vai
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  // console.log(session.line_items.data)
  const costumerName = session.customer_details.name;
  // const product = session.line_items.data[0].price.product as Stripe.Product;

  const products = session.line_items.data.map(item => {
    const product = item.price.product as Stripe.Product;

    return {
      id: item.price.id,
      name: product.name,
      imageUrl: product.images[0],
    }
  })

  return {
    props: {
      costumerName,
      products,
      // product: {
      //   name: product.name,
      //   imageUrl: product.images[0]
      // }
    }
  }
}
