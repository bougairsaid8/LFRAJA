
import React , { useEffect, useState } from "react";
import MovieCard from "../MovieCard/MovieCard";
import tmdb from "../../api/tmdb";
import { Link } from "react-router-dom";
import poster from "../../assets/posterVide.png"
import Pagination from "../Pagination/Pagination";




function Trending({mode , Genners}) {
    const [Data,setData] = useState([])
    const [count, setCount] = useState(1);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const Res = await tmdb.get(`trending/all/day?page=${count}`);
        setData(Res.data.results);
        } catch (err) {
        console.error(err);
        }
    };
    fetchData();
    }, [count]);

  return (
    <div className={`ViewContainer ${mode == "light" ? "light" : "dark"}`}>
      
      {/* Affichage */}
      <div className={`content ${mode == "light" ? "light" : "dark"}`}>
      {Data.map((item) => {
          return (
            <Link to={`/LFRAJA/Details_${item.media_type}/${item.id}`} key={item.id}>
              <MovieCard
                title={item.title ? item.title : item.name}
                year={
                  item.release_date
                    ? item.release_date.slice(0, 4)
                    : item.first_air_date
                      ?item.first_air_date.slice(0, 4)
                      : "N/A"
                }
                rating={item.vote_average.toFixed(1)}
                imageUrl={item.poster_path?`https://image.tmdb.org/t/p/w342${item.poster_path}`:poster}
                genre={item.genre_ids}
                genres={Genners}
                views={item.popularity}
              />
            </Link>
          );
        })}
      </div>
      <Pagination pages={50} count={count} setCount={setCount} />
    </div>
  )
}

export default Trending