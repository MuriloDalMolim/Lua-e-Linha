import AdSlot from "../components/AdSlot.jsx";

function Home() {
  return (
    <section>
      <h1>Lua & Linha</h1>
      <p>
        Descubra se hoje é um bom dia para pescar e o que levar na caixa de
        pesca.
      </p>

      <AdSlot label="Conteúdo patrocinado: pesqueiro parceiro" size="card" />
    </section>
  );
}

export default Home;
