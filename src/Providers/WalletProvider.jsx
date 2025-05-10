import { createContext, useState } from "react";

export const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(10000); 

  
  const deductBalance = (amount) => {
    setBalance((prev) => Math.max(prev - amount, 0)); 
  };

  const topUpBalance = (amount) => {
    setBalance((prev) => prev + amount);
  };

  return (
    <WalletContext.Provider value={{ balance, deductBalance, topUpBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
