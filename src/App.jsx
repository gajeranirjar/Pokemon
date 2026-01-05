import { Pokemon } from "./Pokemon";
import { Helmet } from "react-helmet-async";

export const App = () => {
  return (
    <>
      <Helmet>
        <title>Pokemon</title>
        <meta
          name="description"
          content="Fast Pokemon Finder built with React. Infinite scroll, offline support, and SEO optimized."
        />
      </Helmet>
      <Pokemon />
    </>
  );
};
