import { Link } from "react-router-dom";
import styled from "styled-components";
import About from "../components/Presentation/About";
import Ballpit from "../components/Presentation/Ballpit";
import CharacterAni from "../components/Presentation/CharacterAni";
import EarthIcons from "../components/Presentation/EarthIcons";
import Intro from "../components/Presentation/Intro";
import Product from "../components/Presentation/Product";
import RagDoll from "../components/Presentation/RagDoll";

const NavigatorItem = styled.div`
  padding: 10px;
  color: white;
`;

function Home(props) {
  return (
    <>
      <Intro></Intro>
      <About></About>
      <Product></Product>
      <CharacterAni></CharacterAni>
      <RagDoll></RagDoll>
      <Ballpit></Ballpit>
      <EarthIcons></EarthIcons>
      <Link to="/gameapp">
        <NavigatorItem>GAME</NavigatorItem>
      </Link>
    </>
  );
}

export default Home;
