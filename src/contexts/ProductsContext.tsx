import { ReactNode, createContext, useEffect, useReducer, useState } from "react";

export interface IProduct {
  id: string
  name: string
  imageUrl: string
  price: string
  quantity?: number
  description?: string
  defaultPriceId: string
}

interface ProductsContextType {
  productsList: IProduct[],
  isBagOpen: boolean,
  totalAmount: number,
  openBagModal: () => void,
  addItemToCart: (item: IProduct) => void,
  removeItemFromCart: (id: string) => void,
  clearCart: () => void,
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

  const totalAmount = productsList.reduce((acc, item) => acc + parseFloat(item.price), 0);

  function addItemToCart(item: IProduct) {
    setProductsList((state) => [
      ...state.filter(({ id }) => item.id !== id), {
        ...item, quantity: 1
      }])
  }

  function removeItemFromCart(id: string) {
    setProductsList((state) => [...state.filter((item) => item.id !== id)])
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
        removeItemFromCart,
        clearCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

