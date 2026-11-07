function AdSlot({ label = "Espaço publicitário", size = "banner" }) {
  return (
    <aside className={`ad-slot ad-slot--${size}`} aria-label={label}>
      <span>{label}</span>
    </aside>
  );
}

export default AdSlot;
