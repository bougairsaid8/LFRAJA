import React from 'react'
import MovieCard from '../MovieCard/MovieCard'
import './DiscoverView.css'
const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "tr", name: "Turkish" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ar", name: "Arabic" }
];
function DiscoverView({mode,GMovie}) {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1950 + 1 },
    (_, i) => currentYear - i
  );

  return (
    <div className={`ViewContainer ${mode=='light'?'light':'dark'}`}>
      <div className={`filter-search ${mode=='light'?'light':'dark'}`} >
        <div className={`search ${mode=='light'?'light':'dark'}`}>
          <input type="text" name="search" placeholder="Find by title..."  />
        </div>

        <div className={`filter ${mode=='light'?'light':'dark'}`}>
          {/* select for Genres */}
          <div className={`Genre ${mode=='light'?'light':'dark'}`}>
            <p>Genre</p>
            <select>
              <option value="">All Genres</option>
              {GMovie.map(G=>(<option key={G.id} value={G.id}>{G.name}</option>))}
            </select>
          </div>

          {/* select for Years */} 
          <div className={`Year ${mode=='light'?'light':'dark'}`}>
            <p>Year</p>
            <select>
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* select for Ratings */}

          <div className={`Rating ${mode=='light'?'light':'dark'}`}>
            <p>Rating</p>
            <select>
              <option value="">All Ratings</option>
              { Array.from({length:9},(_,index)=><option key={index} value={9-index}>+{9-index}</option>)}
            </select>
          </div>

          {/* select for Countrys */}
          <div className={`Country ${mode=='light'?'light':'dark'}`}>
            <p>Country</p>
            <select>
              <option value="">All Countrys</option>
              {languages.map(item=><option value={item.code}>{item.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Affichage */}
      <div className={`content ${mode=='light'?'light':'dark'}`}>

      </div>
    </div>
  )
}

export default DiscoverView