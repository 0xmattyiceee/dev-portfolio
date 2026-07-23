import { createContext, useCallback, useContext, useState, type FC, type ReactNode } from 'react';
import PayModal from '../components/PayModal';

interface PayModalCtx {
  openPay: () => void;
  closePay: () => void;
}

const Ctx = createContext<PayModalCtx>({ openPay: () => {}, closePay: () => {} });

// eslint-disable-next-line react-refresh/only-export-components
export const usePayModal = () => useContext(Ctx);

export const PayModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const openPay = useCallback(() => setOpen(true), []);
  const closePay = useCallback(() => setOpen(false), []);
  return (
    <Ctx.Provider value={{ openPay, closePay }}>
      {children}
      <PayModal open={open} onClose={closePay} />
    </Ctx.Provider>
  );
};
