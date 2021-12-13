import styled from "@emotion/styled";

const Header = () => {
  return (
    <Container>
      <TitleContainer>凯琦先生的狗</TitleContainer>
      <ButtonContainer>
        <RedButton />
        <YellowButton />
        <GreenButton />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: 3rem;
  min-height: 3rem;
  background-color: #808080;
  color: white;
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
`;

const TitleContainer = styled(ContentContainer)`
  justify-content: center;

  background: transparent;
  color: white;
  font-size: 1.4em;
`;

const ButtonContainer = styled(ContentContainer)`
  flex-direction: row-reverse;
  margin-right: 2rem;
  gap: 0.7rem;
`;

const Button = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
`;

const RedButton = styled(Button)`
  background-color: #f44040;
`;

const YellowButton = styled(Button)`
  background-color: #ffc62b;
`;

const GreenButton = styled(Button)`
  background-color: #94f83c;
`;

export { Header };
