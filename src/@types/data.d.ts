export type SignInDataType = {
  record_id: number;
  user_id: string;
  date: string;
  sign_in_type: "sign_in";
  origin_message: string;
};

export type UserDataType = {
  user_id: string;
  user_name: string;
};

export type UserTotalDataType = {
  date: string;
  user_total: number;
};
