import React from "react";
import { FaPlay, FaHeart, FaUsers } from "react-icons/fa";
import "./DetailsMovie.css";
function DetailsMovie({mode}) {
  // This would typically be passed as a prop, e.g., function DetailsMovie({ movieData })
  const movieData = {
    backdrop_path: "/5h2EsPKNDdB3MAtOk9MB9Ycg9Rz.jpg",
    title: "Zootopia 2",
    release_date: "2025-11-26",
    vote_average: 7.7,
    runtime: 107,
    genres: [
      { id: 16, name: "Animation" },
      { id: 35, name: "Comedy" },
    ],
    overview:
      "After cracking the biggest case in Zootopia's history, rookie cops Judy Hopps and Nick Wilde find themselves on the twisting trail of a great mystery...",
    poster_path: "/oJ7g2CifqpStmoYQyaLQgEU32qO.jpg",
  };

  const CastcrewData =  {
    "cast": [
    {
      "adult": false,
      "gender": 1,
      "id": 417,
      "known_for_department": "Acting",
      "name": "Ginnifer Goodwin",
      "original_name": "Ginnifer Goodwin",
      "popularity": 8.2268,
      "profile_path": "/n8XOnjgyfYvqRUDcnkAckRqSaNN.jpg",
      "cast_id": 1,
      "character": "Judy Hopps (voice)",
      "credit_id": "63e49b7990fca3007b04f19b",
      "order": 0
    },
    {
      "adult": false,
      "gender": 2,
      "id": 23532,
      "known_for_department": "Acting",
      "name": "Jason Bateman",
      "original_name": "Jason Bateman",
      "popularity": 6.9598,
      "profile_path": "/8e6mt0vGjPo6eW52gqRuXy5YnfN.jpg",
      "cast_id": 16,
      "character": "Nick Wilde (voice)",
      "credit_id": "6448ae740f21c6049827fd5c",
      "order": 1
    },
    {
      "adult": false,
      "gender": 2,
      "id": 690,
      "known_for_department": "Acting",
      "name": "Ke Huy Quan",
      "original_name": "Ke Huy Quan",
      "popularity": 4.4954,
      "profile_path": "/iestHyn7PLuVowj5Jaa1SGPboQ4.jpg",
      "cast_id": 39,
      "character": "Gary De'Snake (voice)",
      "credit_id": "6835e6bfe4057d9ee0037edc",
      "order": 2
    },
    {
      "adult": false,
      "gender": 1,
      "id": 1183672,
      "known_for_department": "Acting",
      "name": "Fortune Feimster",
      "original_name": "Fortune Feimster",
      "popularity": 1.6268,
      "profile_path": "/aCV6S7Tuh9iUmF9on6EwaXC3rCI.jpg",
      "cast_id": 45,
      "character": "Nibbles Maplestick (voice)",
      "credit_id": "6835e72b6d7078c861414b14",
      "order": 3
    },
    {
      "adult": false,
      "gender": 2,
      "id": 62861,
      "known_for_department": "Acting",
      "name": "Andy Samberg",
      "original_name": "Andy Samberg",
      "popularity": 6.3683,
      "profile_path": "/jMXU5oG3i93SH1yhkpbBGskFiJl.jpg",
      "cast_id": 68,
      "character": "Pawbert Lynxley (voice)",
      "credit_id": "68c86a79a13549cb19c905cd",
      "order": 4
    },
    {
      "adult": false,
      "gender": 2,
      "id": 11064,
      "known_for_department": "Acting",
      "name": "David Strathairn",
      "original_name": "David Strathairn",
      "popularity": 3.4981,
      "profile_path": "/fhkvTcrCDPTAclTnE7sqQS1NZKq.jpg",
      "cast_id": 69,
      "character": "Milton Lynxley (voice)",
      "credit_id": "68c86abb6afda362c186892f",
      "order": 5
    }],
    "crew": [
    {
      "adult": false,
      "gender": 2,
      "id": 1318201,
      "known_for_department": "Writing",
      "name": "Jared Bush",
      "original_name": "Jared Bush",
      "popularity": 2.4134,
      "profile_path": "/50XtrC5NMcqiYMXNmuNVY5tUl34.jpg",
      "credit_id": "66b7237688732302e6261d2a",
      "department": "Directing",
      "job": "Director"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 1318201,
      "known_for_department": "Writing",
      "name": "Jared Bush",
      "original_name": "Jared Bush",
      "popularity": 2.4134,
      "profile_path": "/50XtrC5NMcqiYMXNmuNVY5tUl34.jpg",
      "credit_id": "66b7237b40901d3fc826206b",
      "department": "Writing",
      "job": "Writer"
    },
    {
      "adult": false,
      "gender": 1,
      "id": 1999218,
      "known_for_department": "Production",
      "name": "Yvett Merino",
      "original_name": "Yvett Merino",
      "popularity": 0.2911,
      "profile_path": "/lWDGq9RsYDayXIqdyXz1yHzo2tU.jpg",
      "credit_id": "66b723807d739ff29e9edafd",
      "department": "Production",
      "job": "Producer"
    },
    {
      "adult": false,
      "gender": 2,
      "id": 76595,
      "known_for_department": "Directing",
      "name": "Byron Howard",
      "original_name": "Byron Howard",
      "popularity": 3.8283,
      "profile_path": "/ePJXkxrD44nM0VB7Xx9Q4ityzfT.jpg",
      "credit_id": "66eda00fbeb947a007fe1536",
      "department": "Directing",
      "job": "Director"
    }]
  }

  const backdropStyle = {
    "--backdrop-url": `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})`,
  };

  return (
    <div className={`ViewContainer ${mode == "light" ? "light" : "dark"}`}>
    <div className={`detailsMovie ${mode == "light" ? "light" : "dark"}`} style={backdropStyle}>
      <div className="detailsMovie_poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          alt={movieData.title}
        />
        <div className={`detailsMovie_info ${mode == "light" ? "light" : "dark"}`}>
          <h1>{movieData.title}</h1>
          <ul className="moreInfo">
            <li>{movieData.release_date.slice(0, 4)}</li>
            <li>| {movieData.vote_average.toFixed(1)}/10</li>
            <li>
              | {parseInt(movieData.runtime / 60)}h {movieData.runtime % 60}m
            </li>
            <li>
              |{" "}
              {movieData.genres
                .map((genre) => genre.name)
                .slice(0, 2)
                .join(", ")}
            </li>
          </ul>
          <p className="detailsMovie_overview">{movieData.overview}</p>
          <div className="detailsMovie_actions">
            <button className="detailsMovie_watch">
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
    <div className={`Castcrew ${mode == "light" ? "light" : "dark"}`}>
        <h2 className="Castcrew_title"> <FaUsers /> Cast&Crew</h2>
      <div className="Castcrew_list">
        {[...CastcrewData.cast.slice(0,4), ...CastcrewData.crew.slice(0,2)].map((item) => (
          <div className={`Castcrew_item ${mode == "light" ? "light" : "dark"}`} key={item.id}>
            <img src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.character?item.character.split("(")[0]:item.job}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default DetailsMovie;
