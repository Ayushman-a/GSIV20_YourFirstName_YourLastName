import React from "react";
import styled from "styled-components";

const MovieContainer = styled.div`
display: flex;
flex-direction: column;
padding: 10px;
width: 200px;
box-shadow: 0 5px 10px 0 #1d1313;
cursor: pointer;
`;

const CoverImage = styled.img`
height: 300px;
background: white;
object-fit: cover;
`;

const MovieName = styled.span`
font-size: 18px;
font-weight: 500;
color: black;
margin: 8px 0;
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
font-family: -webkit-body;

`;

const InfoColumn = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;

`;

const MovieInfo = styled.span`
font-size: 15px;
color: black;
white-space: nowrap;
overflow: hidden;
text-transform: capitalize;
font-family: -webkit-body;
`;

const  MovieComponent = (props) => {
    const {Title, Year, imdbID, Type, Poster} = props.movie;    


    return (
        <MovieContainer
         onClick={()=>{
             props.onMovieSelect(imdbID);
         }}
         >
        <CoverImage src = {Poster}/>
        <MovieName>{Title}</MovieName>
        <InfoColumn>
        <MovieInfo>Year: {Year}</MovieInfo>
        <MovieInfo>Type: {Type}</MovieInfo>
        </InfoColumn>
        </MovieContainer>
    );
    
};
export default MovieComponent;