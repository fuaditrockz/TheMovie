import React, {
  useState,
  useEffect,
  createContext,
  FunctionComponent
} from 'react';

const API_KEY = '090cfaff14e0b47124a29630da55b4a0';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

const TheMovieContext = createContext(null);

const TheMovieContextProvider: FunctionComponent = ({children}) => {
  const [popularMovies, setPopularMovies] = useState(null)

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setPopularMovies(data);
    console.log(data.results);
  };

  return (
    <TheMovieContext.Provider value={{
      popular: popularMovies,
    }}>
      {children}
    </TheMovieContext.Provider>
  );
};

export { TheMovieContextProvider, TheMovieContext };