import styled from "@emotion/styled";
import { indexMessage } from "../../static/message";
import { Message, Timestamp } from "../../components/Message";
import { isMessageType } from "../../@types/message.guard";

const HomePage = () => {
  return (
    <Container>
      {indexMessage.map((message, index) =>
        isMessageType(message) ? (
          <Message key={index} message={message} />
        ) : (
          <Timestamp key={index} message={message} />
        )
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  background-color: #f5f5f5;
`;

export default HomePage;
