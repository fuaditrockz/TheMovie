import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface BigCardProps {
  imageUrl: string;
}

const BigCard: React.FC<BigCardProps> = ({ imageUrl }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.backgroundImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 230,
    width: 150,
    backgroundColor: '#fff',
    marginLeft: 10,
    borderRadius: 4,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    borderRadius: 4,
  },
});

export default BigCard;
