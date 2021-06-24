import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Octicon from 'react-native-vector-icons/Octicons';

import { textStyles } from '../constants/styles'
interface BannerProps {
  imageUrl: string;
  title: string;
  overview: string;
  genres: Array<number>;
}

const API_KEY = '090cfaff14e0b47124a29630da55b4a0';

const Banner: React.FC<BannerProps> = ({ imageUrl, title, overview, genres }) => {
  const [allGenres, setAllGenres] = useState(null)

  const getName = async () => {
    const fetchedNames = await Promise.all(genres.map(async i => {
      const response = await fetch(`https://api.themoviedb.org/3/genre/${i}?api_key=${API_KEY}`);
      const data = await response.json();
      return data
    })).then(i => {
      console.log('1', i)
      return i
    })

    setAllGenres(fetchedNames)
    return
  }

  useEffect(() => {
    getName();
    return;
  }, [])

  const renderGenres = () => {
    const data = allGenres
    console.log('render', data)
    return data.map((i, index) => {
      console.log(i.name)
      return (
        <View key={index} style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          <Text style={[textStyles.genre, { textAlign: 'center', marginHorizontal: 5 }]}>
            {i.name}
          </Text>
          {genres.length !== index + 1 && <Octicon
            name="primitive-dot"
            size={10}
            color="#00ff00"
            style={{
              position: 'relative',
              top: 10,
            }}
          />}
        </View>
      )
    })
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.backgroundImage} />
      <LinearGradient
        colors={['rgba(39, 38, 43, 0)',  'rgba(39, 38, 43, 0.3)', 'rgba(39, 38, 43, 0.8)', 'rgba(39, 38, 43, 1)']}
        style={styles.footer}
      >
        <View style={styles.footerTitle}>
          <Text style={[textStyles.movie_title, { textAlign: 'center' }]}>
            {title}
          </Text>
        </View>
        <View>
          <Text style={[textStyles.normal, { textAlign: 'center' }]}>
            {overview}
          </Text>
        </View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
          {allGenres && renderGenres()}
        </View>
      </LinearGradient>
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
  },
  footer: {
    paddingBottom: 30,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 99,
    width: '100%',
    minHeight: 300,
    flex: 1,
    justifyContent: 'flex-end',
  },
  footerTitle: {
    alignItems: 'center',
    width: '100%',
    marginBottom: -10
  }
})

export default Banner;