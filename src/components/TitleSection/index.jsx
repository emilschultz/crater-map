import styled from 'styled-components';

const TitleSection = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #000000;
  color: #EDEBE3;

  h1 {
    font-size: 2rem;
  }

  div {
    width:50%;
    display: flex;
    justify-content: center;
  }

  a {
    font-size: 2rem
  }
`;

export default TitleSection;