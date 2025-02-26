import React,{ useEffect, useRef, useState } from 'react'
import cards_data from '../../assets/cards-20250221T040438Z-001/cards/Cards_data'
import './TitleCards.css'
import { Link } from 'react-router-dom'



const TitleCards = ({title ,category}) => {

const [apiData,setApiData] = useState([])
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTFjYTRkOWE4MzdjYTY5NmFmZmIxNjFhN2E5ZjM5MiIsIm5iZiI6MTc0MDEzMjgyNC43MTgwMDAyLCJzdWIiOiI2N2I4NTFkOGJjODRkNTZjYmViYTYzMDMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cOIT9WZ1NWLMb0ZdwzEb8TOkKKzWHIFLQElvGxjoAt4'
    }
  };
 


useEffect(()=>{
     
  fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
},[])



  return (
    <div className='titleCards'>
        <h2>{title? title:"Popular on Netflix"}</h2>
        <div className="card-list">
            {apiData.map((card,ind)=>{
                return <Link to={`/player/${card.id}`} className="card" key={ind}>
                    <img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt="" />
                    <p>{card.original_title}</p>
                </Link>
            })}
        </div>
    </div>
  )
}

export default TitleCards
