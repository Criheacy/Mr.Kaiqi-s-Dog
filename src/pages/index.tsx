import styled from "@emotion/styled";
import Aside from "../components/Aside";
import { Header } from "../components/Window";
import SignInRate from "../components/Charts/SignInRate";

const MainPage = () => {
  return (
    <Container>
      <Header />
      <ContentContainer>
        <Aside />
        {/*<HomePage />*/}
        <SignInRate />
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 4rem 24rem;
  background-color: #f7f7f7;
  border-radius: 2rem;

  box-shadow: #00000040 6px 6px 16px 2px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export default MainPage;
