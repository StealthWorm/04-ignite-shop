import { GetStaticProps } from "next"
import Image from "next/future/image"
import Head from 'next/head'
import Link from "next/link"

import { useKeenSlider } from 'keen-slider/react'

import { stripe } from "../lib/stripe"
import { HomeContainer, Product, BagContainer, ButtonClose, List, ListItem } from "../styles/pages/home"

import 'keen-slider/keen-slider.min.css'
import Stripe from "stripe"
import { Handbag, X } from "@phosphor-icons/react"
import { useContext, useState } from "react"
import { ProductsContext } from "../contexts/ProductsContext"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
    quantity: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const { isBagOpen, openBagModal } = useContext(ProductsContext)

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });

  function handleOpenBag() { openBagModal() }

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
                <Image src={product.imageUrl} blurDataURL={product.imageUrl} width={520} height={480} alt="" placeholder="blur" />

                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  <button>
                    <Handbag size={32} weight="bold" />
                  </button>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>

      <BagContainer visible={isBagOpen}>
        <header>
          <ButtonClose onClick={handleOpenBag}>
            <X size={24} weight="bold" />
          </ButtonClose>
        </header>

        <main>
          <h3>Sacola de compras</h3>
          <List>
            <ListItem>
              <img src='https://github.com/StealthWorm.png' alt="" width={94} height={94} />
              {/* <Image src='https://github.com/StealthWorm.png' blurDataURL='https://github.com/StealthWorm.png' width={94} height={94} alt="" placeholder="blur" /> */}
              <main>
                <div>
                  <p>Camiseta Beyond the Limits</p>
                  <strong>R$ 79,90</strong>
                </div>
                <button>Remover</button>
              </main>
            </ListItem>
            <ListItem>
              <img src='https://github.com/StealthWorm.png' alt="" width={94} height={94} />
              {/* <Image src='https://github.com/StealthWorm.png' blurDataURL='https://github.com/StealthWorm.png' width={94} height={94} alt="" placeholder="blur" /> */}
              <main>
                <div>
                  <p>Camiseta Beyond the Limits</p>
                  <strong>R$ 79,90</strong>
                </div>
                <button>Remover</button>
              </main>
            </ListItem>
            <ListItem>
              <img src='https://github.com/StealthWorm.png' alt="" width={94} height={94} />
              {/* <Image src='https://github.com/StealthWorm.png' blurDataURL='https://github.com/StealthWorm.png' width={94} height={94} alt="" placeholder="blur" /> */}
              <main>
                <div>
                  <p>Camiseta Beyond the Limits</p>
                  <strong>R$ 79,90</strong>
                </div>
                <button>Remover</button>
              </main>
            </ListItem>
          </List>
        </main>

        <footer>
          <div>
            <span>Quantidade</span>
            <span>2 itens</span>
          </div>
          <div>
            <strong>Valor total</strong>
            <strong>R$ 270,00</strong>
          </div>
          <button>Finalizar compra</button>
        </footer>
      </BagContainer>
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
  // await new Promise((resolve) => setTimeout(resolve, 2000))

  const response = await stripe.products.list({
    expand: ['data.default_price'] // estou usando "data".default_price pois é uma lista
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
