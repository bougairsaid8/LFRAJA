import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./DiscoverView.css";
import tmdb from "../../api/tmdb";
const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "tr", name: "Turkish" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ar", name: "Arabic" },
];
function DiscoverView({ mode, Genners, Discover }) {
  const [url, setUrl] = useState(`/discover/${Discover}`);
  const [search, setSearch] = useState("");
  function SearchByTitle(e) {
    setSearch(e.target.value);
    setFilter({ ...filter, Genre: "", Year: "", Rating: "", language: "" });
  }

  const [filter, setFilter] = useState({
    Genre: "",
    Year: "",
    Rating: "",
    language: "",
  });
  function FilterGenre(e) {
    setFilter({ ...filter, Genre: e.target.value });
    setSearch("");
  }
  function FilterYear(e) {
    setFilter({ ...filter, Year: e.target.value });
    setSearch("");
  }
  function FilterRating(e) {
    setFilter({ ...filter, Rating: e.target.value });
    setSearch("");
  }
  function FilterLanguage(e) {
    setFilter({ ...filter, language: e.target.value });
    setSearch("");
  }
  const [data, setData] = useState([]);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1950 + 1 },
    (_, i) => currentYear - i
  );

  // Update URL based on search and filter state
  useEffect(() => {
    if (
      !search &&
      !filter.Genre &&
      !filter.Year &&
      !filter.Rating &&
      !filter.language
    ) {
      setUrl(`/discover/${Discover}`);
    } else if (search) {
      setUrl(`/search/${Discover}?query=${search}`);
    } else {
      setUrl(
        `/discover/${Discover}?with_genres=${filter.Genre}&primary_release_year=${filter.Year}&with_original_language=${filter.language}&vote_average.gte=${filter.Rating}&vote_average.lte=${filter.Rating+1}`
      );
    }
  }, [search, filter, Discover]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Res = await tmdb.get(url);
        setData(Res.data.results);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [url]);
  return (
    <div className={`ViewContainer ${mode == "light" ? "light" : "dark"}`}>
      <div className={`filter-search ${mode == "light" ? "light" : "dark"}`}>
        <div className={`search ${mode == "light" ? "light" : "dark"}`}>
          <input
            value={search}
            type="text"
            name="search"
            placeholder="Find by title..."
            onChange={SearchByTitle}
          />
        </div>

        <div className={`filter ${mode == "light" ? "light" : "dark"}`}>
          {/* select for Genres */}
          <div className={`Genre`}>
            <p>Genre</p>
            <select value={filter.Genre} onChange={FilterGenre}>
              <option value="">All Genres</option>
              {Genners.map((G) => (
                <option key={G.id} value={G.id}>
                  {G.name}
                </option>
              ))}
            </select>
          </div>

          {/* select for Years */}
          <div className={`Year`}>
            <p>Year</p>
            <select value={filter.Year} onChange={FilterYear}>
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* select for Ratings */}

          <div className={`Rating`}>
            <p>Rating</p>
            <select value={filter.Rating} onChange={FilterRating}>
              <option value="">All Ratings</option>
              {Array.from({ length: 9 }, (_, index) => (
                <option key={index} value={9 - index}>
                  +{9 - index}
                </option>
              ))}
            </select>
          </div>

          {/* select for Languages */}
          <div className={`language`}>
            <p>Language</p>
            <select value={filter.language} onChange={FilterLanguage}>
              <option value="">All languages</option>
              {languages.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Affichage */}
      <div className={`content ${mode == "light" ? "light" : "dark"}`}>
      {data.map((item) => {
          return (
            <MovieCard
              key={item.id}
              title={item.title ? item.title : item.name}
              year={
                item.release_date
                  ? item.release_date.slice(0, 4)
                  : item.first_air_date
                    ?item.first_air_date.slice(0, 4)
                    : "N/A"
              }
              rating={item.vote_average.toFixed(1)}
              imageUrl={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
              genre={item.genre_ids}
              genres={Genners}
              views={item.popularity}
            />
          );
        })}
      </div>
    </div>
  );
}

export default DiscoverView;
