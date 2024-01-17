import { GetStaticProps } from "next"
import Image from "next/future/image"
import Head from 'next/head'
import Link from "next/link"

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { stripe } from "../lib/stripe"
import { HomeContainer, Product } from "../styles/pages/home"

import Stripe from "stripe"
import { Handbag } from "@phosphor-icons/react"
import { useContext } from "react"
import { IProduct, ProductsContext } from "../contexts/ProductsContext"

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const { addItemToCart, productsList } = useContext(ProductsContext)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  function handleAddItemToCart(product: IProduct) {
    addItemToCart(product)
  }

  function productAlreadyInCart(productId: string) {
    if (productsList.find(product => product.id === productId)) { return true }
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            // o Link do Next permite redirecionar sem recarregar toda a pagina, preferivel ao inves de usar ancora direto
            /* em build, o "prefetch" faz as requisições a partir do momento que identifica um Link em tela (ou hover), mesmo que estes não tenham sido
               definidos no static paths. Isso pode causar lentidão caso a tela possua muitos links, por isso deve ser observado caso a caso
               para deixa-lo como FALSE
            */
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image priority src={product.imageUrl} blurDataURL={product.imageUrl} width={520} height={480} alt="" placeholder="blur" />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(Number(product.price) / 100)
                    }</span>
                  </div>
                  <button onClick={() => handleAddItemToCart(product)} disabled={productAlreadyInCart(product.id)}>
                    <Handbag size={32} weight="bold" />
                  </button>
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
  next funciona com um servidor NODE entre o front e o back, que "guarda" informações para serem exibidas sem que
  seja preciso realizar outra requisição ao servidor. Para acessar esses dados do servidor, usamos as props
  GetStaticProps e GetServerSideProps

  GetStaticProps, diferente do GetServerSideProps não executa toda vez que a tela/requisição for chamada, 
  mas sim no momento em que o Next estiver criando uma versão estatica(em cache) da página (ao rodar build, por exemplo)
  */
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'] // estou usando "data".default_price pois é uma lista
  });

  const products: IProduct[] = response.data.map(product => {
    const price = product.default_price as Stripe.Price;

    const mappedProduct: IProduct = {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: String(price.unit_amount),
      defaultPriceId: price.id,
    }

    return mappedProduct;
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours,
  }
}
