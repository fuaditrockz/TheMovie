import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CardProps {
  imageUrl: string;
  isBigCard: boolean;
  data: Object;
}

const Card: React.FC<CardProps> = ({ imageUrl, isBigCard, data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetails', {
        ...data
      })}
      activeOpacity={0.8}
    >
      <View style={[
        styles.container,
        {
          height: isBigCard ? 230 : 170,
          width: isBigCard ? 150 : 115,
          borderRadius: isBigCard ? 5 : 2,
        }
      ]}>
        <Image
          source={{ uri: imageUrl }}
          style={[
            styles.backgroundImage,
            {
              borderRadius: isBigCard ? 5 : 2,
            }
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginLeft: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Card;
