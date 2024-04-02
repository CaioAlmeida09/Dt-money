import { useContext } from "react";
import { TransactionContext } from "../contexts/transactions";
import { formatDate, priceFrometed } from "../../utils/formated";
import { Trash } from "phosphor-react";

export function Table() {
  const { transactions, HandleDeleteLine } = useContext(TransactionContext);

  function modalityFunction(type: string) {
    return {
      color:
        type === "income"
          ? "#00B37E"
          : type === "outcome"
            ? "#F75A68"
            : "yellow",
    };
  }

  return (
    <table className="mt-10 text-white w-8/12 mx-auto">
      <tbody>
        {transactions.map((item) => (
          <tr key={item.id} className="border-b border-gray-700">
            <td>{item.description}</td>
            <td>{priceFrometed.format(item.price)}</td>{" "}
            <td style={modalityFunction(item.type)}>{item.type}</td>
            <td>{formatDate(item.createdAt)}</td>
            <td>
              <Trash
                onClick={() => HandleDeleteLine(item)}
                className=" hover:text-red-500 cursor-pointer"
                size={25}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
