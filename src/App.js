import "./App.css";
import MovieCard from "./MovieCard";
import pic from "./search.svg";
import { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [serachtext, setSearchtext] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async (value) => {
    const resp = await fetch(
      "http://www.omdbapi.com?apikey=e4bded8b&s=" + `${value}`
    );
    const data = await resp.json();
    console.log(data.Search);
    setMovies(data.Search);
  };

  useEffect(() => {
    fetchData("Movie");
    setIsLoading(false);
  }, []);

  function handleClick() {
    console.log(serachtext);
    fetchData(serachtext);
    console.log(movies);
  }

  return (
    <div className="App">
      <div className="header">
        <h1>MOVIELAND</h1>
      </div>
      <div className="searchbar">
        <div className="search">
          <input
            type="text"
            value={serachtext}
            onChange={(e) => setSearchtext(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Search</button>
        {
          //<image src={pic} alt="search logo" onClick={handleClick}/>
        }
      </div>
      <div className="movies">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          movies.map((movie, index) => <MovieCard key={index} movie={movie} />)
        )}
      </div>
    </div>
  );
}

export default App;
