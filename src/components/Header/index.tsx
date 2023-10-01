import { Handbag } from "@phosphor-icons/react"
import { Button, HeaderContainer } from "./styles"

import Image from "next/future/image"
import logoImg from "../../assets/logo.svg"

import { useContext } from "react"
import { ProductsContext } from "../../contexts/ProductsContext"

export default function Header() {
  const { openBagModal } = useContext(ProductsContext)

  const qtd = 1

  function handleOpenBag() { openBagModal() }

  return (
    <HeaderContainer>
      <Image src={logoImg} alt="" />

      <Button color={qtd > 0 ? 'full' : 'empty'} onClick={handleOpenBag}>
        <Handbag size={24} weight="bold" />
        <span>1</span>
      </Button>
    </HeaderContainer>
  )
}