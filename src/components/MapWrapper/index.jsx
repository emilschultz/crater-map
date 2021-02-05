import styled from 'styled-components';

const MapWrapper = styled.section`
  width: 100vw;
  height: 105vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Rakkas', cursive;
  /* background-color: #193620; */

  h1 {
    font-size: 4rem;
    margin: 8rem 0 1rem 0;
    color: #193620;
  }

  section {
    width: 90%;
    height: 2.7rem;
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
    border: .1rem solid #193620;
    border-radius: .2rem;
    font-family: 'Rakkas', cursive;
    letter-spacing: .07rem;
    text-decoration: none;
    font-size: .7rem;
    text-transform: uppercase;
    text-align: center;
    transition: ease .2s;
    color: #193620;
    background-color: rgba(0,0,0,0);
    cursor: pointer;
  }

  .navButtons:hover {
    color: #ffffff;
    background-color: #193620;
    margin-top: .1rem;
  }

  div {
    border-radius: 1rem;
    box-shadow: 0px 4px 30px 3px rgba(0,0,0,0.2);
    }

  
`;

export default MapWrapper;