import React from "react";
import styled from "styled-components";
import axios from "axios";

const ContainerPokedex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  border-bottom: 10px solid black;
`;


const DivImg = styled.div`

  img {
    display: flex;
    width: 190px;
    position: relative;
    left: 210px;
    bottom: 100px;
    
  }
`;

const ContainerPokemons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  right: 80px;
  top: 200px;
  width: 23rem;
  height: 23rem;
  border: 10px solid black;
  background-color: white;
  color: black;
  border-radius: 900px;
`;

export default class App extends React.Component {
  state = {
    pokemons: [],
    imagem: "",
    infos: [],
  };

  componentDidMount() {
    this.getPokemons();
  }

  getPokemons = async () => {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=161&offset=0"
    );
    this.setState({ pokemons: response.data.results });
  };

  getPokeImagens = async (event) => {
    try {
      const url = event.target.value;
      const response = await axios.get(`${url}`);
      console.log(response);
      this.setState({ imagem: response.data.sprites.front_default });
      this.setState({ infos: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const pokeList = this.state.pokemons.map((poke) => {
      return (
        <option key={poke.name} value={poke.url}>
          {poke.name}
        </option>
      );
    });

    return (
      <ContainerPokedex>
        <DivImg>
        <img src="https://logodownload.org/wp-content/uploads/2017/08/pokemon-logo.png" alt="foto do pokemon"></img>
        </DivImg>
        <ContainerPokemons>
          <h2>Quem é esse Pokemon?</h2>
          <select onChange={this.getPokeImagens}>
            <option>Selecione um pokemon</option>
            {pokeList}
          </select>
          {this.state.imagem && (
            <img src={this.state.imagem} alt="foto do pokemon"></img>
          )}
          <p>Habilidades</p>
          {this.state.infos.abilities && 
            this.state.infos.abilities.map((habilidade) => {
              
              return (
                <li
                  key={habilidade.ability.name}
                  value={habilidade.ability.url}
                >
                  {habilidade.ability.name}
                </li>
              );
            })}
        </ContainerPokemons>
      </ContainerPokedex>
    );
  }
}
