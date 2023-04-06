import React from "react";
import Select from "react-select";
import { useState, useEffect } from "react";
import {link} from '../backend'

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }]

let pokemonTypes = [
  {
    value: "Normal",
    label: "Normal",
  },
  {
    value: "Fighting",
    label: "Fighting",
  },
  {
    value: "Flying",
    label: "Flying",
  },
  {
    value: "Poison",
    label: "Poison",
  },
  {
    value: "Ground",
    label: "Ground",
  },
  {
    value: "Rock",
    label: "Rock",
  },
  {
    value: "Bug",
    label: "Bug",
  },
  {
    value: "Ghost",
    label: "Ghost",
  },
  {
    value: "Steel",
    label: "Steel",
  },
  {
    value: "Fire",
    label: "Fire",
  },
  {
    value: "Water",
    label: "Water",
  },
  {
    value: "Grass",
    label: "Grass",
  },
  {
    value: "Electric",
    label: "Electric",
  },
  {
    value: "Psychic",
    label: "Psychic",
  },
  {
    value: "Ice",
    label: "Ice",
  },
  {
    value: "Dragon",
    label: "Dragon",
  },
  {
    value: "Dark",
    label: "Dark",
  },
  {
    value: "Fairy",
    label: "Fairy",
  },
];

const Search = ({setPokemons, accessToken, refreshToken}) => {
  // const [typesSelected, setTypesSelected] = useState([])
  const [selection, setSelection] = useState({
    id: "",
    name: { english: "" },
    base: {
      HP: 0,
      Attack: 0,
      Defense: 0,
      "Speed Attack": 0,
      "Speed Defense": 0,
      Speed: 0,
    },
    type: [],
  });
  const changeId = (val) => {
    if (val < 0 || val > 809) {
      return alert("Pokemon ID must be in range [1, 809]");
    }
    setSelection({ ...selection, id: val });
  };
  const changeName = (val) => {
    setSelection({ ...selection, name: { english: val } });
  };

  const changeBaseProperty = (baseProperty) => {
    let temp = { ...selection.base };
    temp[baseProperty.key] = baseProperty.val;
    setSelection({ ...selection, base: temp });
  };

  const submitSelection = () =>{

    let search = {
      "name.english": "",
      "id": 0,
      // "type": { "$in": ["Grass", "Poison"] },
      "base.HP": { "$gt": 0 },
      "base.Attack": { "$gt":  0},
      "base.Defense": { "$gt":  0},
      "base.Speed": { "$gt": 0 },
      "base.Speed Attack": { "$gt": 0},
      "base.Speed Defense": { "$gt": 0 }
  }
    let temp = {...selection}
    if(temp.id === ""){
      delete search['id']
    }
    else{
      search['id'] = temp.id;
    }
    if(temp.name.english === ""){
      delete search["name.english"]
    }
    else{
      search["name.english"] = temp.name.english
    }
    search["base.Attack"]["$gt"]   = temp['base']['Attack'] === "" ?  search["base.Attack"]["$gt"]  :  parseInt(temp['base']['Attack']) ;
    search["base.Defense"]["$gt"] = temp['base']['Defense'] === "" ? search["base.Defense"]["$gt"] :  parseInt(temp['base']['Defense']) ;
    search["base.Speed"]["$gt"] =  temp['base']['Speed'] === "" ? search["base.Speed"]["$gt"] :  parseInt(temp['base']['Speed']) ;
    search["base.Speed Attack"]["$gt"]  = temp['base']['Speed Attack'] === "" ? search["base.Speed Attack"]["$gt"]  :  parseInt(temp['base']['Speed Attack']) ;
    search["base.Speed Defense"]["$gt"] = temp['base']['Speed Defense'] === "" ? search["base.Speed Defense"]["$gt"] :  parseInt(temp['base']['Speed Defense']) ;
    search["base.HP"]["$gt"] = temp['base']['HP'] === "" ? search["base.HP"]["$gt"] :  parseInt(temp['base']['HP']) ;

    if(temp.type .length != 0){
      search['type'] = { "$in": temp.type }
    }
 



    fetch(link+"api/v1/selection/pokemons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token-refresh": refreshToken,
        "auth-token-access": accessToken,
      },
      body: JSON.stringify({"selection": search})
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("search pokes", data)
        if (!data.hasOwnProperty("err")) {
          setPokemons(data);
        }
      })
      .catch((error) => {
        console.error("err", error);
      });
  }

  return (
    <div>
      <div className="search-id-container">
        <label>
          Pokemon ID:
          <input
            onChange={(e) => changeId(e.target.value)}
            type="number"
            value={selection.id}
          />
        </label>
      </div>

      <div className="search-name-container">
        <label>
          Pokemon Name:
          <input
            type="text"
            onChange={(e) => changeName(e.target.value)}
            value={selection.name.english}
          />
        </label>
      </div>

      <div className="search-base-container">
        <label>
          HP:
          <input
            type="number"
            onChange={(e) =>
              changeBaseProperty({ key: "HP", val: e.target.value })
            }
            value={selection.base["HP"]}
          />
        </label>

        <label>
          Attack:
          <input
            type="number"
            onChange={(e) =>
              changeBaseProperty({ key: "Attack", val: e.target.value })
            }
            value={selection.base["Attack"]}
          />
        </label>

        <label>
          Defense:
          <input
            type="number"
            onChange={(e) =>
              changeBaseProperty({ key: "Defense", val: e.target.value })
            }
            value={selection.base["Defense"]}
          />
        </label>

        <label>
        Speed Attack:
          <input
            type="number"
            onChange={(e) =>
              changeBaseProperty({ key: "Speed Attack", val: e.target.value })
            }
            value={selection.base["Speed Attack"]}
          />
        </label>

        <label>
        Speed Defense:
          <input
            type="number"
            onChange={(e) =>
              changeBaseProperty({ key: "Speed Defense", val: e.target.value })
            }
            value={selection.base["Speed Defense"]}
          />
        </label>

        <label>
          Speed:
          <input
            type="number"
            onChange={(e) =>
              changeBaseProperty({ key: "Speed", val: e.target.value })
            }
            value={selection.base["Speed"]}
          />
        </label>

        <div className="search-submit-selection-btn">
        <button onClick={submitSelection}>LookUp</button>
      </div>
      </div>

      <div className="search-type-container">
        <Select
          options={pokemonTypes}
          onChange={(x) =>
            setSelection({
              ...selection,
              type: [...new Set([...selection.type, x.value])],
            })
          }
        />
        <div className="search-type-types-selected-bar">
          {selection.type.map((x) => (
            <button
              onClick={() =>
                setSelection({
                  ...selection,
                  type: [...selection.type].filter((y) => y !== x),
                })
              }
              key={x}
            >
              {x} {"X"}
            </button>
          ))}
        </div>
      </div>


      {/* <div className="search-submit-selection-btn">
        <button onClick={submitSelection}>LookUp</button>
      </div> */}

      {/* <h1>{JSON.stringify(selection)}</h1> */}
    </div>
  );
};

export default Search;
