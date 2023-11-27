import { useEffect, useState } from "react"

async function fetchpokemon () { /* funçao async para chamar api */
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/') /* chamando api com await fetch(') */
  const date = await response.json()  /* transformando em texto */
  return(
    date.results      /* returnando o resultado */
  )
}

function App() {
  /* sempre precisamos do stados para monitorar os resultados e para renderizar na tela  */
  const[pokemon , setPokemon] = useState([]) /* usar o stado para renderizar a resposta da api */
  const [pokeDetail, setPokeDetail] = useState(null)


  /* usando o effect para chamar api pois como o [] de dependencias esta vazio , ele sera executado apenas 1x
    quando o componete for montado , que e o comportamento padrao do use effect
  */
  useEffect(() => {
    fetchpokemon().then(results => { /* chamando a funçao com o .then pois e uma promisse */
    console.log(results)    /* visualizando o resultado da api no console*/
    setPokemon(results)   /* colocando o results no state */
  })
  }, [])

  const showDetail = async (url) => {
    const date = await fetch(url).then(res => res.json()) /* chamando a api para a url */
    console.log(date)
    setPokeDetail(date)
  }

  return (
    <> {/* renderizando a resposta da api na tela */}
     <div className="app">
      <div>
        <h2>Pokémon</h2>
        <ul className="pokemon">
          {pokemon.map(mon => ( /* renderizando a api com a funçao map() */
            <li key={mon.name}>  {/* renderizando os atributos da api  */}
              <span>{mon.name}</span>
              <button onClick={() => showDetail(mon.url)}> {/* setando a funçao que mostra os detail do poke */}
               Ver Detalhes
              </button>
            </li>
          ))}
        </ul>
      </div>
      {pokeDetail && ( /* se o pokeDetail existir ele ira renderizar o cod abaixo */
        <div>
          <h2>{pokeDetail.name}</h2>
          <img
            src={pokeDetail.sprites.front_default}
            alt=""
          />
          <div className="stat">
            <b>Tipo: </b>
            {pokeDetail.types.map(({ type }) => (
              <span key={type.name}>{type.name} </span>
            ))}
          </div>
          <div className="stat">
            <b>Altura: </b>{pokeDetail.height / 10} m
          </div>
          <div className="stat">
            <b>Peso: </b>{pokeDetail.weight / 10} Kg
          </div>
          <div className="stat">
            <b>Atributos</b>
            <ul>
              {pokeDetail.stats.map(({ base_stat, stat }) => (
                <li key={stat.name}>
                  {stat.name}: {base_stat}
                </li>
              ))}
            </ul>
          </div>
          <div className="stat">
            <b>Habilidades</b>
            <ul>
              {pokeDetail.abilities.map(({ ability, is_hidden }) => (
                <li key={ability.name}>
                  {ability.name}
                  {is_hidden && " (secreta)"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div >

   
    </>
  )
}

export default App
