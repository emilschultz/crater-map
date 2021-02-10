import styled from 'styled-components';

const ContenSection = styled.section`
  height: 110vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  background-color: rgb(220, 100, 40);
  color: #fafafa;
  padding: .6rem;
  

  h1 {
    width: 50%;
    font-family: 'Times New Roman', Times, serif;
    font-size: 6rem;
    font-weight: 400;
    font-style: italic;
    text-align: right;
    margin: 0;
    text-transform: uppercase;
  }

  div {
    width: 50%;
    display: flex;
    text-align: justify;
    justify-content: flex-end;
    margin: 0 0 5rem 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
`;

export default ContenSection;