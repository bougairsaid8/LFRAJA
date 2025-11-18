import React, { useState, useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation/navigation";
import ViewContent from "./components/View/view";
import tmdb from "./api/tmdb";

function App() {
  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    const fetchAllGenres = async () => {
      try {
        const resMovieGenres = await tmdb.get("/genre/movie/list");
        const resTvGenres = await tmdb.get("/genre/tv/list");

        const combinedGenres = [
          ...resMovieGenres.data.genres,
          ...resTvGenres.data.genres,
        ];
        const uniqueGenres = combinedGenres.filter(
          (genre, index, self) =>
            index === self.findIndex((g) => g.id === genre.id)
        );
        setAllGenres(uniqueGenres);
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };

    fetchAllGenres();
  }, []); // سيتم التشغيل مرة واحدة فقط عند تحميل التطبيق

  return (
    <div className="container">
      <Navigation />
      <ViewContent allGenres={allGenres} />
    </div>
  );
}

export default App;
