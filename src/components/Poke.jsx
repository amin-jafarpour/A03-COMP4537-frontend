import './Poke.css'
import {resolvePokeImgLink} from '../util';
const Poke = ({pokeInfo}) => {
    let counter = 0;
    return ( 
     
         
            <div className='pokemon-main-container'>
            <div className="pokemon-id-container"><h1>Pokemon ID: {pokeInfo.id}</h1></div>
            <div className="pokemon-name-collection">
            <h3>Pokemon Names:</h3>
            {Object.entries(pokeInfo.name).map(x => (<p key={counter++} className="pokemon-name-single">{x[0]}: {x[1]}</p>))}
            </div>
            <div className="pokemon-type-collection">
            <h3>Pokemon Types:</h3>
                {pokeInfo.type.map(x => <p  key={counter++} className="pokemon-type-single">{x}</p>)}
                </div>
            <div className="pokemon-base-collection">
            <h3>Pokemon Base:</h3>
            {Object.entries(pokeInfo.base).map(x => (<p key={counter++} className="pokemon-base-single">{x[0]}: {x[1]}</p>))}
            </div>
            <div className="pokemon-img-container"> <img  className="pokemon-img"src={resolvePokeImgLink(pokeInfo.id)} alt="Poke Img" /></div>
            </div>
    
        ); 
}
 
export default Poke;