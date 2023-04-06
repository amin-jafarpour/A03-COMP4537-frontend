import React, { useEffect, useState } from "react";

import PokemonCard from "./PokemonCard";
import './Pagination.css'

const Pagination = ({SelectedPokemons, onPokeClick}) => {
  SelectedPokemons.sort((a, b) => {
    if (a.id > b.id) {
      return 1;
    } else if (a.id < b.id) {
      return -1;
    } else {
      return 0;
    }
  });
    let pokePerPage = 6;
    let maxPageNum = Math.floor(SelectedPokemons.length / pokePerPage) + (SelectedPokemons.length % pokePerPage === 0 ? 0 : 1);
    let pagePerBar = 8;
    // let maxPageBar = Math.floor(maxPageNum / pagePerBar) + 1;
    let maxPageBar = Math.floor(maxPageNum / pagePerBar) + 1;
    const [pageInfo, setPageInfo] = useState({currentPage: 0, displayPokemons: [...SelectedPokemons].slice(0, pokePerPage), pageBar: 1})//{currentPage: 0, displayPokemons: SelectedPokemons.slice(0, pokePerPage)}
    const displayPokemon = (pageNum) =>{
        setPageInfo({...pageInfo, currentPage: pageNum, displayPokemons: [...SelectedPokemons].slice(pageNum * pokePerPage, pageNum * pokePerPage + pokePerPage )})
    }
    const displayPageBar = () =>{
        let token = [...Array(pagePerBar).keys()].map(x => x + (pageInfo.pageBar - 1) * pagePerBar).filter(x => x <= (maxPageNum - 1))
        return token.map(x => (<button className={x === pageInfo.currentPage ? 'pagination-active' : ''} key={x} onClick={() => displayPokemon(x)}>{x + 1}</button>))
    }

    // console.log('SelectedPokemons', SelectedPokemons)
    // console.log('displayPokemons', pageInfo.displayPokemons)

    useEffect(()=> {
        let sortedDisplayPokes = [...SelectedPokemons].slice(0, pokePerPage)
        sortedDisplayPokes.sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          } else if (a.id < b.id) {
            return -1;
          } else {
            return 0;
          }
        });
        setPageInfo({...pageInfo, displayPokemons: sortedDisplayPokes, pageBar: 1})
    }, [SelectedPokemons])



    return ( 
       <div className="pagination-main">
        <div className="pagination-btn-bar-container">
            {/* pageInfo.pageBar */}
        {pageInfo.pageBar !== 1 ? (<button onClick={() => setPageInfo({...pageInfo, pageBar: pageInfo.pageBar - 1})}>Prev</button>): <></>}
            {/* {[...Array(pagePerBar > pageTotalNum ? pageTotalNum : pagePerBar).keys()].map(x => x + pagePerBar).map(x =>  (<button className={x === pageInfo.currentPage ? 'pagination-active' : ''} key={x} onClick={() => displayPokemon(x)}>{x + 1}</button>))} */}
            {displayPageBar()}
           {pageInfo.pageBar !==  maxPageBar ? (<button onClick={() => {setPageInfo({...pageInfo, pageBar: pageInfo.pageBar + 1})}}>Next</button>): <></>}
        </div>
        <div className="pagination-pokemon-collection">
            {pageInfo.displayPokemons.map(x => (<PokemonCard onPokeClick={onPokeClick}  key={x.id}  pokeInfo={x}/>))}
        </div>
 
       
       </div>
       
     );
}
 
export default Pagination;