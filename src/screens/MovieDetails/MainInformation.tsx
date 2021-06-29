import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView
} from 'react-native';
import moment from 'moment';
import Octicon from 'react-native-vector-icons/Octicons';

import { textStyles } from '../../constants/styles';

interface MainInformationProps {
  data: Object;
}

interface InfoProps {
  children: Object;
  title: string;
  isUsingBox: boolean;
}

const Dot = () => {
  return (
    <Octicon
      name="primitive-dot"
      size={10}
      color="#fff"
      style={{ position: 'relative', top: 0 }}
    />
  )
}

const Info: React.FC<InfoProps>= ({
  title,
  children,
  isUsingBox,
}) => {
  return (
    <View style={{
      marginTop: 10,
      flex: 1,
      alignItems: 'center',
    }}> 
      <Text style={textStyles.mini}>{title}</Text>
      <View style={{
        backgroundColor: isUsingBox ? '#000' : null,
        paddingHorizontal: isUsingBox ? 10 : 0,
        maxWidth: 90,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 5
      }}>
        {children}
      </View>
    </View>
  )
}

const MainInformation: React.FC<MainInformationProps>= ({ data }) => {

  const renderTitle = () => {
    return (
      <Text style={[textStyles.movie_title, styles.title]}>
        {data.original_title + `(` + moment(data.release_date).format("yyyy") + `)`}
      </Text>
    );
  }

  const renderTagLine = () => {
    return (
      <View style={styles.centerized}>
        <Text style={styles.taglineText}>
          {data.tagline ? data.tagline : '-'}
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

  const renderReleaseDateAndDuration = () => {
    const releaseDate = moment(data.release_date).format("MMM Do YY");
    const duration = Math.floor(data.runtime / 60) + 'h' + ' ' + (data.runtime - 60) + 'm'
    return (
      <View style={[styles.centerized, styles.flexDirectionRow, { marginBottom: 10 }]}>
        <Text style={[textStyles.normal, { marginHorizontal: 10 }]}>
          {releaseDate}
        </Text>
        <Dot />
        <Text style={[textStyles.normal, { marginHorizontal: 10 }]}>
          {duration}
        </Text>
        <Dot />
        <View style={styles.rating}>
          <Text style={textStyles.mini}>{data.adult ? 'NC-17' : 'PG'}</Text>
        </View>
      </View>
    )
  }

  const renderOtherInfo = () => {
    const revenue = new Intl.NumberFormat('en-GB', {
      notation: "compact",
      compactDisplay: "short"
    }).format(data.revenue);

    return (
      <View style={{
        borderTopColor: '#f2f2f2',
        borderTopWidth: 0.8,
        marginTop: 20,
        flexDirection: 'row',
      }}>
        <Info title='Status' isUsingBox>
          <Text style={textStyles.normalBold}>{data.status.toUpperCase()}</Text>
        </Info>
        <Info title='Original Language' isUsingBox>
          <Text style={textStyles.normalBold}>{data.original_language.toUpperCase()}</Text>
        </Info>
        <Info title='Revenue'>
          <Text style={textStyles.normal}>{
            data.revenue === 0 ? '-' : (
              '$' + revenue
            )
          }</Text>
        </Info>
      </View>
    )
  }

  const renderOverview = () => {

    return (
      <View style={{ marginBottom: 10 }}>
        <Text style={textStyles.section_title}>
          Overview
        </Text>
        <Text style={textStyles.normal}>{data.overview}</Text>
      </View>
    )
  }

  const renderProductionCompany = (i:Object) => {
    console.log(i)
    return (
      <View style={{
        marginHorizontal: 10,
        marginVertical: 10,
        maxWidth: 90,
        flex: 1
      }}>
        {i.item.logo_path ? (
          <View style={{
            paddingHorizontal: 5, paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            height: 60,
            width: 'auto',
            borderRadius: 10,
          }}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${i.item.logo_path}` }}
                style={{
                  width: 60,
                  height: 30,
                  resizeMode: 'contain'
                }}
            />
          </View>
        ) : (
          <View style={{
            height: 50, justifyContent: 'center', alignItems: 'center'
          }}>
            <Text style={textStyles.mini}>No Image</Text>
          </View>
        )}
        <Text style={[textStyles.production_company, { textAlign: 'center' }]}>{i.item.name}</Text>
      </View>
    )
  }

  const renderProductionCompanies = () => {
    const { production_companies } = data
    return (
      <SafeAreaView>
        <Text style={textStyles.section_title}>
          Production Companies
        </Text>
        <View>
          <FlatList
            numColumns={4}
            data={production_companies}
            keyExtractor={i => i.id}
            renderItem={renderProductionCompany}
          />
        </View>
      </SafeAreaView>
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
          {renderReleaseDateAndDuration()}
          {renderTags()}
          {renderOtherInfo()}
        </View>
      </View>
      {renderOverview()}
      {renderProductionCompanies()}
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
  centerized: {
    display: 'flex',
    alignItems: 'center'
  },
  flexDirectionRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  taglineText: {
    fontFamily: 'SF-Pro-Display-RegularItalic',
    color: '#e3e3e3'
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
  rating: {
    marginHorizontal: 10,
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical: 0.5, paddingHorizontal: 6,
    borderRadius: 5
  },
  tagText: {
    color: '#000',
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 10
  }
})

export default MainInformation