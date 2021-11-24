import styled from "@emotion/styled";
import { MessageType, TimestampType } from "../@types/message";

const AtAllText = styled.span`
  color: #11b3ff;
`;

const ManagerLabel = styled.span`
  background-color: #3ee3d5;
  color: white;
  padding: 0 0.5rem;
  margin-right: 0.5rem;
  border-radius: 0.5rem;
`;

export const indexMessage: (MessageType | TimestampType)[] = [
  {
    text: "晚上 22:00",
  },
  {
    avatarUrl: "",
    align: "right",
    name: (
      <>
        <ManagerLabel>管理员</ManagerLabel>凯琦先生的狗
      </>
    ),
    text: (
      <>
        <AtAllText>@全体成员</AtAllText> 请大家在群里签到
      </>
    ),
  },
  {
    avatarUrl: "",
    align: "right",
    name: (
      <>
        <ManagerLabel>管理员</ManagerLabel>凯琦先生的狗
      </>
    ),
    text: "发送「签到」或「在宿舍」都视为有效",
  },
  {
    avatarUrl: "",
    align: "left",
    name: "同学A",
    text: "签到",
  },
  {
    avatarUrl: "",
    align: "left",
    name: "同学B",
    text: "在宿舍",
  },
  {
    avatarUrl: "",
    align: "left",
    name: "同学C",
    text: "在宿舍",
  },
];
