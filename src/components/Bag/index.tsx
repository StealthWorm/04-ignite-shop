import axios from "axios"
import { X } from "@phosphor-icons/react"

import { BagContainer, BagEmptyInfo, ButtonClose, List, ListItem } from "./styles"
import Image from "next/image"

import { useContext, useState } from "react"
import { ProductsContext } from "../../contexts/ProductsContext"

export default function Bag() {
  const {
    isBagOpen,
    openBagModal,
    productsList,
    totalAmount,
    removeItemFromCart,
    clearCart
  } = useContext(ProductsContext)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

  function handleOpenBag() {
    openBagModal()
  }

  async function handleBuyButton() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        items: productsList,
      })

      const { checkoutUrl } = response.data;

      // se fosse redirencionar para uma pg. externa usariamos o router.push('/rota') vindo do useRouter()
      window.location.href = checkoutUrl;

      clearCart();
    } catch (err) {
      setIsCreatingCheckoutSession(false);

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  function handleRemoveItemFromCart(productId: string) {
    removeItemFromCart(productId)
  }

  const itemsInBag = productsList.length > 0

  return (
    <BagContainer visible={isBagOpen}>
      <header>
        <ButtonClose onClick={handleOpenBag}>
          <X size={24} weight="bold" />
        </ButtonClose>
      </header>

      <main>
        <h3>Sacola de compras</h3>
        <List>
          {productsList.length > 0
            ? (
              productsList.map(product => {
                return (
                  <ListItem key={product.id}>
                    <Image
                      src={product.imageUrl}
                      blurDataURL={product.imageUrl}
                      width={94}
                      height={94}
                      alt={product.name}
                      placeholder="blur"
                    />
                    <main>
                      <div>
                        <p>{product.name}</p>
                        <strong>
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(Number(product.price) / 100)
                          }
                        </strong>
                      </div>
                      <button onClick={() => handleRemoveItemFromCart(product.id)}>Remover</button>
                    </main>
                  </ListItem>
                )
              })

            )
            : (
              <BagEmptyInfo>Nada para mostrar ainda  {';('}</BagEmptyInfo>
            )
          }

        </List>
      </main>

      <footer>
        <div>
          <span>Quantidade</span>
          <span>{productsList.length} itens</span>
        </div>
        <div>
          <strong>Valor total</strong>
          <strong>{new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(Number(totalAmount) / 100)
          }</strong>
        </div>
        <button onClick={handleBuyButton} disabled={!itemsInBag || isCreatingCheckoutSession}>Finalizar compra</button>
      </footer>
    </BagContainer>
  )
}