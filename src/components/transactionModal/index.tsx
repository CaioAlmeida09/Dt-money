import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TransactionContext } from "../contexts/transactions";
import { formatPriceModal, priceFrometed } from "../../utils/formated";

const newTransactionSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.string(),
});

type newTransactionForm = z.infer<typeof newTransactionSchema>;

export function TransactionModal() {
  const { register, handleSubmit, setValue, reset } =
    useForm<newTransactionForm>({
      resolver: zodResolver(newTransactionSchema),
    });
  const [isModalOpen, setModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const { CreatedTransactions } = useContext(TransactionContext);

  async function HandleCreateNewTransaction(data: newTransactionForm) {
    await CreatedTransactions({
      description: data.description,
      category: data.category,
      price: data.price,
      type: data.type,
    });
    setModalOpen(false);
    reset();
  }

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setModalOpen}>
      <Dialog.Trigger asChild>
        <button
          className="py-3 px-5 rounded-lg cursor-pointer transition-colors"
          style={{ background: "#00B37E", color: "#fff" }}
        >
          Nova transação
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 w-full h-screen"
          style={{ background: "rgba(0, 0, 0, 0.75)" }}
        />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 p-10 bg-gray-800 rounded-lg shadow-lg w-96 text-white "
          style={{ maxWidth: "90%" }}
        >
          <Dialog.Title className="text-lg font-bold mb-4">
            Nova Transação
          </Dialog.Title>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit(HandleCreateNewTransaction)}
          >
            <label>Descrição:</label>
            <input
              className="w-full h-10 p-3 text-black font-medium"
              type="text"
              placeholder="Descrição"
              required
              {...register("description")}
            />
            <label>Preço:</label>
            <input
              className="w-full h-10 p-3 text-black font-medium"
              type="number"
              placeholder="Preço"
              required
              {...register("price", { valueAsNumber: true })}
            />
            <label>Categoria:</label>
            <input
              className="w-full h-10 p-3 text-black font-medium"
              type="text"
              placeholder="Categoria"
              required
              {...register("category")}
            />
            <section className="flex gap-3 justify-center">
              <button
                type="button"
                className={`px-4 py-2 rounded-lg flex justify-center items-center ${
                  transactionType === "income" ? "bg-green-500 text-white" : ""
                }`}
                onClick={() => {
                  setTransactionType("income");
                  setValue("type", "income");
                }}
              >
                {" "}
                <ArrowCircleUp /> Entrada
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg flex justify-center items-center ${
                  transactionType === "outcome" ? "bg-red-500 text-white" : ""
                }`}
                onClick={() => {
                  setTransactionType("outcome");
                  setValue("type", "outcome"); // Define o valor do tipo como "outcome"
                }}
              >
                {" "}
                <ArrowCircleDown /> Saída
              </button>
            </section>
            <input
              type="hidden"
              {...register("type")} // Campo oculto para armazenar o tipo de transação
            />
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Cadastrar
            </button>
          </form>
          <Dialog.Close>
            <button
              className="py-2 px-4 mt-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              type="button"
            >
              Fechar
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
