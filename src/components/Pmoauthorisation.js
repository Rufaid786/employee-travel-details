import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Csvform from "./Csvform";
import { authenticationStatus } from "./POM";

function Pmoauthorisation() {
  const authenticationValue = useRecoilValue(authenticationStatus);
  const redirect = useNavigate();
  const returnTologinpage = () => {
    redirect("/pmosection");
  };
  useEffect(() => {
    if (!authenticationValue) {
      returnTologinpage();
    }
  });

  return <Csvform />;
}

export default Pmoauthorisation;
