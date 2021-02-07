import styled from 'styled-components';

const TitleSection = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #F2F4F7;
  color: #202124;
  font-family: 'Raleway', cursive;

  h1 {
    font-size: 4rem;
    margin: 0;
  }

  div {
    width:50%;
    display: flex;
    justify-content: center;
    text-align: justify;
  }

  p {
    font-size: 1rem;
    }

  a {
    font-size: 2.5rem;
    cursor: pointer;
    padding: 1rem;
  }
`;

export default TitleSection;