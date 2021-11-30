import UserSignInTime from "../components/Charts/UserSignInTime";
import SignInRate from "../components/Charts/SignInRate";
import SignInPeriod from "../components/Charts/SignInPeriod";
import InDormitoryRate from "../components/Charts/InDormitoryRate";

const MainPage = () => {
  return (
    <>
      <UserSignInTime />
      <SignInRate />
      <SignInPeriod />
      <InDormitoryRate />
    </>
  );
};

export default MainPage;
