/**
 * @format
 */

import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Animated,
  Text,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { TheMovieContext } from '../context';
import { textStyles } from '../constants/styles'
import { Banner, Loading, Card } from '../components'

interface SectionProps {
  sectionData: Array<string>;
  title: string;
  isBigCard: boolean;
}

const Section: React.FC<SectionProps> = ({ sectionData, title, isBigCard }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.title}>
        <Text style={textStyles.section_title}>{title}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {sectionData.map((i, index) => (
          <Card
            imageUrl={`https://image.tmdb.org/t/p/w500${i.poster_path}`}
            key={index}
            isBigCard={isBigCard}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const Home = () => {
  const { isLoading, movies } = useContext(TheMovieContext);

  if (isLoading) {
    return <Loading />
  } else {
    return (
      <SafeAreaView style={styles.bgBlack}>
        <LinearGradient
          colors={['rgba(39, 38, 43, 0.9)',  'rgba(39, 38, 43, 0.7)', 'rgba(39, 38, 43, 0.5)', 'rgba(39, 38, 43, 0)']}
          style={styles.header}
        >
          <Text style={textStyles.header}>Explore</Text>
        </LinearGradient>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.bgBlack}>
          <Banner
            title={movies.popular.results[0].original_title}
            overview={`${movies.popular.results[0].overview.substring(0, 90)}...`}
            imageUrl={`https://image.tmdb.org/t/p/w500${movies.popular.results[0].poster_path}`}
            genres={movies.popular.results[0].genre_ids}
          />
          <Section title="Popular Movies" sectionData={movies.popular.results} isBigCard />
          <Section title="Top Rated Movies" sectionData={movies.top_rated.results} isBigCard={false} />
          <Section title="Upcoming Movies" sectionData={movies.upcoming.results} isBigCard={false} />
          <Section title="Now Playing Movies" sectionData={movies.now_playing.results} isBigCard={false} />
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  bgBlack: {
    backgroundColor: '#27262b',
  },
  header: {
    paddingTop: 0,
    paddingBottom: 50,
    paddingHorizontal: 10,
    position: 'absolute',
    top: 49.6,
    left: 0,
    zIndex: 99,
    width: '100%',
  },
  title: {
    paddingHorizontal: 10,
    paddingBottom: 0
  },
})

export default Home;