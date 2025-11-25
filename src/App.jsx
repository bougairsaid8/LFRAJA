import React, { useState, useEffect ,useContext} from "react";
import "./App.css";
import Navigation from "./components/Navigation/navigation";
import ViewContent from "./components/View/view";
import {AppContext} from "./contextglobal.jsx"
import tmdb from "./api/tmdb";

function App() {
  const [GMovie, setGMovie] = useState([]);
  const [GTv, setGTv] = useState([]);
  const [mode,setMode]=useState("light");

  useEffect(() => {
    const fetchMovieGenres = async () => {
      try {
        const resGMovie = await tmdb.get("/genre/movie/list");
        setGMovie(resGMovie.data.genres)
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };

    fetchMovieGenres();
  }, []); 

  useEffect(() => {
    const fetchTVGenres = async () => {
      try {
        const resGTv = await tmdb.get("/genre/tv/list");
        setGTv(resGTv.data.genres)
      } catch (err) {
        console.error("Failed to fetch genres:", err);
      }
    };

    fetchTVGenres();
  }, []); 

  return (
    <AppContext.Provider value={{GenresMovie:GMovie,GenresTv:GTv,Mode:mode,setMode}}>
      <div className="container">
        <Navigation />
        <ViewContent/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
