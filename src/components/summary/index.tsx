import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { useContext } from "react";
import { TransactionContext } from "../contexts/transactions";
import { priceFrometed } from "../../utils/formated";

export function Summary() {
  const { transactions } = useContext(TransactionContext);

  const incomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );

  const totalIncome = incomeTransactions.reduce(
    (sum, transaction) => sum + transaction.price,
    0
  );

  const outcomeTransactions = transactions.filter(
    (transactions) => transactions.type === "outcome"
  );

  const totalOutcome = outcomeTransactions.reduce(
    (sum, transaction) => sum + transaction.price,
    0
  );

  const valueAtual = totalIncome - totalOutcome;

  return (
    <div className="flex justify-center text-white">
      <div className="grid grid-cols-3 gap-4 -mt-8 w-7/12">
        <section
          className="0 rounded-lg p-4 flex flex-col justify-center items-center"
          style={{ background: "#323238" }}
        >
          {" "}
          <header className="flex justify-between w-full px-5 text-lg font-medium ">
            {" "}
            <span> Entradas</span>
            <ArrowCircleUp size={32} color="#00b37e" />
          </header>{" "}
          <strong> {priceFrometed.format(totalIncome)}</strong>
        </section>
        <section
          className=" rounded-lg p-4 flex flex-col justify-center items-center"
          style={{ background: "#323238" }}
        >
          {" "}
          <header className="flex justify-between w-full px-5 text-lg font-medium">
            {" "}
            <span> Saídas</span>
            <ArrowCircleDown size={32} color="#f75a68" />
          </header>{" "}
          <strong> {priceFrometed.format(totalOutcome)} </strong>
        </section>
        <section
          className="  rounded-lg p-4 flex flex-col justify-center items-center"
          style={{ background: valueAtual > 0 ? "#00875F" : "#f75a68" }}
        >
          {" "}
          <header className="flex justify-between w-full px-5 text-lg font-medium">
            {" "}
            <span> Total</span>
            <CurrencyDollar size={32} color="#ffff" />
          </header>{" "}
          <strong>{priceFrometed.format(valueAtual)} </strong>
        </section>
      </div>
    </div>
  );
}
