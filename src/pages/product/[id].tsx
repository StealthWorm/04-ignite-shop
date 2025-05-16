import { GetStaticPaths, GetStaticProps } from "next"
import Image from "next/future/image";
import Head from "next/head";
import { useContext } from "react";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { ImageContainer, ProductContainer, ProductDetails, FooterContainer } from "../../styles/pages/product"
import { useRouter } from "next/router";
import { IProduct, ProductsContext } from "../../contexts/ProductsContext";
import { formatCurrency } from "../../../utils/formatCurrency";

interface ProductProps {
  product: IProduct
}

export default function Product({ product }: ProductProps) {
  const { query } = useRouter()
  // é possivel acessar a prop "isFallback" do useRouter
  // Quando o fallback do static paths esta como "true", ele define o "loading" até o conteudo ser carregado
  // if (isFallback) {
  //   return <p>Loading...</p>
  // }
  const { addItemToCart, productsList } = useContext(ProductsContext)
  // const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  // async function handleBuyButton() {
  //   try {
  //     setIsCreatingCheckoutSession(true);

  //     const response = await axios.post('/api/checkout', {
  //       priceId: product.defaultPriceId,
  //     })

  //     const { checkoutUrl } = response.data;

  //     // se fosse redirencionar para uma pg. externa usariamos o router.push('/rota') vindo do useRouter()
  //     window.location.href = checkoutUrl;
  //   } catch (err) {
  //     setIsCreatingCheckoutSession(false);

  //     alert('Falha ao redirecionar ao checkout!')
  //   }

  //   console.log(product.defaultPriceId)
  // }

  function handleAddItemToCart(product: IProduct) {
    addItemToCart(product)
  }

  const productAlreadyInCartCount = productsList.find(item => item.id === product.id)?.quantity || 0

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      {/* Product: {JSON.stringify(query)} */}
      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" priority />
        </ImageContainer>

        <ProductDetails>
          <h1>{product.name}</h1>
          <span>{formatCurrency(Number(product.price) / 100)}</span>

          <p>{product.description}</p>

          <FooterContainer>
            <button onClick={() => handleAddItemToCart(product)} className="flex items-center gap-2">
              Colocar na sacola
            </button>
            {productAlreadyInCartCount > 0 &&
              <span className="text-zinc-400 text-sm">x {productAlreadyInCartCount}</span>
            }
          </FooterContainer>
        </ProductDetails>
      </ProductContainer>
    </>
  )
}

// metodo que devolve parametros passados pelo formato do arquivo "[id]"
export const getStaticPaths: GetStaticPaths = async () => {
  // Alternativa 1 - BUSCAR SOMENTE PRODUTOS MAIS VENDIDOS / MAIS ACESSADOS

  return {
    paths: [
      { params: { id: 'prod_OfCZLdThFPufxy' } }, // voce só preenche essa lista com os dados essenciais para serem buscados, evitando telas em branco, sendo possivel deixar vazio
    ],
    fallback: 'blocking', // não mostra nada em tela até ter algo para mostrar
  }
}

// o  primeiro parametro "any" é o tipo do retorno do "props"
// o segundo é o formato do objeto do "params"
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount,
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1 hours
  }
}
