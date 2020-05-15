import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.scss';

function App() {
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character/?name=")
  const [info, setInfo] = useState({})
  const [results, setResults] = useState([])
  const [search, setSearch] = useState("")

  useEffect(()=> {
    console.log('url: ', url)
    console.log('info: ', info)
    console.log('results: ', results)
    console.log('search: ', search)
  }, [url, info, results, search])

  useEffect(() => {
    axios.get(`${url}${search}`)
      .then((result)=>{
        // console.log(result)
        setInfo(result.data.info)
        setResults(result.data.results)
      })
      .catch((error)=> {
        console.log(error)
      })
  }, [search])

  // useEffect(()=>{
  //   setResults("this is a test")
  // },[])


  return (
    <>
      <header>
        <p>Search</p><input onChange={(e)=>{
          setSearch(e.target.value)
        }} 
        value={search}
        type="text"/>
      </header>
      <main>
        <section className="characters"> 
          {results.map((result, index)=> (
            <article key={index} className="card">
              <img src={result.image} alt={`photo of ${result.name}`} />
              <p>Name: {result.name}</p>
              <p>Origin: {result.origin.name}</p>
              <p>Location: {result.location.name}</p>
              <p>Species: {result.species}</p>
              <p>Status: {result.status}</p>
              <p>Type: {result.type}</p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
