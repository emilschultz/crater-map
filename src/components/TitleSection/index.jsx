import styled from 'styled-components';

const TitleSection = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: rgb(220, 100, 40);
  color: #000000;

  h1 {
    font-family: 'Times New Roman', Times, serif;
    font-size: 8rem;
    font-weight: 400;
    font-style: italic;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: .5rem
  }

  div {
    width: 75%;
    display: flex;
    text-align: justify;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 2rem;
    text-transform: uppercase;
  }
`;

export default TitleSection;