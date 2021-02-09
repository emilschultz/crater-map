import styled from 'styled-components';

const ContentSection = styled.section`
  height: 30vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #202124;

  h1 {
    font-size: 2rem;
    margin: .5rem;
    text-align: center;
  }

  div {
    width:50%;
    display: flex;
    justify-content: center;
    text-align: justify;
  }

  p {
    font-size: .8rem;
    }
`;

export default ContentSection;