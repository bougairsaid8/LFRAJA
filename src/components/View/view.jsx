import React, { useContext } from "react";
import HeroSlider from "../HeroSlider/HeroSlider";
import TopInCatigorie from "../TopInCatigorie/TopInCatigorie";
import {AppContext} from "../../contextglobal.jsx"
import "./view.css";

export default function ViewContent() {
  const GMovie=useContext(AppContext).GenresMovie
  const GTv=useContext(AppContext).GenresTv;
  const AllGenners=[...GMovie,...GTv]
  const mode=useContext(AppContext).Mode
    
  
  return (
    <div className={`ViewContainer ${mode=='light'?'light':'dark'}`}>
      <HeroSlider genres={AllGenners} />
      <TopInCatigorie
        url="/movie/top_rated"
        sectionTitle={"MOVISE"}
        genres={GMovie}
      />
      <TopInCatigorie
        url="/tv/top_rated"
        sectionTitle={"TV SERIES"}
        genres={GTv}
      />
      <TopInCatigorie
        url="/trending/all/day"
        sectionTitle={"TRENDING"}
        genres={AllGenners}
      />
    </div>
  );
}
