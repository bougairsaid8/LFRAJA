import React, { useState, useEffect } from "react";
import "./App.css";
import {BrowserRouter,Link,Route,Routes} from 'react-router-dom';
import Navigation from "./components/Navigation/navigation";
import ViewContent from "./components/View/view";
import {AppContext} from "./contextglobal.jsx"
import tmdb from "./api/tmdb";
import DiscoverView from "./components/DiscoverView/DiscoverView.jsx";

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
console.log(GMovie);

  return (
    <AppContext.Provider value={{GenresMovie:GMovie,GenresTv:GTv,Mode:mode,setMode}}>
      <BrowserRouter>
        <div className="container">
          <Navigation />
          
        

        {/* Routs */}
        <Routes>
          <Route path="/LFRAJA/"  element={<ViewContent/>}/>
          <Route path="/LFRAJA/Movies"  element={<DiscoverView mode={mode} GMovie={GMovie}/>}/>
          <Route path="/LFRAJA/TV-Series"  element={<DiscoverView mode={mode}/>}/>
          <Route path="/LFRAJA/Trending"  element={<DiscoverView mode={mode}/>}/>
          <Route path="/LFRAJA/Favorites"  element={<DiscoverView mode={mode}/>}/>
          <Route path="/LFRAJA/Settings"  element={<DiscoverView mode={mode}/>}/>
        </Routes>

        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
