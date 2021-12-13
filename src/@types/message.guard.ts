import React from "react";
import { ConversationType, TimestampType } from "./message";

export const isMessageType = (obj: any): obj is ConversationType => {
  if (obj === null || obj === undefined) return false;
  if (typeof obj.avatarUrl !== "string") return false;
  if (!(obj.align === "left" || obj.align === "right")) return false;
  if (
    !(
      obj.name === undefined ||
      typeof obj.name === "string" ||
      React.isValidElement(obj.name)
    )
  )
    return false;
  if (!(typeof obj.text === "string" || React.isValidElement(obj.text)))
    return false;
  return true;
};

export const isTimestamp = (obj: any): obj is TimestampType => {
  if (obj === null || obj === undefined) return false;
  return React.isValidElement(obj.text);
};
