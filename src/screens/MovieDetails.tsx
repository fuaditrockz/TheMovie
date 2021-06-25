import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { textStyles } from '../constants/styles';

const MovieDetails: React.FC = () => {
  return (
    <SafeAreaView style={styles.bgBlack}>
      <LinearGradient
        colors={['rgba(39, 38, 43, 0.9)',  'rgba(39, 38, 43, 0.7)', 'rgba(39, 38, 43, 0.5)', 'rgba(39, 38, 43, 0)']}
        style={styles.header}
      >
        <Text style={textStyles.movie_title}>Explore</Text>
      </LinearGradient>
      <ScrollView style={styles.bgBlack}>
        <View style={[styles.bgBlack, { minHeight: 500 }]}>
          <Text>Hello World</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

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
})

export default MovieDetails;