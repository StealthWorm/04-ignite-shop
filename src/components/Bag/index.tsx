import axios from "axios"
import { MinusIcon, PlusIcon, XIcon } from "@phosphor-icons/react"

import { BagContainer, BagEmptyInfo, ButtonClose, ButtonContainer, List, ListItem, QuantityControl } from "./bag"
import Image from "next/image"

import { useContext, useState } from "react"
import { ProductsContext } from "../../contexts/ProductsContext"
import { formatCurrency } from "../../../utils/formatCurrency"

export default function Bag() {
  const {
    isBagOpen,
    openBagModal,
    productsList,
    totalAmount,
    removeItemFromCart,
    clearCart,
    increaseItemQuantity,
    decreaseItemQuantity
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
          <XIcon size={24} weight="bold" />
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
                          {formatCurrency(Number(product.price) / 100)}
                        </strong>
                      </div>
                      <ButtonContainer>
                        <QuantityControl>
                          <button onClick={() => decreaseItemQuantity(product.id)}>
                            <MinusIcon size={16} weight="bold" />
                          </button>
                          <span>{product.quantity || 1}</span>
                          <button onClick={() => increaseItemQuantity(product.id)}>
                            <PlusIcon size={16} weight="bold" />
                          </button>
                        </QuantityControl>
                        <button onClick={() => handleRemoveItemFromCart(product.id)}>Remover</button>
                      </ButtonContainer>
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
          <span>{productsList.reduce((acc, item) => acc + (item.quantity || 1), 0)} itens</span>
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