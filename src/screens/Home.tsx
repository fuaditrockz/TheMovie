/**
 * @format
 */

import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import { TheMovieContext } from '../context';
import { textStyles } from '../constants/styles'
import { Banner, Loading, Card, Error } from '../components'

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
            data={i}
            key={index}
            isBigCard={isBigCard}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const Home = () => {
  const { isLoading, isError, movies } = useContext(TheMovieContext);

  const renderBanner = () => {
    const {
      popular
    } = movies
    if (popular) {
      return (
        <Banner
          title={popular.results[0].original_title}
          overview={`${popular.results[0].overview.substring(0, 90)}...`}
          imageUrl={`https://image.tmdb.org/t/p/w500${popular.results[0].poster_path}`}
          genres={popular.results[0].genre_ids}
        />
      )
    }
    return null
  }

  const renderSection = (sectionData:any, title:string, isBigCard:boolean) => {
    if (sectionData) {
      return <Section title={title} sectionData={sectionData.results} isBigCard={isBigCard} />
    }
    return null
  }

  console.log('FETCHED DATA', movies);

  if (isLoading) {
    return <Loading />
  } else if (isError) {
    return <Error />
  } else {
    const {
      popular,
      top_rated,
      upcoming,
      now_playing
    } = movies;
    return (
      <SafeAreaView style={styles.bgBlack}>
        <LinearGradient
          colors={['rgba(39, 38, 43, 0.9)',  'rgba(39, 38, 43, 0.7)', 'rgba(39, 38, 43, 0.5)', 'rgba(39, 38, 43, 0)']}
          style={styles.header}
        >
          <Text style={textStyles.header}>Explore</Text>
        </LinearGradient>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.bgBlack}>
          {renderBanner()}
          {renderSection(popular, 'Popular Movies', true)}
          {renderSection(top_rated, 'Top Rated Movies', false)}
          {renderSection(upcoming, 'Upcoming Movies', false)}
          {renderSection(now_playing, 'Now Playing Movies', false)}
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