import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { IoMdSearch } from "react-icons/io";

export function SearchInput() {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <IoMdSearch />
      </InputLeftElement>
      <Input type="tel" placeholder="Buscar" />
    </InputGroup>
  )
}
