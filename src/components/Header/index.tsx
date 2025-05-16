import { Handbag, HandbagIcon } from "@phosphor-icons/react"
import { Button, HeaderContainer } from "./styles"

import Image from "next/future/image"
import logoImg from "../../assets/logo.svg"

import { useContext } from "react"
import { ProductsContext } from "../../contexts/ProductsContext"
import Link from "next/link"

export default function Header() {
  const { openBagModal, totalItems } = useContext(ProductsContext)

  function handleOpenBag() { openBagModal() }

  return (
    <HeaderContainer>
      <Link href='/' prefetch={false}>
        <Image src={logoImg} alt="" />
      </Link>

      <Button color={totalItems > 0 ? 'full' : 'empty'} onClick={handleOpenBag}>
        <HandbagIcon size={24} weight="bold" />

        {totalItems > 0 &&
          <span>{totalItems}</span>
        }
      </Button>
    </HeaderContainer>
  )
}