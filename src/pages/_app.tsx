import { AppProps } from "next/app"
import { globalStyles } from "../styles/global"

import { Container } from "../styles/pages/app"
import { ProductsContext, ProductsContextProvider } from "../contexts/ProductsContext"
import Header from "../components/Header"
import { useContext } from "react"
import Bag from "../components/Bag"

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductsContextProvider>
      <Container>
        <Header />

        <Component {...pageProps} />

        <Bag />
      </Container>
    </ProductsContextProvider>
  )
}
