import React, { useState, useEffect } from "react";
import "./HeroSlider.css";
import tmdb from "../../api/tmdb";
import { FaPlay, FaHeart} from "react-icons/fa";
import { Link } from "react-router-dom";


function HeroSlider({ genres }) {
  const [heroSliderData, setHeroSliderData] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await tmdb.get("/trending/all/day", { params: { page: 1 } });
        setHeroSliderData(res.data.results.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const Data = heroSliderData[currentSlideIndex];

  const goToNextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % 5);
  };

  useEffect(() => {
    const sliderInterval = setInterval(goToNextSlide, 8000);

    return () => clearInterval(sliderInterval);
  }, []); 

  const manualChange = (index) => {
    setCurrentSlideIndex(index);
  };

  return (
    <>
      <div
        className="containerSlider"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${Data?.backdrop_path || ""})` }}
      >
        <div className="infoSlider">
          <h2>{Data?.name || Data?.title}</h2>
          <div className="type">
            {Data?.genre_ids.map((id, index) => (
              <p key={index}>{genres.find((g) => g.id === id)?.name}</p>
            ))}
          </div>
          <p className="discreption">{Data?.overview}</p>
          <div className="detailsMovie_actions">
              <Link to={`/LFRAJA/Details_${Data?.media_type}/${Data?.id}`}>
              <button className="detailsMovie_watch">
                <FaPlay />
                More Details
              </button>
              </Link>
              <button className="detailsMovie_add">
                <FaHeart />
                Add to Favorite
              </button>
            </div>
        </div>
        <div className="steps">
          {heroSliderData.map((item, index) => {
            return (
              <svg
                className={item.id === Data.id ? "active" : ""}
                key={item.id}
                onClick={() => manualChange(index)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#000000"
                id="Point--Streamline-Tabler-Filled"
                height="24"
                width="24"
              >
                <desc>Point Streamline Icon: https://streamlinehq.com</desc>
                <path
                  fill="#000000"
                  d="M12 7a5 5 0 1 1 -4.995 5.217L7 12l0.005 -0.217A5 5 0 0 1 12 7z"
                  strokeWidth="1"
                ></path>
              </svg>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default HeroSlider;
