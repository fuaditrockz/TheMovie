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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TheMovieContext } from '../context';
import { textStyles } from '../constants/styles'
import { Banner, Loading, Card } from '../components'

interface SectionProps {
  sectionData: Array<string>;
  title: string;
}

const Section: React.FC<SectionProps> = ({ sectionData, title }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.title}>
        <Text style={textStyles.section_title}>{title}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {sectionData.map((i, index) => (
          <Card imageUrl={`https://image.tmdb.org/t/p/w500${i.poster_path}`} key={index} />
        ))}
      </ScrollView>
    </View>
  );
}

const Home = () => {
  const { popular } = useContext(TheMovieContext);

  if (!popular) {
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
            title={popular.results[0].original_title}
            overview={`${popular.results[0].overview.substring(0, 90)}...`}
            imageUrl={`https://image.tmdb.org/t/p/w500${popular.results[0].poster_path}`}
            genres={popular.results[0].genre_ids}
          />
          <Section title="Popular Movies" sectionData={popular.results} />
          <Section title="Popular Movies" sectionData={popular.results} />          
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
    /* backgroundColor: '#27262b', */
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