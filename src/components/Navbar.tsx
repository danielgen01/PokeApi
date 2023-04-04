import React, { useRef, RefObject, useEffect } from "react"
import logo from "../assets/poke_logo.png"
import { AiOutlineSearch } from "react-icons/ai"

type props = {
  pokeList: any[]
  setPokeList: any
  originalPokeList: any[]
}

const Navbar: React.FC<props> = ({
  pokeList,
  setPokeList,
  originalPokeList,
}) => {
  let inputRef: RefObject<HTMLInputElement> = useRef(null)

  function filterList() {
    let searchText = inputRef.current?.value?.toLowerCase()

    const filteredList = pokeList.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchText)
    )

    setPokeList(filteredList)
  }
  function resetFilter() {
    setPokeList(originalPokeList)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className="Nav-bar grid grid-cols-4 lg:grid-cols-10 gap-20 w-screen items-center">
      <div className="logo-ctn col-span-1">
        <a href="index.html">
          <img src={logo} className="" />
        </a>
      </div>
      <div className="search-field  h-12   mt-5  text-center flex  items-center col-span-2 justify-start lg:justify-center lg:col-span-9">
        <div className="search-div h-full bg-white flex items-center rounded px-2 justify-between">
          <input
            type="text"
            className=" outline-none text-center"
            placeholder="Search Pokemon"
            id="pokemonName"
            ref={inputRef}
            onChange={filterList}
          />
          <AiOutlineSearch className="text-3xl" />
        </div>
        <button
          className="text-sky-500 underline ml-5 font-bold text-sm lg:text-xl"
          onClick={resetFilter}
        >
          Reset Filter
        </button>
      </div>
    </div>
  )
}

export default Navbar
