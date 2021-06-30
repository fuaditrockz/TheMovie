import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface BackdropImageProps {
  imageUrl: string;
}

const BackdropImage: React.FC<BackdropImageProps> = ({ imageUrl }) => {
  return (
    <View style={styles.backdropImage}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${imageUrl}`
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backdropImage: {
    backgroundColor: '#27262b',
    minHeight: 250
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
})

export default BackdropImage;