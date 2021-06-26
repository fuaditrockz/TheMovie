import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface PosterProps {
  imageUrl: string;
}

const Poster: React.FC<PosterProps> = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <View style={{ height: 180, width: 125 }}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${imageUrl}` }}
          style={styles.image}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    position: 'relative',
    top: -90,
    right: '-35%',
    height: 100
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  }
})

export default Poster;