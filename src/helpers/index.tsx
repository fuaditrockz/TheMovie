import { useState, useEffect } from 'react';

const API_KEY = '090cfaff14e0b47124a29630da55b4a0';

const useGetGenreName = (genreID) => {
  const [genre, setGenre] = useState(null);

  const fetchGenreData = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/${genreID}?api_key=${API_KEY}`);
    const data = await response.json();
    setGenre(data)
  }

  useEffect(() => {
    fetchGenreData();
  }, []);

  return genre;
};

export { useGetGenreName };