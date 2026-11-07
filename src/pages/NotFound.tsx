import { Link } from "react-router";

function NotFound() {
  return (
    <section>
      <h1>Página não encontrada</h1>
      <p>
        Esse peixe escapou. <Link to="/">Voltar para o início</Link>
      </p>
    </section>
  );
}

export default NotFound;
