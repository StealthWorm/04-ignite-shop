import { ReactNode, createContext, useEffect, useReducer, useState } from "react";

export interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
  quantity: number
}

interface ProductsContextType {
  productsList: Product[],
  isBagOpen: boolean,
  totalAmount: number,
  openBagModal: () => void,
  addItemToCart: (item: Product) => void,
  removeItemFromCart: (id: string) => void,
}

interface ProductsContextProviderProps {
  children: ReactNode
}

export const ProductsContext = createContext({} as ProductsContextType)

export function ProductsContextProvider({ children }: ProductsContextProviderProps) {
  const [productsList, setProductsList] = useState<Product[]>([])
  const [isBagOpen, setIsBagOpen] = useState(false);

  function openBagModal() {
    setIsBagOpen(!isBagOpen);
  }

  const totalAmount = productsList.reduce((acc, item) => acc + parseFloat(item.price), 0);

  function addItemToCart(item: Product) {
    setProductsList((state) => [
      ...state.filter(({ id }) => item.id !== id), {
        ...item, quantity: 1
      }])
  }

  function removeItemFromCart(id: string) {
    setProductsList((state) => [...state.filter((item) => item.id !== id)])
  }

  return (
    <ProductsContext.Provider
      value={{
        productsList,
        openBagModal,
        isBagOpen,
        addItemToCart,
        totalAmount,
        removeItemFromCart
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

