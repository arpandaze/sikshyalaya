import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

const DelayedRedirect = ({ timeout, ...rest }) => {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setTimeout(() => setRedirect(true), timeout * 1000);
  });
  return <>{redirect ? <Redirect {...rest} /> : null}</>;
};

export default DelayedRedirect;
