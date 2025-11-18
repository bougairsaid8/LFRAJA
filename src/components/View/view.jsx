import React from "react";
import HeroSlider from "../HeroSlider/HeroSlider";
import TopInCatigorie from "../TopInCatigorie/TopInCatigorie";
import "./view.css";

export default function ViewContent({ allGenres }) {
  return (
    <div className="ViewContainer">
      <HeroSlider genres={allGenres} />
      <TopInCatigorie
        url="/movie/top_rated"
        sectionTitle={"MOVISE"}
        genres={allGenres}
      />
      <TopInCatigorie
        url="/tv/top_rated"
        sectionTitle={"TV SERIES"}
        genres={allGenres}
      />
      <TopInCatigorie
        url="/trending/all/day"
        sectionTitle={"TRENDING"}
        genres={allGenres}
      />
    </div>
  );
}
