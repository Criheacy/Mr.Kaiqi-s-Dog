import styled from "@emotion/styled";
import { MenuItemType } from "../../@types/menu";
import { defaultMenu } from "../../static/menu";

const Aside = () => {
  return (
    <Container>
      {defaultMenu.map((menuItem, index) => (
        <MenuItem key={index} menuItem={menuItem} />
      ))}
    </Container>
  );
};

const MenuItem = ({ menuItem }: { menuItem: MenuItemType }) => {
  return (
    <MenuItemContainer>
      <IconContainer>{menuItem.icon}</IconContainer>
      <TitleContainer>
        <Title>{menuItem.title}</Title>
        <Subtitle>{menuItem.description}</Subtitle>
      </TitleContainer>
    </MenuItemContainer>
  );
};

const Container = styled.div`
  min-width: 28rem;
  display: flex;
  flex-direction: column;
  background-color: #e0e0e0;
`;

const MenuItemContainer = styled.div`
  padding: 0 1.8rem;
  display: flex;
  flex-direction: row;
  height: 5.4rem;
  align-items: center;
  gap: 1.4rem;
  &:hover {
    background-color: #00000020;
  }
  transition: background-color 0.2s;
`;

const IconContainer = styled.div`
  font-size: 2.4em;
  color: #808080;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Title = styled.div`
  font-size: 1.5em;
  color: #404040;
`;

const Subtitle = styled.div`
  font-size: 1em;
  color: #a0a0a0;
`;

export default Aside;
