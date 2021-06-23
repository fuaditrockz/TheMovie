/**
 * @format
 */

import React, { useState, useEffect, useRef } from 'react';
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

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.bgBlack}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Explore</Text>
        </View>
        <View style={styles.bgBlack}>
          <Text style={styles.normalText}>Explore</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bgBlack: {
    backgroundColor: '#27262b',
  },
  header: {
    backgroundColor: '#27262b',
    paddingVertical: 10,
    paddingHorizontal: 10,
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