import React, {
  useState,
  useEffect,
  createContext,
  FunctionComponent,
} from 'react';
import NetInfo from '@react-native-community/netinfo';
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
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        console.log('ONLINE')
        SETUP_DATA();
      } else {
        console.log('OFFLINE')
        getDataOffline();
      }
    })
  }, []);

  const SETUP_DATA = async () => {
    await fetchDataMovies();
    await setStorageData(dataMovies);
    return
  }

  const setStorageData = async (data) => {
    await AsyncStorage.setItem('data_offline', JSON.stringify(data));
    return
  }

  const getDataOffline = async () => {
    const data = await AsyncStorage.getItem('data_offline');
    const parsedData = await JSON.parse(data);
    if (parsedData || parsedData.popular) {
      setDataMovies(parsedData);
      setIsLoading(false);
    } else {
      setIsError(true);
    }
  }

  const fetchMovies = async (moviesType: string) => {
    const url = `https://api.themoviedb.org/3/movie/${moviesType}?api_key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status_code === 34 || data.status_code === 7) {
      throw new Error("error");
    } else {
      console.log('0')
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
        console.log('1')
        setDataMovies({
          popular: i[0],
          top_rated: i[1],
          upcoming: i[2],
          now_playing: i[3],
        });
        return dataMovies;
      })
    } catch (error) {
      setIsError(true)
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  };

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