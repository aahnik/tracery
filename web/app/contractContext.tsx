import { ContractOptions } from "thirdweb";
import { createContext } from "react";

export const ContractContext = createContext(
  {} as Readonly<ContractOptions<[]>>
);
