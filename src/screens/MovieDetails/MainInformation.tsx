import React from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';

import { textStyles } from '../../constants/styles';

interface MainInformationProps {
  data: Object;
}

const MainInformation: React.FC<MainInformationProps>= ({ data }) => {

  const renderTitle = () => {
    return (
      <Text style={[textStyles.movie_title, styles.title]}>
        {data.original_title}
      </Text>
    );
  }

  const renderTagLine = () => {
    return (
      <View style={styles.taglineContainer}>
        <Text style={styles.taglineText}>
          {data.tagline}
        </Text>
      </View>
    );
  }

  const renderTags = () => {
    return (
      <View style={styles.tagsContainer}>
        {data.genres.map((i, index) => (
          <View style={styles.tag} key={index}>
            <Text style={styles.tagText}>
              {i.name}
            </Text>
          </View>
        ))}
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 10,
      }}>
        <View style={{
          width: '100%',
        }}>
          {renderTitle()}
          {renderTagLine()}
          {renderTags()}
        </View>
      </View>
      <Text style={textStyles.normal}>{data.overview}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#27262b',
    minHeight: 600, paddingHorizontal: 10
  },
  title: {
    textAlign: 'center',
    marginBottom: -10
  },
  taglineContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  taglineText: {
    fontFamily: 'SF-Pro-Display-RegularItalic',
    color: '#e3e3e3',
    marginBottom: 10
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tag: {
    backgroundColor: '#00ff00',
    marginHorizontal: 2.5,
    paddingHorizontal: 10,
    paddingBottom: 1,
    borderRadius: 5
  },
  tagText: {
    color: '#000',
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 10
  }
})

export default MainInformation