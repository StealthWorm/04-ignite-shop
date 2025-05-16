import { ReactNode, createContext, useEffect, useReducer, useState } from "react";

export interface IProduct {
  id: string
  name: string
  imageUrl: string
  price: string
  quantity?: number
  description?: string
  defaultPriceId?: string
}

interface ProductsContextType {
  productsList: IProduct[],
  isBagOpen: boolean,
  totalAmount: number,
  totalItems: number,
  openBagModal: () => void,
  addItemToCart: (item: IProduct) => void,
  removeItemFromCart: (id: string) => void,
  clearCart: () => void,
  increaseItemQuantity: (id: string) => void,
  decreaseItemQuantity: (id: string) => void,
}

interface ProductsContextProviderProps {
  children: ReactNode
}

export const ProductsContext = createContext({} as ProductsContextType)

export function ProductsContextProvider({ children }: ProductsContextProviderProps) {
  const [productsList, setProductsList] = useState<IProduct[]>([])
  const [isBagOpen, setIsBagOpen] = useState(false);

  function openBagModal() {
    setIsBagOpen(!isBagOpen);
  }

  const totalAmount = productsList.reduce((acc, item) =>
    acc + (parseFloat(item.price) * (item.quantity || 1)), 0);

  const totalItems = productsList.reduce((acc, item) =>
    acc + (item.quantity || 1), 0);

  function addItemToCart(item: IProduct) {
    const productAlreadyInCart = productsList.find(product => product.id === item.id)

    if (productAlreadyInCart) {
      increaseItemQuantity(item.id)
      return
    }

    setProductsList((state) => [
      ...state.filter(prod => item.id !== prod.id), {
        ...item,
        quantity: 1,
        description: item.description
      }])
  }

  function removeItemFromCart(id: string) {
    setProductsList((state) => [...state.filter((item) => item.id !== id)])
  }

  function increaseItemQuantity(id: string) {
    setProductsList((state) =>
      state.map((item) =>
        item.id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  }

  function decreaseItemQuantity(id: string) {
    setProductsList((state) =>
      state.map((item) =>
        item.id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
    );
  }

  function clearCart() {
    setProductsList([])
  }

  return (
    <ProductsContext.Provider
      value={{
        productsList,
        openBagModal,
        isBagOpen,
        addItemToCart,
        totalAmount,
        totalItems,
        removeItemFromCart,
        clearCart,
        increaseItemQuantity,
        decreaseItemQuantity,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

