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
    <div className="Nav-bar grid grid-cols-3 items-center gap-20 w-screen">
      <a href="index.html">
        <img src={logo} className="w-40" />
      </a>
      <div className="search-field w-full h-12   mt-5  text-center flex justify-center items-center">
        <div className="search-div h-full bg-white flex items-center rounded w-52 justify-between">
          <input
            type="text"
            className=" outline-none"
            placeholder="Search Pokemon"
            id="pokemonName"
            ref={inputRef}
            onChange={filterList}
          />
          <AiOutlineSearch className="text-3xl" />
        </div>
        <button
          className="text-sky-500 underline ml-5 font-bold"
          onClick={resetFilter}
        >
          Reset Filter
        </button>
      </div>
    </div>
  )
}

export default Navbar
