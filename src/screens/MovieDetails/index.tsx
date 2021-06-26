import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Loading } from '../../components';

import Banner from './Banner';
import BackdropImage from './BackdropImage';
import Poster from './Poster';
import MainInformation from './MainInformation';

const API_KEY = '090cfaff14e0b47124a29630da55b4a0';

interface MovieDetailsProps {
  route: Object;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ route }) => {
  const navigation = useNavigation();
  const { params } = route;

  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieData = async () => {
    setLoading(true);
    const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}`);
    const data = await response.json();
    setMovieData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchMovieData();
  }, [])

  console.log('GET PARAMS', params);

  if (loading) {
    return <Loading />
  }
  return (
    <SafeAreaView style={styles.bgBlack}>
      <Banner goBack={() => navigation.goBack()} />
      <ScrollView style={styles.bgBlack}>
        <BackdropImage imageUrl={movieData.backdrop_path} />
        <Poster imageUrl={movieData.poster_path} />
        <MainInformation data={movieData} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bgBlack: {
    backgroundColor: '#27262b',
  },
})

export default MovieDetails;