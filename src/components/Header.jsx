import { Link, NavLink } from "react-router";

const links = [
  { to: "/", label: "Início" },
  { to: "/previsao", label: "Previsão" },
  { to: "/guia", label: "Guia" },
];

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__brand">
        <span aria-hidden="true">🌙</span> Lua & Linha
      </Link>

      <nav className="header__nav" aria-label="Navegação principal">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === "/"}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Header;
