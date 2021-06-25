import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CardProps {
  imageUrl: string;
  isBigCard: boolean;
}

const Card: React.FC<CardProps> = ({ imageUrl, isBigCard }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('MovieDetails')}>
      <View style={[
        styles.container,
        {
          height: isBigCard ? 230 : 170,
          width: isBigCard ? 150 : 115,
        }
      ]}>
        <Image source={{ uri: imageUrl }} style={styles.backgroundImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
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
