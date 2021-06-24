import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface BannerProps {
  imageUrl: string;
}

const Banner: React.FC<BannerProps> = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.backgroundImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 600,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  }
})

export default Banner;