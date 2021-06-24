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

import { Banner, Loading } from '../components'

const Home = () => {
  const { popular } = useContext(TheMovieContext);

  if (!popular) {
    return <Loading />
  } else {
    return (
      <SafeAreaView style={styles.bgBlack}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.bgBlack}>
          <LinearGradient
            colors={['rgba(39, 38, 43, 0.9)',  'rgba(39, 38, 43, 0.7)', 'rgba(39, 38, 43, 0.5)', 'rgba(39, 38, 43, 0)']}
            style={styles.header}
          >
            <Text style={styles.headerText}>Explore</Text>
          </LinearGradient>
          {popular && <Banner imageUrl={`https://image.tmdb.org/t/p/w500${popular.results[0].poster_path}`} />}
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
    paddingBottom: 30,
    paddingHorizontal: 10,
    position: 'absolute',
    top: 49.6,
    left: 0,
    zIndex: 99,
    width: '100%',
  },
  headerText: {
    fontSize: 35,
    color: '#f2f2f2',
    fontFamily: 'SF-Pro-Display-Black'
  },
  normalText: {
    fontSize: 14,
    fontFamily: 'SF-Pro-Display-Medium',
    color: '#fff'
  }
})

export default Home;