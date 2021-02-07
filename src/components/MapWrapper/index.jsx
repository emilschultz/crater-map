import styled from 'styled-components';

const MapWrapper = styled.section`
  width: 100vw;
  height: 105vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Raleway', cursive;
  /* background-color: #193620; */

  h1 {
    font-size: 4rem;
    margin: 8rem 0 1rem 0;
    color: #202124;
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
    font-family: 'Raleway', sans-serif;
    letter-spacing: .07rem;
    text-decoration: none;
    font-size: .7rem;
    text-transform: uppercase;
    text-align: center;
    transition: ease .2s;
    color: #202124;
    background-color: rgba(32,33,36);
    cursor: pointer;
  }

  .navButtons:hover {
    color: #38eaed;
    background-color: #202124;
    margin-top: .1rem;
  }

  div {
    border-radius: .35rem;
    box-shadow: 0px 4px 30px 3px rgba(0,0,0,0.2);
    }

  
`;

export default MapWrapper;