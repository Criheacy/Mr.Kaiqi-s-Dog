import styled from "@emotion/styled";
import { ConversationType, TimestampType } from "../@types/message";
import SignInRate from "../components/Charts/SignInRate";
import UserSignInTime from "../components/Charts/UserSignInTime";
import DiffFixedDormitory from "../components/Charts/DiffFixedDormitory";
import SignInPeriod from "../components/Charts/SignInPeriod";

const AtAllText = styled.span`
  color: #11b3ff;
`;

const HostLabel = styled.span`
  background-color: #fdba33;
  color: white;
  padding: 0 0.5rem;
  margin-right: 0.5rem;
  border-radius: 0.5rem;
`;

const ManagerLabel = styled.span`
  background-color: #3ee3d5;
  color: white;
  padding: 0 0.5rem;
  margin-right: 0.5rem;
  border-radius: 0.5rem;
`;

const GreenText = styled.span`
  color: rgb(0, 217, 36);
`;

const OrangeText = styled.span`
  color: rgb(255, 163, 0);
`;

const RedText = styled.span`
  color: rgb(255, 70, 0);
`;

export const indexMessage: (ConversationType | TimestampType)[] = [
  {
    text: "晚上 22:00",
    textNavigate: "/time",
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
    nameNavigate: "/sign-in",
    textNavigate: "/sign-in",
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
    nameNavigate: "/sign-in",
    textNavigate: "/sign-in",
  },
  {
    avatarUrl: "",
    align: "left",
    name: "同学A",
    text: "签到",

    nameNavigate: "/user",
    textNavigate: "/message",
  },
  {
    avatarUrl: "",
    align: "left",
    name: "同学B",
    text: "在宿舍",

    nameNavigate: "/user",
    textNavigate: "/message",
  },
  {
    avatarUrl: "",
    align: "left",
    name: "同学C",
    text: "在宿舍",
    decoration: "+1",

    nameNavigate: "/user",
    textNavigate: "/message",
    decorationNavigate: "/plus-one",
  },
];

export const signInMessage: (ConversationType | TimestampType)[] = [
  {
    text: "返回主页",
    textNavigate: "/",
  },
  {
    avatarUrl: "",
    align: "left",
    name: (
      <>
        <HostLabel>群主</HostLabel>凯琦先生
      </>
    ),
    text: "每天有多少同学签到？",
  },
  {
    avatarUrl: "",
    align: "right",
    name: (
      <>
        <ManagerLabel>管理员</ManagerLabel>凯琦先生的狗
      </>
    ),
    text: "主人，这是每天的签到情况",
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
        <GreenText>绿色</GreenText>
        表示全员完成签到，
        <OrangeText>橙色</OrangeText>和<RedText>红色</RedText>
        表示部分同学未完成签到，数字为未签到的人数
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
    text: <SignInRate />,
  },
];

export const userMessage: (ConversationType | TimestampType)[] = [
  {
    text: "返回主页",
    textNavigate: "/",
  },
  {
    avatarUrl: "",
    align: "left",
    name: (
      <>
        <HostLabel>群主</HostLabel>凯琦先生
      </>
    ),
    text: "这位同学平常都在什么时候签到？",
  },
  {
    avatarUrl: "",
    align: "right",
    name: (
      <>
        <ManagerLabel>管理员</ManagerLabel>凯琦先生的狗
      </>
    ),
    text: "主人，这里列举了每位同学的签到情况",
  },
  {
    avatarUrl: "",
    align: "right",
    name: (
      <>
        <ManagerLabel>管理员</ManagerLabel>凯琦先生的狗
      </>
    ),
    text: "点击一位同学的名字可以跳转到他的签到情况哦~",
  },
  {
    avatarUrl: "",
    align: "right",
    name: (
      <>
        <ManagerLabel>管理员</ManagerLabel>凯琦先生的狗
      </>
    ),
    text: <UserSignInTime />,
  },
];

export const timeMessage: (ConversationType | TimestampType)[] = [
  {
    text: "返回主页",
    textNavigate: "/",
  },
  {
    avatarUrl: "",
    align: "left",
    name: (
      <>
        <HostLabel>群主</HostLabel>凯琦先生
      </>
    ),
    text: "在一天的签到中，签到人数在各个时段的分布是怎样的？",
  },
  {
    avatarUrl: "",
    align: "right",
    name: (
      <>
        <ManagerLabel>管理员</ManagerLabel>凯琦先生的狗
      </>
    ),
    text: "主人，这是签到人数在一天中各个时段的分布情况",
  },
  {
    avatarUrl: "",
    align: "right",
    name: (
      <>
        <ManagerLabel>管理员</ManagerLabel>凯琦先生的狗
      </>
    ),
    text: <SignInPeriod />,
  },
];

export const plusOneMessage: (ConversationType | TimestampType)[] = [
  {
    text: "返回主页",
    textNavigate: "/",
  },
  {
    avatarUrl: "",
    align: "left",
    name: (
      <>
        <HostLabel>群主</HostLabel>凯琦先生
      </>
    ),
    text: "同学们说了「在宿舍」，就一定是真的在宿舍吗？",
  },
  {
    avatarUrl: "",
    align: "left",
    name: (
      <>
        <HostLabel>群主</HostLabel>凯琦先生
      </>
    ),
    text: "会不会是直接点的上一条消息+1来签到呢？",
  },
  {
    avatarUrl: "",
    align: "right",
    name: (
      <>
        <ManagerLabel>管理员</ManagerLabel>凯琦先生的狗
      </>
    ),
    text: "主人，因为每位同学发消息的习惯是不同的，我们可以针对每位同学做分析",
  },
  {
    avatarUrl: "",
    align: "right",
    name: (
      <>
        <ManagerLabel>管理员</ManagerLabel>凯琦先生的狗
      </>
    ),
    text: "这里列举了每位同学发的消息与上一条消息相同的占比",
  },
  {
    avatarUrl: "",
    align: "right",
    name: (
      <>
        <ManagerLabel>管理员</ManagerLabel>凯琦先生的狗
      </>
    ),
    text: <DiffFixedDormitory />,
  },
];