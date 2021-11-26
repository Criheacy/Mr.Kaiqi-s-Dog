import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectData,
  setSignInLog,
  setUser,
  setUserTotal,
} from "../store/data.slice";
import {
  SignInDataType,
  UserDataType,
  UserTotalDataType,
} from "../@types/data";

const useData = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectData);

  useEffect(() => {
    fetch("data/masked-sign-in-log.json")
      .then((response) => response.json())
      .then((signInLog: SignInDataType[]) => {
        dispatch(setSignInLog(signInLog));
      });
    fetch("data/masked-user.json")
      .then((response) => response.json())
      .then((user: UserDataType[]) => {
        dispatch(setUser(user));
      });
    fetch("data/user-total.json")
      .then((response) => response.json())
      .then((userTotal: UserTotalDataType[]) => {
        dispatch(setUserTotal(userTotal));
      });
  }, [dispatch]);

  return data;
};

export default useData;
