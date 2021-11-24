import { ReactNode } from "react";

export type MessageType = {
  avatarUrl: string;
  align: "left" | "right";
  name: ReactNode | undefined;
  text: ReactNode;
};

export type TimestampType = {
  text: ReactNode;
};
