"use client";

import { ContractOptions } from "thirdweb";
import { createContext, useEffect, useState } from "react";
import { getContract } from "thirdweb";
import { sepolia, hardhat } from "thirdweb/chains";
import { client } from "./client";

export const ContractContext = createContext(
  {} as Readonly<ContractOptions<[]>>
);

export const ContractProvider = ({ children }) => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const fetchContract = async () => {
      const contract = getContract({
        client,
        chain: process.env.RPC === "local" ? hardhat : sepolia,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, // Your contract address
      });
      setContract(contract);
    };

    fetchContract();
  }, []);

  return (
    <ContractContext.Provider value={contract}>
      {children}
    </ContractContext.Provider>
  );
};
