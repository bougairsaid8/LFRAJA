// src/components/TopInCatigorie/

import React, { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import "./TopInCatigorie.css";
import tmdb from "../../api/tmdb";
import { AppContext } from "../../contextglobal";

export default function TopInCatigorie({ component, url, sectionTitle, genres }) {
  const carouselRef = useRef(null);
  const [movies, setMovies] = useState([]);
  const mode=useContext(AppContext).Mode

  // Get data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentRes = await tmdb.get(url);
        setMovies(contentRes.data.results.slice(0, 10));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [url]); // إعادة الجلب عند تغير الرابط فقط

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      // Estimate scroll amount (Card width + gap)
      const scrollAmount = 215 * direction;

      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const sectionIcons = {
    MOVISE: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 48 48"
          id="Recording-Tape-1--Streamline-Plump"
          height="48"
          width="48"
        >
          <desc>
            Recording Tape 1 Streamline Icon: https://streamlinehq.com{" "}
          </desc>
          <g id="recording-tape-1--film-television-tv-movies-reel-video-entertainment">
            <path
              id="Subtract"
              fillRule="evenodd"
              d="M1.5 22C1.5 10.6782 10.6782 1.5 22 1.5S42.5 10.6782 42.5 22c0 0.538 -0.0207 1.0712 -0.0614 1.5987 -0.2407 3.214 -1.1486 6.3809 -2.0082 9.103 -0.1675 0.5304 -0.3316 1.039 -0.4895 1.5283 -0.3262 1.0111 -0.6258 1.9397 -0.8736 2.8071C38.6964 38.3353 38.5 39.3082 38.5 40c0 1.5238 0.4492 2.3684 0.8969 2.8257 0.4628 0.4728 1.0614 0.6743 1.6031 0.6743 0.4582 0 0.7739 -0.0953 1.0062 -0.2313 0.2313 -0.1354 0.4693 -0.3633 0.6923 -0.7683 0.4761 -0.8645 0.8015 -2.3862 0.8015 -4.8337 0 -0.8285 0.6716 -1.5 1.5 -1.5s1.5 0.6715 1.5 1.5c0 2.5941 -0.3246 4.7391 -1.1736 6.2808 -0.4395 0.7981 -1.0327 1.4583 -1.8045 1.9101 -0.7708 0.4513 -1.6301 0.6424 -2.5219 0.6424 -1.2584 0 -2.6597 -0.4651 -3.7469 -1.5757C36.1508 43.7983 35.5 42.1429 35.5 40c0 -0.9132 0.1943 -1.9399 0.4661 -2.9933C32.3055 40.415 27.3962 42.5 22 42.5 10.6782 42.5 1.5 33.3218 1.5 22Zm16 -10c0 -2.48528 2.0147 -4.5 4.5 -4.5s4.5 2.01472 4.5 4.5c0 2.4853 -2.0147 4.5 -4.5 4.5s-4.5 -2.0147 -4.5 -4.5ZM32 17.5c2.4853 0 4.5 2.0147 4.5 4.5s-2.0147 4.5 -4.5 4.5 -4.5 -2.0147 -4.5 -4.5 2.0147 -4.5 4.5 -4.5Zm-10 19c-2.4853 0 -4.5 -2.0147 -4.5 -4.5s2.0147 -4.5 4.5 -4.5 4.5 2.0147 4.5 4.5 -2.0147 4.5 -4.5 4.5Zm-10 -19c-2.48528 0 -4.5 2.0147 -4.5 4.5s2.01472 4.5 4.5 4.5c2.4853 0 4.5 -2.0147 4.5 -4.5s-2.0147 -4.5 -4.5 -4.5ZM22 24c-1.1046 0 -2 -0.8954 -2 -2s0.8954 -2 2 -2 2 0.8954 2 2 -0.8954 2 -2 2Z"
              clipRule="evenodd"
              strokeWidth="1"
            ></path>
          </g>
        </svg>
      ),
      text: "Movies",
    },
    "TV SERIES": {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          id="Youtube-Tv-Logo--Streamline-Logos"
          height="24"
          width="24"
        >
          <path d="M22 4H2a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h20a1 1 0 0 0 1 -1V5a1 1 0 0 0 -1 -1ZM9.5 7.5 16 11l-6.5 3.5v-7ZM7 19.75a0.75 0.75 0 0 0 0 1.5h10a0.75 0.75 0 0 0 0 -1.5H7Z" />
        </svg>
      ),
      text: "TV Series",
    },
    TRENDING: {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 14"
          id="Trending-Content--Streamline-Core"
          height="24"
          width="24"
        >
          <path d="M5.495 0.126A0.889 0.889 0 0 1 6.379 0.11c3.987 1.852 6.244 5.698 6.105 8.914 -0.06 1.351 -0.543 2.602 -1.48 3.515 -0.938 0.914 -2.285 1.448 -3.99 1.451a5.186 5.186 0 0 1 -5.502 -4.967l0 -0.008a4.38 4.38 0 0 1 2.251 -3.94 0.5 0.5 0 0 1 0.7 0.235A5.005 5.005 0 0 0 5.47 6.796c0.494 -0.645 0.722 -1.478 0.715 -2.394 -0.008 -1.09 -0.35 -2.259 -0.924 -3.254A0.76 0.76 0 0 1 5.495 0.126Z" />
        </svg>
      ),
      text: "Trending",
    },
  };

  const currentSection = sectionIcons[sectionTitle];

  return (
    <div className={`containerCatigorit ${mode=='light'?'light':'dark'}`}>
      <header className="carouselHeader">
        <h2 className="sectionTitle">
          {currentSection && (
            <>
              {currentSection.icon}
              <p>{currentSection.text}</p>
            </>
          )}
        </h2>
        <div className="carouselNav">
          <button className="navButton" onClick={() => scrollCarousel(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              height="24"
              width="24"
            >
              <g id="Arrow-Back-2-Fill">
                <path
                  id="Union"
                  fill="currentColor"
                  d="m15.9998 19.3379 -1.543 -0.9981 -8.50003 -5.5c-0.29105 -0.1884 -0.46441 -0.5147 -0.45703 -0.8613 0.00744 -0.3465 0.19441 -0.665 0.49316 -0.8408l8.5 -5 1.5069 -0.88575z"
                  strokeWidth="1"
                ></path>
              </g>
            </svg>
          </button>
          <button className="navButton" onClick={() => scrollCarousel(1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              height="24"
              width="24"
            >
              <g id="Arrow-Back-2-Fill">
                <path
                  id="Union"
                  fill="currentColor"
                  d="m15.9998 19.3379 -1.543 -0.9981 -8.50003 -5.5c-0.29105 -0.1884 -0.46441 -0.5147 -0.45703 -0.8613 0.00744 -0.3465 0.19441 -0.665 0.49316 -0.8408l8.5 -5 1.5069 -0.88575z"
                  strokeWidth="1"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </header>

      <div className="movieCarousel" ref={carouselRef}>
        {movies.map((item) => {
          return (
            <MovieCard
              key={item.id}
              title={item.title ? item.title : item.name}
              year={
                item.release_date
                  ? item.release_date.slice(0, 4)
                  : item.first_air_date.slice(0, 4)
              }
              rating={item.vote_average.toFixed(1)}
              imageUrl={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
              genre={item.genre_ids}
              genres={genres}
              views={item.popularity}
            />
          );
        })}
      </div>
      <div className="viewAll">
        <Link to={component}>View All...</Link>
      </div>
    </div>
  );
}
