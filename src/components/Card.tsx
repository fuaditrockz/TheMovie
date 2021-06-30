import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { textStyles } from '../constants/styles';

interface CardProps {
  imageUrl: string;
  isBigCard: boolean;
  isTVCard: boolean;
  data: Object;
}

const Card: React.FC<CardProps> = ({ imageUrl, isBigCard, isTVCard, data }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        if (isTVCard) {
          navigation.navigate('TVDetails', {
            ...data
          })
        } else {
          navigation.navigate('MovieDetails', {
            ...data
          })
        }
      }}
      activeOpacity={0.8}
    >
      <View style={[
        styles.container,
        {
          height: isBigCard ? 230 : 170,
          width: isBigCard ? 155 : 115,
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
        {isTVCard && (
          <View style={{
            position: 'absolute',
            backgroundColor: 'rgba(81, 96, 255, 0.9)',
            paddingHorizontal: 10
          }}>
            <Text style={[textStyles.miniBold]}>
              TV Shows
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default Card;
