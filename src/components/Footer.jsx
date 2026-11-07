function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        © {year} Lua & Linha. As previsões são estimativas: confira sempre as
        condições locais e as regras de pesca da sua região.
      </p>
    </footer>
  );
}

export default Footer;
