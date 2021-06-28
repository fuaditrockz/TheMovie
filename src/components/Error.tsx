import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { textStyles } from '../constants/styles'

const Error = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/warning.png')}
        style={styles.image}
      />
      <Text style={[textStyles.section_title, styles.text]}>
        Oopsie! Something's missing...
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    backgroundColor: '#27262b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: 100, height: 100 },
  text:  { textAlign: 'center' }
})

export default Error;