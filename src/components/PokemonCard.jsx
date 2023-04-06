import {resolvePokeImgLink} from '../util'
import {Link } from 'react-router-dom';

const PokemonCard = ({pokeInfo, onPokeClick}) => {
    return (   
    <div className="pagination-pokemon-single">
        <h2>Pokemon ID: {pokeInfo.id}</h2>
        <h3>Pokemon Name: {pokeInfo.name.english}</h3>
        {/* <Link to={`pokemon/${pokeInfo.id}`}>View</Link> */}
        <button onClick={() => onPokeClick(pokeInfo.id)}>View Pokemon</button>
        <div className="pagination-img-container">
        <img  className="pokemon-img"src={resolvePokeImgLink(pokeInfo.id)} alt="Poke Img" />
        </div>
    </div> 
    );
}
 
export default PokemonCard;