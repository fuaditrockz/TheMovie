import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface CardProps {
  imageUrl: string;
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
    height: 170,
    width: 115,
    backgroundColor: '#fff',
    marginLeft: 10,
    borderRadius: 2,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 2,
  },
});

export default Card;
