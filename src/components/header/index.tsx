import Logo from "../../assets/Ignitesimbol.svg";
import { TransactionModal } from "../transactionModal/index";

export function Header() {
  return (
    <header
      className="flex justify-between items-center p-6 text-xl text-white h-40"
      style={{ background: "#121214" }}
    >
      <section className="flex items-center">
        <img src={Logo} alt="logo" /> <strong>DT Money</strong>
      </section>
      <TransactionModal />
    </header>
  );
}
