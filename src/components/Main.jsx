import Pagination from "./Pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "./Search";
import Header from "./Header";
import Monitor from "./Monitor";
import Poke from './Poke'
import {link} from '../backend'
import { useNavigate } from 'react-router-dom';
const Main = () => {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);
  const [tokens, setTokens] = useState({accessToken: "", refreshToken: "", isAdmin: false, showAdmin: false, pokemonDetail: false});
  const [currentPoke, setCurrentPoke] = useState({})
  // const [accessToken, setAccessToken] = useState(null);

  const fetchPokemons = (refreshToken, accessToken) => {
    fetch(link+"api/v1/pokemons", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token-access": accessToken,
        "auth-token-refresh": refreshToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("fetchPokemon: ", data);
        if (!data.hasOwnProperty("err")) {
          setPokemons(data);
        }
      })
      .catch((error) => {
        console.error("err", error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("auth-token-refresh") === null) {
      //localstorage*
      // window.location.href = "/"; //one here to go to login
      navigate('/', { replace: true });
    }
    fetch(link+"requestNewAccessToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token-refresh": localStorage.getItem("auth-token-refresh"),
        "auth-token-access": "dummy",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("err")) {
          // window.location.href = "/"
          navigate('/', { replace: true });
        } //&&MIGHT NEED TO CHAGE
        setTokens({...tokens, accessToken: data["auth-token-access"], refreshToken: localStorage.getItem("auth-token-refresh"), isAdmin: data['isAdmin']})
        fetchPokemons(
          localStorage.getItem("auth-token-refresh"),
          data["auth-token-access"]
        );
      })
      .catch((error) => {
        console.error("err", error);
      });
  }, []);

  const onPokeClick = (pokeId) =>{
    let pokesWanted = pokemons.filter(p => p.id == pokeId)
    if(pokesWanted.length > 0){
      setCurrentPoke(pokesWanted[0])
      setTokens({...tokens, pokemonDetail: true})
    }
  }


  return (
    <>
      {/* one here */}
      {localStorage.getItem("auth-token-refresh") !== null ? (
        <>
             <Header  refreshToken={localStorage.getItem("auth-token-refresh")} />
             <div>{tokens.isAdmin ? <button onClick={() => setTokens({...tokens, showAdmin: !tokens.showAdmin})}>{tokens.showAdmin ? "Search Page" : "Admin Page"}</button> : <></>}</div>

             {tokens.showAdmin ? <Monitor accessToken={tokens.accessToken} refreshToken={tokens.refreshToken}/>: <></>}
          { tokens.showAdmin === false ?  <Search accessToken={tokens.accessToken} refreshToken={tokens.refreshToken} setPokemons={setPokemons}/> : <></>}
       
        </>
   
        
      ) : (
        <></>
      )}
      
      
      {tokens.showAdmin ? <></> : (pokemons.length > 0 ? (
        <div>
       
           {tokens.pokemonDetail === false ? <>
           <Pagination onPokeClick={onPokeClick}
            SelectedPokemons={pokemons.slice(0, 809)}
          />{" "}
           </> : <><button onClick={() => setTokens({...tokens, pokemonDetail: false})}>Back to Pokemon Search</button> <Poke pokeInfo={currentPoke}/></>}
       
        </div>
      ) : (
        <div>loading ...</div>
      ))}
    </>
  );
};

export default Main;
