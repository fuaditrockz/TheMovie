import React, {
  useState,
  useEffect,
  createContext,
  FunctionComponent
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = '090cfaff14e0b47124a29630da55b4a0';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

const TheMovieContext = createContext(null);

const TheMovieContextProvider: FunctionComponent = ({children}) => {
  const [dataMovies, setDataMovies] = useState({
    popular: null,
    top_rated: null,
    upcoming: null,
    now_playing: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchDataMovies();
  }, []);

  const fetchMovies = async (moviesType: string) => {
    const url = `https://api.themoviedb.org/3/movie/${moviesType}?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status_code === 34 || data.status_code === 7) {
      throw new Error("error");
    } else {
      console.log('XXXXXXX')
      return data;
    }
  }

  const fetchDataMovies = async () => {
    setIsLoading(true);
    try {
      Promise.all([
        fetchMovies('popular'),
        fetchMovies('top_rated'),
        fetchMovies('upcoming'),
        fetchMovies('now_playing')
      ]).then((i:Array<object>) => {
        setDataMovies({
          popular: i[0],
          top_rated: i[1],
          upcoming: i[2],
          now_playing: i[3],
        })
      })
    } catch (error) {
      setIsError(true)
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  console.log('RENDER', dataMovies)
  return (
    <TheMovieContext.Provider value={{
      isError,
      isLoading,
      movies: dataMovies,
    }}>
      {children}
    </TheMovieContext.Provider>
  );
};

export { TheMovieContextProvider, TheMovieContext };