import { Handbag } from "@phosphor-icons/react"
import { Button, HeaderContainer } from "./styles"

import Image from "next/future/image"
import logoImg from "../../assets/logo.svg"

import { useContext } from "react"
import { ProductsContext } from "../../contexts/ProductsContext"
import Link from "next/link"

export default function Header() {
  const { openBagModal, productsList } = useContext(ProductsContext)

  const countItems = productsList.length

  function handleOpenBag() { openBagModal() }

  return (
    <HeaderContainer>
      <Link href='/' prefetch={false}>
        <Image src={logoImg} alt="" />
      </Link>

      <Button color={countItems > 0 ? 'full' : 'empty'} onClick={handleOpenBag}>
        <Handbag size={24} weight="bold" />

        {countItems > 0 &&
          <span>{countItems}</span>
        }
      </Button>
    </HeaderContainer>
  )
}