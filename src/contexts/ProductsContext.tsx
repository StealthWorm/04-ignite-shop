import { ReactNode, createContext, useEffect, useReducer, useState } from "react";

export interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
  quantity: number
}

interface ProductsContextType {
  products: Product[],
  openBagModal: () => void
  isBagOpen: boolean
}

interface ProductsContextProviderProps {
  children: ReactNode
}

export const ProductsContext = createContext({} as ProductsContextType)

export function ProductsContextProvider({ children }: ProductsContextProviderProps) {
  const [products, setProducts] = useState([])
  const [isBagOpen, setIsBagOpen] = useState(false);

  function openBagModal() {
    setIsBagOpen(!isBagOpen);
  }

  return (
    <ProductsContext.Provider
      value={{ products, openBagModal, isBagOpen }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

