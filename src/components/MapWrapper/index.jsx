import styled from 'styled-components';

const MapWrapper = styled.section`
  width: 100vw;
  height: 105vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Raleway', cursive;
  background-color: rgb(220, 100, 40);

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
`;

export default MapWrapper;