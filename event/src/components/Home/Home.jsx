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
`;

const MainContent = styled.div`
  text-align: center;
  margin-top: 1rem;

  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    max-width: 600px;
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
