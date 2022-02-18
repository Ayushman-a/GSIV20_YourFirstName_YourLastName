 import axios from "axios";
import React , { useState } from "react";
import styled from "styled-components";
import MovieComponent from "./component/MovieComponent";
import MovieInfoComponent from "./component/MovieInfoComp";


export const API_KEY = "a873e244";



const Container = styled.div`
  display: flex;
  flex-direction: column;
`;


const Header = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 background-color: #021d33;
 color: white;
 align-items: center;
 padding: 10px;
 font-size: 19px;
 font-family: cursive;
 box-shadow: 0 3px 6px 0 #372b2b
 
`;

const AppName = styled.div`
display: flex;
flex-direction: row;
align-items: center
`;

const MovieImage = styled.img`
width: 65px;
height: 65px;
margin: 15px;
`;

const SearchBox = styled.div`
display: flex;
flex-direction: row;
padding: 10px 10px;
background-color: white;
width: 50%;
margin-left: 20px;
border-radius: 6px;
background-color: white;
align-items: center;
`;

const SearchIcon = styled.img`
width: 32px;
height: 32px;
`;

const SearchInput = styled.input`
color: black;
font-size; 20px;
font-weight: bold;
border: none;
outline: none;
margin-left: 15px;
`;

const MovieList = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
padding: 30px;
gap: 30px;
justify-content: space-evenly;
`;

function App() {
  const [searchQuery, updateSearchQuery] = useState();

  const [timeoutId, updateTimeoutId] = useState();
  const [movieList, updateMovieList] = useState();
  const [selectedMovie, onMovieSelect] = useState();

  const fetchData = async (searchString) =>{
    const response = await 
    axios.get(
     `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`
    );
    console.log(response)
    updateMovieList(response.data.Search)
  };
  const onTextChange = (event) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value),);
    updateTimeoutId(timeout);
  };

  return (
  <Container>
    <Header>
      <AppName>
        <MovieImage src= "/q.png"/>
        Ayush's Movie app
      </AppName>
      <SearchBox>
        <SearchIcon src= "/search-icon.svg"/>
        <SearchInput placeholder="Search Movie..." 
        value = {searchQuery}
        onChange={onTextChange}
        />
        </SearchBox>
    </Header>
    {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
    <MovieList>
      {movieList?.length? movieList.map((movie, index)=> (
      <MovieComponent
       key = {index}
       movie = {movie} 
       onMovieSelect={onMovieSelect}
      />
      ))
      
      : "NO MOVIE FOUND"}
      
    </MovieList>
    </Container>
  )
}
export default App;
