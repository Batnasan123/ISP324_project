import { useContext } from "react";

import { CompanyContext } from "../contexts/CompanyContext.js";

const useAuth = () => {
  const context = useContext(CompanyContext);

  if (!context)
    throw new Error("CompanyContext must be placed within CompanyProvider.");
  return context;
};

export default useAuth;
