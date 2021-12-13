import React, { useCallback } from "react";
import { ConversationType, TimestampType } from "../../@types/message";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Message = ({ message }: { message: ConversationType }) => {
  const navigate = useNavigate();

  const navigateTo = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, to?: string) => {
      e.stopPropagation();
      if (to) navigate(to);
    },
    [navigate]
  );

  return (
    <MessageContainer
      style={{
        flexDirection: message.align === "left" ? "row" : "row-reverse",
      }}
    >
      {message.nameNavigate ? (
        <SelectableAvatarContainer
          onClick={(e) => navigateTo(e, message.nameNavigate)}
        />
      ) : (
        <AvatarContainer />
      )}
      <ContentContainer>
        {message.nameNavigate ? (
          <SelectableNameContainer
            style={{ textAlign: message.align }}
            onClick={(e) => navigateTo(e, message.nameNavigate)}
          >
            {message.name}
          </SelectableNameContainer>
        ) : (
          <NameContainer style={{ textAlign: message.align }}>
            {message.name}
          </NameContainer>
        )}
        {message.textNavigate ? (
          <SelectableTextContainer
            onClick={(e) => navigateTo(e, message.textNavigate)}
          >
            {message.text}
          </SelectableTextContainer>
        ) : (
          <TextContainer>{message.text}</TextContainer>
        )}
      </ContentContainer>
      {message.decoration ? (
        message.decorationNavigate ? (
          <SelectableDecorationContainer
            onClick={(e) => navigateTo(e, message.decorationNavigate)}
          >
            {message.decoration}
          </SelectableDecorationContainer>
        ) : (
          <DecorationContainer>{message.decoration}</DecorationContainer>
        )
      ) : null}
    </MessageContainer>
  );
};

const Timestamp = ({ message }: { message: TimestampType }) => {
  const navigate = useNavigate();

  const navigateTo = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, to?: string) => {
      e.stopPropagation();
      if (to) navigate(to);
    },
    [navigate]
  );

  return (
    <MessageContainer style={{ justifyContent: "center" }}>
      {message.textNavigate ? (
        <SelectableTimestampContainer onClick={(e) => navigateTo(e, message.textNavigate)}>
          {message.text}
        </SelectableTimestampContainer>
      ) : (
        <TimestampContainer>{message.text}</TimestampContainer>
      )}
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
  gap: 0.75rem;
  max-width: calc(100% - 10rem);
`;

const NameContainer = styled.div`
  font-size: 1.5em;
  color: #808080;

  user-select: none;
`;

const TextContainer = styled.div`
  font-size: 1.8em;
  padding: 1rem 1.5rem;
  background-color: white;
  border-radius: 1rem;
  max-width: 100%;
  overflow-wrap: break-word;
  border: 1px solid #dcdcdc;

  user-select: none;
`;

const TimestampContainer = styled.div`
  font-size: 1.5em;
  color: #606060;
  background-color: #e7e7e7;
  border-radius: 0.4rem;
  padding: 0.5rem 1rem;
  text-align: center;

  user-select: none;
`;

const DecorationContainer = styled.div`
  width: 2.6rem;
  height: 2.6rem;
  font-size: 1.4em;
  border-radius: 50%;
  margin-bottom: 0.6rem;
  align-self: flex-end;

  background-color: white;
  border: 1px solid #0098ff;
  color: #0098ff;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;
`;

const SelectableAvatarContainer = styled(AvatarContainer)`
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translate(-2px, -5px);
    box-shadow: 2px 5px 2px #00000033;
  }

  &:active {
    transition: all 0.1s;
    transform: translate(0, 0);
    box-shadow: none;
  }
`;

const SelectableNameContainer = styled(NameContainer)`
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translate(-2px, -5px);
    text-shadow: 2px 5px 2px #00000033;
  }

  &:active {
    transition: all 0.1s;
    transform: translate(0, 0);
    text-shadow: none;
  }
`;

const SelectableTextContainer = styled(TextContainer)`
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translate(-2px, -5px);
    box-shadow: 2px 5px 2px #00000033;
  }

  &:active {
    transition: all 0.1s;
    transform: translate(0, 0);
    box-shadow: none;
  }
`;

const SelectableDecorationContainer = styled(DecorationContainer)`
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translate(-2px, -5px);
    box-shadow: 2px 5px 2px #00000033;
  }

  &:active {
    transition: all 0.1s;
    transform: translate(0, 0);
    box-shadow: none;
  }
`;

const SelectableTimestampContainer = styled(TimestampContainer)`
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translate(-2px, -5px);
    box-shadow: 2px 5px 2px #00000033;
  }

  &:active {
    transition: all 0.1s;
    transform: translate(0, 0);
    box-shadow: none;
  }
`;

export { Message, Timestamp };
