import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import { textStyles } from '../constants/styles'

const Banner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
      <Text style={textStyles.normal}>
        Preparing the data...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#27262b'
  }
})

export default Banner;