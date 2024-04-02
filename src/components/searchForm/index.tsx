import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionContext } from "../contexts/transactions";

const SearchSchema = z.object({
  query: z.string(),
});

export type SearchFormInput = z.infer<typeof SearchSchema>;

export function SearchForm() {
  const { register, handleSubmit } = useForm<SearchFormInput>({
    resolver: zodResolver(SearchSchema),
  });
  const { fetchTransactions } = useContext(TransactionContext);

  async function handleSearchTransaction(data: SearchFormInput) {
    await fetchTransactions(data.query ?? null);
  }

  return (
    <div className="flex justify-center mt-10">
      <form
        className="flex w-7/12 gap-2"
        onSubmit={handleSubmit(handleSearchTransaction)}
      >
        <input
          placeholder="Busque por transações"
          className="w-full rounded-lg h-12 px-2 text-white"
          style={{ background: "#121214" }}
          {...register("query")}
        />

        <button
          className="px-5 py-1 border flex items-center gap-1 hover:bg-green-600 hover:text-white rounded-lg"
          style={{ border: "1px solid #00B37E", transition: "color 0.3s" }}
          type="submit"
        >
          <MagnifyingGlass size={20} />
          Buscar
        </button>
      </form>
    </div>
  );
}
