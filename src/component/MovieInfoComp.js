import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { API_KEY } from "../App";


const Container = styled.div`
display: flex;
flex-direction: row;
padding: 20px 30px;
justify-content: center;
border-bottom: 1px solid lightgrey;

`;


const CoverImage = styled.img`
height: 300px;
object-fit: cover;
`;

const InfoColumn = styled.div`
display: flex;
flex-direction: column;
margin 20px;
`;

const MovieName = styled.span`
font-size: 20px;
font-weight: 500;
color: black;
margin: 8px 0;
white-space: nowrap;
text-transform: capitalize;
text-overflow: ellipsis;
overflow: hidden;
font-family: -webkit-body;
`;

const MovieInfo = styled.span`
font-size: 18px;
font-weight: 200;
color: black;
overflow: hidden;
margin: 8px 0;
text-transform: capitalize;
text-overflow: ellipsis;
& span{
    opacity: 0.5;
}
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;

const  MovieInfoComponent = (props) => {
    const [movieInfo, setMovieInfo] = useState();
    const { selectedMovie } = props;
    useEffect(() =>{
        axios
        .get(`https://www.omdbapi.com/?i=${selectedMovie}&apikey=${API_KEY}`)
        .then((response) => setMovieInfo(response.data));
    },[selectedMovie]);
    
    return (
        <Container>
          {movieInfo ? (
            <>
              <CoverImage src={movieInfo?.Poster} alt={movieInfo?.Title} />
              <InfoColumn>
                <MovieName>
                  {movieInfo?.Type}: <span>{movieInfo?.Title}</span>
                </MovieName>
                <MovieInfo>
                  IMDB Rating: <span>{movieInfo?.imdbRating}</span>
                </MovieInfo>
                <MovieInfo>
                  Year: <span>{movieInfo?.Year}</span>
                </MovieInfo>
                <MovieInfo>
                  Rating: <span>{movieInfo?.Rated}</span>
                </MovieInfo>
                <MovieInfo>
                  Year of release: <span>{movieInfo?.Released}</span>
                </MovieInfo>
                <MovieInfo>
                  Length: <span>{movieInfo?.Runtime}</span>
                </MovieInfo>
                <MovieInfo>
                  Director: <span>{movieInfo?.Director}</span>
                </MovieInfo>
                <MovieInfo>
                  Cast: <span>{movieInfo?.Actors}</span>
                </MovieInfo>
                <MovieInfo>
              Description   : <span>{movieInfo?.Plot}</span>
            </MovieInfo>
              </InfoColumn>
              <Close onClick={() => props.onMovieSelect()}>X</Close>
            </>
          ) : (
            "Loading Your Request..."
          )}
        </Container>
      );
    };
export default MovieInfoComponent;