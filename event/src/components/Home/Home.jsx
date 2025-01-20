import styled from "styled-components";
import Navigation from "./Navigation";

const HomeCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  padding: 0rem;
  background-image: url("eve3.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    height: auto;
    background-size: cover;
    background-position: center;
    padding: 2rem 1rem;
  }
`;

const MainContent = styled.div`
  text-align: center;
  margin-top: 1rem;

  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    max-width: 600px;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

function Home() {
  return (
    <>
      <Navigation />
      <HomeCont>
        <MainContent>
          <h1>Welcome to Eventify</h1>
          <p>Your one-stop platform to discover and organize amazing events.</p>
        </MainContent>
      </HomeCont>
    </>
  );
}

export default Home;
