import Image from "next/future/image"
import Head from 'next/head'
import { GetStaticProps } from "next"
import Link from "next/link"

import { useKeenSlider } from 'keen-slider/react'

// import { stripe } from "../lib/stripe"
import { HomeContainer, Product, Button } from "../styles/pages/home"

import 'keen-slider/keen-slider.min.css'
import { styled } from "../styles"
// import Stripe from "stripe"

import camiseta1 from '../assets/camisa1.png'
import camiseta2 from '../assets/camisa2.png'
import camiseta3 from '../assets/camisa3.png'
import camiseta4 from '../assets/camisa4.png'

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <Button>
        <span>Enviar</span>
      </Button>

       <HomeContainer ref={sliderRef}  className="keen-slider">
        {/* {products.map(product => {
          return ( */}
            {/* // <Link href={`/product/${product.id}`} key={product.id} prefetch={false}> */}
              <Product  className="keen-slider__slide">
                <Image src={camiseta1} width={520} height={480} alt="" />

                <footer>
                {/* {product.name} */}
                  <strong>produto</strong> 
                  {/* {product.price} */}
                  <span>preço</span>
                </footer>
              </Product>
              <Product  className="keen-slider__slide">
                <Image src={camiseta1} width={520} height={480} alt="" />

                <footer>
                {/* {product.name} */}
                  <strong>produto</strong> 
                  {/* {product.price} */}
                  <span>preço</span>
                </footer>
              </Product>
              <Product  className="keen-slider__slide">
                <Image src={camiseta1} width={520} height={480} alt="" />

                <footer>
                {/* {product.name} */}
                  <strong>produto</strong> 
                  {/* {product.price} */}
                  <span>preço</span>
                </footer>
              </Product>
              <Product  className="keen-slider__slide">
                <Image src={camiseta1} width={520} height={480} alt="" />

                <footer>
                {/* {product.name} */}
                  <strong>produto</strong> 
                  {/* {product.price} */}
                  <span>preço</span>
                </footer>
              </Product>
            {/* // </Link> */}
          {/* )
        })} */}
      </HomeContainer>
    </>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
// const response = await stripe.products.list({
//   expand: ['data.default_price']
// });


// const products = response.data.map(product => {
//   const price = product.default_price as Stripe.Price;

//   return {
//     id: product.id,
//     name: product.name,
//     imageUrl: product.images[0],
//     price: new Intl.NumberFormat('pt-BR', {
//       style: 'currency',
//       currency: 'BRL'
//     }).format(price.unit_amount / 100),
//   }
// })

// return {
//   props: {
//     products
//   },
//   revalidate: 60 * 60 * 2 // 2 hours,
// }
// }
