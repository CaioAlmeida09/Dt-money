import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface TransactionProps {
  id: string;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}
interface CreateTransactionProps {
  description: string;
  type: string;
  category: string;
  price: number;
}

interface TransactionContextType {
  transactions: TransactionProps[];
  setTransactions: (value: TransactionProps[]) => void;
  CreatedTransactions: (data: CreateTransactionProps) => Promise<void>;
  fetchTransactions: (query?: string) => Promise<void>;
  HandleDeleteLine: (data: TransactionProps) => void;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType
);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  async function fetchTransactions(query?: string) {
    try {
      const response = await api.get("/transactions", {
        params: {
          description_like: query,
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  async function HandleDeleteLine(data: TransactionProps) {
    try {
      await api.delete(`/transactions/${data.id}`);
      const filteredTransactions = transactions.filter(
        (item) => item.id !== data.id
      );
      setTransactions(filteredTransactions);
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
    }
  }

  async function CreatedTransactions(data: CreateTransactionProps) {
    const response = await api.post("transactions", {
      description: data.description,
      category: data.category,
      price: data.price,
      type: data.type,
      createdAt: new Date(),
    });
    setTransactions([...transactions, response.data]);
    console.log("entrei");
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        CreatedTransactions,
        fetchTransactions,
        HandleDeleteLine,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
