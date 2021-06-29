/**
 * @format
 */

import React, { useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';

import { TheMovieContext } from '../../context';
import { textStyles } from '../../constants/styles';
import { Loading, Card, Error } from '../../components';
import Banner from './Banner';

interface SectionProps {
  sectionData: Array<string>;
  title: string;
  isBigCard: boolean;
  isOnline: boolean;
}

const Section: React.FC<SectionProps> = ({ sectionData, title, isBigCard, isOnline }) => {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={styles.title}>
        <Text style={textStyles.section_title}>{title}</Text>
      </View>
      {isOnline() ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sectionData.map((i, index) => (
            <Card
              imageUrl={`https://image.tmdb.org/t/p/w500${i.poster_path}`}
              data={i}
              key={index}
              isBigCard={isBigCard}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={{
          minHeight: 110,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={textStyles.normal}>
            No content, please connect to the internet
          </Text>
        </View>
      )}
    </View>
  );
}

const Home = () => {
  const { isLoading, isError, movies } = useContext(TheMovieContext);
  const statusBarHeight = StatusBar.currentHeight

  const isOnline = () => {
    let online;
    NetInfo.addEventListener(state => {
      online = state.isConnected
    });
    return online;
  };

  const renderBanner = () => {
    const {
      popular
    } = movies
     
    if (popular) {
      return (
        <Banner
          title={popular.results[0].original_title}
          overview={`${popular.results[0].overview.substring(0, 90)}...`}
          imageUrl={`https://image.tmdb.org/t/p/w500${popular.results[0].poster_path}`}
          genres={popular.results[0].genre_ids}
        />
      )  
    }
    return null
  }

  const renderSection = (sectionData:any, title:string, isBigCard:boolean) => {
    if (sectionData) {
      return <Section title={title} sectionData={sectionData.results} isBigCard={isBigCard} isOnline={isOnline} />
    }
    return null
  }

  console.log('FETCHED DATA', movies);

  if (isLoading) {
    return <Loading />
  } else if (isError || isOnline() === false) {
    return <Error />
  } else {
    const {
      popular,
      top_rated,
      upcoming,
      now_playing
    } = movies;
    return (
      <SafeAreaView style={styles.bgBlack}>
        <LinearGradient
          colors={['rgba(39, 38, 43, 0.9)',  'rgba(39, 38, 43, 0.7)', 'rgba(39, 38, 43, 0.5)', 'rgba(39, 38, 43, 0)']}
          style={[
            styles.header,
            {
              top: statusBarHeight
            }
          ]}
        >
          <Text style={textStyles.header}>Explore</Text>
        </LinearGradient>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.bgBlack}>
          {renderBanner()}
          {renderSection(popular, 'Popular Movies', true)}
          {renderSection(top_rated, 'Top Rated Movies', false)}
          {renderSection(upcoming, 'Upcoming Movies', false)}
          {renderSection(now_playing, 'Now Playing Movies', false)}
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  bgBlack: {
    backgroundColor: '#27262b',
  },
  header: {
    paddingTop: 0,
    paddingBottom: 50,
    paddingHorizontal: 10,
    position: 'absolute',
    left: 0,
    zIndex: 99,
    width: '100%',
    height: 100
  },
  title: {
    paddingHorizontal: 10,
    paddingBottom: 0
  },
})

export default Home;