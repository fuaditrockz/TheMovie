import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface CardProps {
  imageUrl: string;
  title: string;
  overview: string;
  genres: Array<number>;
}

const Card: React.FC<CardProps> = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.backgroundImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 110,
    backgroundColor: '#fff',
    marginLeft: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Card;
