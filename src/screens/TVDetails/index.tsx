import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Loading, Banner, BackdropImage, Poster } from '../../components';

import TVDetailInformation from './TVDetailInformation'

const API_KEY = '090cfaff14e0b47124a29630da55b4a0';

interface TVDetailsProp {
  route: Object;
}

const TVDetails: React.FC<TVDetailsProp> = ({ route }) => {
  const navigation = useNavigation();
  const { params } = route;

  const [tvData, setTVData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTVData = async () => {
    setLoading(true);
    const response = await fetch(`https://api.themoviedb.org/3/tv/${params.id}?api_key=${API_KEY}`);
    const data = await response.json();
    setTVData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchTVData();
  }, [])

  console.log('GET PARAMS', params);

  if (loading) {
    return <Loading />
  }
  return (
    <SafeAreaView style={styles.bgBlack}>
      <Banner goBack={() => navigation.goBack()} isMovie={false} />
      <ScrollView style={styles.container}>
        <BackdropImage imageUrl={tvData.backdrop_path} />
        <Poster imageUrl={tvData.poster_path} />
        <TVDetailInformation data={tvData} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgBlack: {
    backgroundColor: '#27262b',
  },
  container: {
    backgroundColor: '#27262b',
    minHeight: 900
  }
})

export default TVDetails;