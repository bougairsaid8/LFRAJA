import React, { useState, useEffect } from "react";
import "./HeroSlider.css";
import tmdb from "../../api/tmdb";

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
    const sliderInterval = setInterval(goToNextSlide, 5000);

    return () => clearInterval(sliderInterval);
  }, []); 

  const manualChange = (index) => {
    setCurrentSlideIndex(index);
  };

  return (
    <>
      <div
        className="containerSlider"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${Data?.backdrop_path || ""})` }}
      >
        <div className="infoSlider">
          <h2>{Data?.name || Data?.title}</h2>
          <div className="type">
            {Data?.genre_ids.map((id, index) => (
              <p key={index}>{genres.find((g) => g.id === id)?.name}</p>
            ))}
          </div>
          <p className="discreption">{Data?.overview}</p>
          <div className="actions">
            <button>
              Watch
              </button>
            <svg
              className={ "active"}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="24"
            >
              <g id="Favorite-Fill">
                <path
                  id="Union"
                  fill="currentColor"
                  d="M7.5 4c-2.08784 0 -3.51738 0.91924 -4.38654 2.18347C2.27961 7.39634 2 8.86209 2 10c0 1.5355 0.6829 3.0459 1.5742 4.3828 0.90132 1.352 2.0848 2.629 3.23918 3.7192 1.15854 1.0942 2.31299 2.0238 3.17566 2.6788 0.43216 0.3281 0.79306 0.5888 1.04726 0.7684 0.1272 0.0898 0.2278 0.1594 0.2974 0.2071 0.0348 0.0239 0.0619 0.0423 0.0807 0.0549l0.0218 0.0148 0.0081 0.0054c0.0002 0.0001 0.001 0.0007 0.5557 -0.8314l-0.5547 0.8321c0.3359 0.2239 0.7735 0.2239 1.1094 0L12 21c0.5547 0.8321 0.5545 0.8322 0.5547 0.8321l0.001 -0.0007 0.0081 -0.0054 0.0218 -0.0148c0.0188 -0.0126 0.0459 -0.031 0.0807 -0.0549 0.0696 -0.0477 0.1702 -0.1173 0.2974 -0.2071 0.2542 -0.1796 0.6151 -0.4403 1.0473 -0.7684 0.8626 -0.655 2.0171 -1.5846 3.1756 -2.6788 1.1544 -1.0902 2.3379 -2.3672 3.2392 -3.7192C21.3171 13.0459 22 11.5355 22 10c0 -1.13791 -0.2796 -2.60366 -1.1135 -3.81653C20.0174 4.91924 18.5878 4 16.5 4c-2.1801 0 -3.6298 1.14306 -4.5 2.32757C11.1298 5.14306 9.68013 4 7.5 4"
                  strokeWidth="1"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <div className="steps">
          {heroSliderData.map((item) => {
            return (
              <svg
                className={item.id === Data.id ? "active" : ""}
                key={item.id}
                onClick={() => manualChange(item.id - 1)}
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
