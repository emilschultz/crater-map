import styled from 'styled-components';

const TitleSection = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #EDEBE3;
  color: #FF0000;

  h1 {
    font-size: 2rem;
  }

  div {
    width:50%;
    display: flex;
    justify-content: center;
  }

  a {
    font-size: 4rem
  }
  /* img {
    width: 2rem;
    margin-top: 8rem
  } */
  
`;

export default TitleSection;