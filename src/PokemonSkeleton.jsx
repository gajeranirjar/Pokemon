export const PokemonSkeleton = () => {
  return (
    <article className="pokemon-card">
      <div className="skeleton" style={{ height: "15rem" }} />
      <div className="skeleton" style={{ height: "3rem", marginTop: "1.6rem" }} />
      <div className="skeleton" style={{ height: "2.4rem", margin: "1.2rem auto", width: "60%" }} />

      <div className="grid-three-cols">
        <div className="skeleton" />
        <div className="skeleton" />
        <div className="skeleton" />
      </div>

      <div className="grid-three-cols">
        <div className="skeleton" />
        <div className="skeleton" />
        <div className="skeleton" />
      </div>
    </article>
  );
};
