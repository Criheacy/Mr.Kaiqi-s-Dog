import { MessageType, TimestampType } from "../../@types/message";
import styled from "@emotion/styled";

const Message = ({ message }: { message: MessageType }) => {
  return (
    <MessageContainer
      style={{
        flexDirection: message.align === "left" ? "row" : "row-reverse",
      }}
    >
      <AvatarContainer>
        {/*<img src={message.avatarUrl} alt={"Avatar"} />*/}
      </AvatarContainer>
      <ContentContainer>
        <NameContainer style={{ textAlign: message.align }}>
          {message.name}
        </NameContainer>
        <TextContainer>{message.text}</TextContainer>
      </ContentContainer>
    </MessageContainer>
  );
};

const Timestamp = ({ message }: { message: TimestampType }) => {
  return (
    <MessageContainer style={{ justifyContent: "center" }}>
      <TimestampContainer>{message.text}</TimestampContainer>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
`;

const AvatarContainer = styled.div`
  background-color: #d7d7d7;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: calc(100% - 10rem);
`;

const NameContainer = styled.div`
  font-size: 1.5em;
  color: #808080;
`;

const TextContainer = styled.div`
  font-size: 1.8em;
  padding: 1rem 1.5rem;
  background-color: white;
  border-radius: 1rem;
  max-width: 100%;
  overflow-wrap: break-word;
  border: 1px solid #e0e0e0;
`;

const TimestampContainer = styled.div`
  font-size: 1.5em;
  color: #606060;
  background-color: #e7e7e7;
  border-radius: 0.4rem;
  padding: 0.5rem 1rem;
  text-align: center;
`;

export { Message, Timestamp };
