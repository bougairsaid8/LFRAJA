import React, { useState, useEffect } from "react";
import { FaPlay, FaHeart, FaUsers, FaPhotoVideo } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import tmdb from "../../api/tmdb";
import img from "../../assets/imageuser.png";
import poster from "../../assets/posterVide.png";
import cover from "../../assets/cover.jpg";
import "./DetailsMovie.css";
function DetailsMovie({ mode, type, Genners }) {
  // This would typically be passed as a prop, e.g., function DetailsMovie({ movieData })
  const [Data, setData] = useState({});
  const [CastCrew, setCastCrew] = useState({});
  const [Movies, setMovies] = useState([]);
  const [loding, setLoding] = useState(true);
  const [keyTrailer,setKeyTrailer]=useState('')
  const [Trailer, setTrailer] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setCastCrew([]);
    const fetchData = async () => {
      try {
        const repData = await tmdb.get(type + "/" + id);
        setData(repData.data);

        const repKeyTrailer = await tmdb.get(type + "/" + id+"/videos")
        setKeyTrailer(
          repKeyTrailer.data.results.find(v=>v.site=="YouTube" && v.type=="Trailer").key
        )
        const repCast = await tmdb.get(type + "/" + id + "/credits");
        const newCast = repCast.data.cast.slice(0, 4);
        const newCrew = repCast.data.crew.slice(0, 2);
        setCastCrew([...newCast, ...newCrew]);

        const genres = repData.data.genres
          ?.map((item) => item.id)
          .slice(0, 2)
          .join(",");

        if (genres) {
          const repMovies = await tmdb.get(
            `discover/${type}?with_genres=${genres}`
          );
          const newMovies = repMovies.data.results
            .filter((item) => item.id != id)
            .slice(0, 5);
          setMovies(newMovies);
        }
        setLoding(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, type]);

  const backdropStyle = Data.backdrop_path
    ? {
        "--backdrop-url": `url(https://image.tmdb.org/t/p/original${Data.backdrop_path})`,
      }
    : {
        "--backdrop-url": `url(${cover})`,
      };
  if (loding) {
    return (
      <div className={`loding ${mode == "light" ? "light" : "dark"}`}>
        <span class="loader"></span>
      </div>
    );
  }

  return (
    <div className={`ViewContainer ${mode == "light" ? "light" : "dark"}`}>
      <div
        className={`detailsMovie ${mode == "light" ? "light" : "dark"}`}
        style={backdropStyle}
      >
        <div className="detailsMovie_poster">
          <img
            src={
              Data.poster_path
                ? `https://image.tmdb.org/t/p/w500${Data.poster_path}`
                : poster
            }
            alt={Data.title}
          />
          <div
            className={`detailsMovie_info ${
              mode == "light" ? "light" : "dark"
            }`}
          >
            <h1>{Data.title ? Data.title : Data.name}</h1>
            <ul className="moreInfo">
              <li>
                {Data.release_date
                  ? Data.release_date.slice(0, 4)
                  : Data.first_air_date
                  ? Data.first_air_date.slice(0, 4)
                  : "N/A"}
              </li>
              <li>| {Data.vote_average.toFixed(1)}/10</li>
              {type === "movie" ? (
                <li>
                  | {parseInt(Data.runtime / 60)}h {Data.runtime % 60}m
                </li>
              ) : null}
              <li>
                |{" "}
                {Data.genres
                  .map((genre) => genre.name)
                  .slice(0, 2)
                  .join(", ")}
              </li>
            </ul>
            <p className="detailsMovie_overview">{Data.overview}</p>
            <div className="detailsMovie_actions">
              <button
                className="detailsMovie_watch"
                onClick={() => setTrailer(true)}
              >
                <FaPlay />
                Watch Trailer
              </button>
              <button className="detailsMovie_add">
                <FaHeart />
                Add to Favorite
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="background-trailer"
        style={Trailer ? { display: "" } : { display: "none" }}
      >
        <div
          className={`containerTrailer ${mode == "light" ? "light" : "dark"} ${
      Trailer ? "show" : "hide"
    }`}
        >
          <span className="closeTrailer" onClick={() => setTrailer(false)}>
            ✖
          </span>
          <iframe src={`https://www.youtube.com/embed/${keyTrailer}`}></iframe>
        </div>
      </div>
      <div className={`Castcrew ${mode == "light" ? "light" : "dark"}`}>
        <h2 className="title">
          {" "}
          <FaUsers /> Cast&Crew
        </h2>
        <div className="Castcrew_list">
          {CastCrew.map((item) => (
            <div
              className={`Castcrew_item ${mode == "light" ? "light" : "dark"}`}
              key={item.id}
            >
              <img
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                    : img
                }
                alt={item.name}
              />
              <h3>{item.name}</h3>
              <p>{item.character ? item.character.split("(")[0] : item.job}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="MoreMovies">
        <h2 className="title">
          {" "}
          <FaPhotoVideo /> More Like this
        </h2>
        <div className="Movies_list">
          {Movies.map((item) => {
            return (
              <Link to={`/LFRAJA/Details_${type}/${item.id}`} key={item.id}>
                <MovieCard
                  title={item.title ? item.title : item.name}
                  year={
                    item.release_date
                      ? item.release_date.slice(0, 4)
                      : item.first_air_date
                      ? item.first_air_date.slice(0, 4)
                      : "N/A"
                  }
                  rating={item.vote_average.toFixed(1)}
                  imageUrl={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                      : poster
                  }
                  genre={item.genre_ids}
                  genres={Genners}
                  views={item.popularity}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DetailsMovie;
