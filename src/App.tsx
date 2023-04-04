import { useState, useEffect } from "react"
import "./App.css"
import Navbar from "./components/Navbar"
import background from "./assets/poke_background.jpg"

function App() {
  const [pokeList, setPokeList] = useState([])
  const [originalPokeList, setOriginalPokeList] = useState([])

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        return response.json()
      })
      .then((data) => {
        const urls = data.results.map((result: any) => result.url)
        return Promise.all(
          urls.map((url: any) => fetch(url).then((response) => response.json()))
        )
      })
      .then((pokeData: any) => {
        setPokeList(pokeData)
        setOriginalPokeList(pokeData)
      })
      .catch((error) => {
        console.error("There was an error fetching the Pokemon list:", error)
      })
  }, [])

  return (
    <div
      className="APP w-screen  min-h-screen overflow-x-hidden"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Navbar
        pokeList={pokeList}
        setPokeList={setPokeList}
        originalPokeList={originalPokeList}
      />
      <div className=" mt-10 text-white ">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 place-items-center">
          {pokeList.map((pokemon: any) => (
            <div
              key={pokemon.name}
              className="bg-gradient-to-b from-red-600 to-blue-500 opacity-90 py-2 rounded-md mt-2 flex flex-col items-center w-[90%]"
            >
              <h1 className="text-xl text-white uppercase font-bold">
                {pokemon.name}
              </h1>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-[150px] h-[150px]"
              />
              <p className="text-white">Height: {pokemon.height}</p>
              <p className="text-white">weight: {pokemon.weight}</p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
