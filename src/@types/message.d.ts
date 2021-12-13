import { ReactNode } from "react";

export type ConversationType = {
  avatarUrl: string;
  align: "left" | "right";
  name: ReactNode | undefined;
  text: ReactNode;
  decoration?: ReactNode;

  nameNavigate?: string;
  textNavigate?: string;
  decorationNavigate?: string;
};

export type TimestampType = {
  text: ReactNode;

  textNavigate?: string;
};
