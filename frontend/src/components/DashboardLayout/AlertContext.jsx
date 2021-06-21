import { createContext } from "react";

export const AlertContext = createContext({
  severity: null,
  message: null,
});
