import styled from "@emotion/styled";
import {indexMessage, plusOneMessage, signInMessage, timeMessage, userMessage} from "../../static/message";
import { Message, Timestamp } from "../../components/Message";
import { isMessageType } from "../../@types/message.guard";
import {useLocation} from "react-router";
import {useMemo} from "react";

const HomePage = () => {
  const location = useLocation();

  const message = useMemo(() => {
    if (location.pathname === "/sign-in")
      return signInMessage;
    if (location.pathname === "/user")
      return userMessage;
    if (location.pathname === "/time")
      return timeMessage;
    if (location.pathname === "/plus-one")
      return plusOneMessage;
    return indexMessage;
  }, [location])

  return (
    <Container>
      <ContentContainer>
        <TitleContainer />
        <MessageContainer>
          {message.map((message, index) =>
            isMessageType(message) ? (
              <Message key={index} message={message} />
            ) : (
              <Timestamp key={index} message={message} />
            )
          )}
        </MessageContainer>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  gap: 1.8rem;

  background-color: #eeeeee;
  background-image: repeating-linear-gradient(
      45deg,
      #e3e3e3 25%,
      transparent 25%,
      transparent 75%,
      #e3e3e3 75%,
      #e3e3e3
    ),
    repeating-linear-gradient(
      45deg,
      #e3e3e3 25%,
      #eeeeee 25%,
      #eeeeee 75%,
      #e3e3e3 75%,
      #e3e3e3
    );
  background-position: 0 0, 34px 34px;
  background-size: 68px 68px;
`;

const TitleContainer = styled.div`
  background-color: white;
`

const ContentContainer = styled.div`
  width: 60%;
  background-color: #f8f8f8;
  overflow: auto;
`;

const MessageContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  overflow: auto;
`;

export default HomePage;
