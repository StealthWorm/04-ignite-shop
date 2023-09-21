import { GetStaticProps } from "next"
import Image from "next/future/image"
import Head from 'next/head'
import Link from "next/link"

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from "../lib/stripe"
import { HomeContainer, Product, Button } from "../styles/pages/home"

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe"

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

      {/* <Button>
        <span>Enviar</span>
      </Button> */}

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            // o Link do Next permite redirecionar sem recarregar toda a pagina, preferivel ao infes de usar ancora direto
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} blurDataURL={product.imageUrl} width={520} height={480} alt="" placeholder="blur" />

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price}</span>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

/* 
  next fonciona com um servidor NODE entre o front e o back, que "guarda" informações para serem exibidas sem que
  seja preciso realizar outra requisição ao servidor. Para acessar esses dados do servidor, usamos as props
  GetStaticProps e GetServerSideProps

  GetStaticProps, diferente do GetServerSideProps não executa toda vez que a tela/requisição for chamada, 
  mas sim no momento em que o Next estiver criando uma versão estatica(em cache) da página (ao rodar build, por exemplo)
  */
export const getStaticProps: GetStaticProps = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100),
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours,
  }
}
