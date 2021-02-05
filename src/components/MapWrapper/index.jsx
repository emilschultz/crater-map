import styled from 'styled-components';

const MapWrapper = styled.section`
  width: 100vw;
  height: 105vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #193620;

  section {
    width: 90%;
    height: 2.5rem;
    margin: 2rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }

  .navButtons {
    height: 100%;
    width: 13%;
    margin: .5rem;
    padding: .1rem;
    border: .1rem solid #efe251;
    border-radius: .2rem;
    text-decoration: none;
    font-family: 'Rakkas', cursive;
    font-size: .7rem;
    text-transform: uppercase;
    text-align: center;
    transition: ease .2s;
    color: #efe251;
    background-color: rgba(0,0,0,0);
    cursor: pointer;
  }

  .navButtons:hover {
    color: #193620;
    background-color: #efe251;
  }

  div {
    border-radius: 1rem;
    box-shadow: 0px 4px 30px 3px rgba(0,0,0,0.2);
    }

  
`;

export default MapWrapper;



// display:inline-block;
//  padding:0.35em 1.2em;
//  border:0.1em solid #FFFFFF;
//  margin:0 0.3em 0.3em 0;
//  border-radius:0.12em;
//  box-sizing: border-box;
//  text-decoration:none;
//  font-family:'Roboto',sans-serif;
//  font-weight:300;
//  color:#FFFFFF;
//  text-align:center;
//  transition: all 0.2s;
// }