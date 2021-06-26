import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { textStyles } from '../constants/styles';
import { Loading } from '../components'

const API_KEY = '090cfaff14e0b47124a29630da55b4a0';
interface MovieDetailsProps {
  route: Object;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ route }) => {
  const navigation = useNavigation()
  const { params } = route

  const [movieData, setMovieData] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchMovieData = async () => {
    setLoading(true);
    const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}`);
    const data = await response.json();
    setMovieData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchMovieData();
  }, [])

  console.log('GET PARAMS', params);

  if (loading) {
    return <Loading />
  }
  return (
    <SafeAreaView style={styles.bgBlack}>
      <LinearGradient
        colors={['rgba(39, 38, 43, 0.9)',  'rgba(39, 38, 43, 0.7)', 'rgba(39, 38, 43, 0.5)', 'rgba(39, 38, 43, 0)']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="close"
            size={25}
            color="#fff"
            style={{ position: 'relative', top: 12, marginRight: 10 }}
          />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView style={styles.bgBlack}>
        <View style={[styles.bgBlack, { minHeight: 250 }]}>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movieData.backdrop_path}` }} style={styles.backgroundImage} />
        </View>
        <View style={{
          position: 'relative',
          top: -90,
          right: '-35%',
          height: 100
        }}>
          <View style={{ height: 180, width: 125 }}>
            <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movieData.poster_path}` }} style={styles.backgroundImage} />
          </View>
        </View>
        <View style={[styles.bgBlack, { minHeight: 600, paddingHorizontal: 10 }]}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            paddingVertical: 10,
          }}>
            <View style={{
              width: '100%',
            }}>
              <Text style={[
                textStyles.movie_title,
                {
                  textAlign: 'center',
                  marginBottom: -10
                }
              ]}>
                {movieData.original_title}
              </Text>

              <View style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{
                  fontFamily: 'SF-Pro-Display-RegularItalic',
                  color: '#e3e3e3',
                  marginBottom: 10
                }}>
                  {movieData.tagline}
                </Text>
              </View>

              <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
                {movieData.genres.map((i, index) => (
                  <View
                    style={{
                      backgroundColor: '#00ff00',
                      marginHorizontal: 2.5,
                      paddingHorizontal: 10,
                      paddingBottom: 1,
                      borderRadius: 5
                    }}
                    key={index}
                  >
                    <Text style={{
                      color: '#000',
                      fontFamily: 'SF-Pro-Display-Bold',
                      fontSize: 10
                    }}>
                      {i.name}
                    </Text>
                  </View>
                ))}
              </View>
              
            </View>
          </View>
          <Text style={textStyles.normal}>{movieData.overview}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27262b',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgBlack: {
    backgroundColor: '#27262b',
  },
  header: {
    paddingTop: 0,
    paddingBottom: 50,
    paddingHorizontal: 10,
    position: 'absolute',
    top: 49.6,
    left: 0,
    zIndex: 99,
    width: '100%',
    flexDirection: 'row'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
})

export default MovieDetails;