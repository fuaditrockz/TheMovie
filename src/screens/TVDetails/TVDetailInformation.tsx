import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView
} from 'react-native';
import moment from 'moment';
import Octicon from 'react-native-vector-icons/Octicons';

import { textStyles } from '../../constants/styles';


interface TVDetailInformationProps {
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
    <View style={styles.infoContainer}> 
      <Text style={textStyles.mini}>{title}</Text>
      <View style={[
        styles.infoChildren,
        {
          backgroundColor: isUsingBox ? '#000' : null,
          paddingHorizontal: isUsingBox ? 10 : 0,
          alignItems: 'center',
          justifyContent: 'center',
          height: 40,
        }
      ]}>
        {children}
      </View>
    </View>
  )
}

const TVDetailInformation: React.FC<TVDetailInformationProps>= ({ data }) => {

  const renderTitle = () => {
    return (
      <Text style={[textStyles.movie_title, styles.title]}>
        {data.name + `(` + moment(data.first_air_date).format("yyyy") + `)`}
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
    const firstAirDate = moment(data.first_air_date).format("MMM Do YY");
    const duration = data.episode_run_time + 'mins'
    const voteAverage = data.vote_average;
    const episodes = data.number_of_episodes;
    const seasons = data.seasons;
    
    return (
      <View style={[styles.centerized, styles.flexDirectionRow, { marginBottom: 10 }]}>
        <Text style={[textStyles.normal, { marginHorizontal: 10 }]}>
          {duration}
        </Text>
        <Dot />
        <View style={styles.rating}>
          <Text style={textStyles.mini}>{data.adult ? 'NC-17' : 'PG'}</Text>
        </View>
        <Dot />
        <View style={styles.voteAverage}>
          <Text style={textStyles.miniGreenBold}>{voteAverage * 10}%</Text>
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
          <Text style={[
            data.status.length > 8 ? textStyles.miniBold : textStyles.normalBold,
            {
              textAlign: 'center'
            }
          ]}>
            {data.status.toUpperCase()}
          </Text>
        </Info>
        <Info title='Original Language' isUsingBox>
          <Text style={textStyles.normalBold}>{data.original_language.toUpperCase()}</Text>
        </Info>
      </View>
    )
  }

  const renderSeasons = () => {
    return (
      <View style={{ marginBottom: 20 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={textStyles.section_title}>
            Seasons
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.seasons.map((i, index) => {
            return (
              <View style={{ paddingHorizontal: 5 }} key={index}>
                <View>
                  {i.poster_path ? (
                    <Image
                      source={{ uri: `https://image.tmdb.org/t/p/w500${i.poster_path}` }}
                      style={{
                        width: 120, height: 180,
                        resizeMode: 'cover',
                        borderRadius: 5,
                      }}
                     />
                    ) : (
                      <View style={{
                        width: 120, height: 180,
                        borderRadius: 5,
                        backgroundColor: '#949494',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Text style={textStyles.mini}>No image available</Text>
                      </View>
                    )}
                  <View style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    bottom: 0,
                    paddingBottom: 5
                  }}>
                    <Text style={[textStyles.normal, { marginBottom: -10 }]}>
                      {i.name}
                    </Text>
                    <Text style={[textStyles.miniBold, { textAlign: 'center' }]}>
                      {i.episode_count} Episodes
                    </Text>
                  </View>
                </View>
                
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  const renderOverview = () => {
    return (
      <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
        <Text style={textStyles.section_title}>
          Overview
        </Text>
        <Text style={[textStyles.normalLight, { flex: 1 }]}>{data.overview}</Text>
      </View>
    )
  }

  const renderProductionCompany = (i:Object) => {
    console.log(i)
    return (
      <View style={styles.productionCompanyImageContainer}>
        {i.item.logo_path ? (
          <View style={styles.isImageContainer}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${i.item.logo_path}` }}
              style={styles.productionCompanyImage}
            />
          </View>
        ) : (
          <View style={styles.noImageContainer}>
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
      <View style={{ marginBottom: 20, paddingHorizontal: 10 }}>
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
      </View>
    )
  }

  const renderSpokenLanguages = () => {
    return (
      <View style={{ marginBottom: 20, paddingHorizontal: 10 }}>
        <Text style={textStyles.section_title}>
          Spoken Languages
        </Text>
        <View style={{
          flexDirection: 'row',
          marginTop: 10
        }}>
          {data.spoken_languages.map((i, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#000',
                paddingHorizontal: 10, paddingVertical: 5,
                marginHorizontal: 5,
                borderRadius: 5,
                alignItems: 'center', justifyContent: 'center'
              }}
            >
              <Text style={[textStyles.bigLanguangeISO, { marginBottom: -10 }]}>{i.iso_639_1.toUpperCase()}</Text>
              <Text style={textStyles.normalLight}>
                {i.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  const renderProductionCountries = () => {
    return (
      <View style={{ marginBottom: 20, paddingHorizontal: 10 }}>
        <Text style={textStyles.section_title}>
          Production Countries
        </Text>
        <View>
          {data.production_countries.map((i, index) => (
            <View
              key={index}
            >
              <Text style={textStyles.normalLight}>
                {i.name} - ({i.iso_3166_1})
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
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
      {renderSeasons()}
      {renderOverview()}
      {renderProductionCompanies()}
      {renderSpokenLanguages()}
      {renderProductionCountries()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#27262b',
    height: 1150
  },
  title: {
    textAlign: 'center',
    marginBottom: -10,
    flex: 1,
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
  voteAverage: {
    marginHorizontal: 10,
    borderColor: '#00ff00',
    borderWidth: 1,
    paddingVertical: 0.5, paddingHorizontal: 6,
    borderRadius: 5
  },
  infoContainer: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
  },
  infoChildren: {
    maxWidth: 90,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 5
  },
  productionCompanyImageContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    maxWidth: 90,
    flex: 1
  },
  isImageContainer: {
    paddingHorizontal: 5, paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 60,
    width: 'auto',
    borderRadius: 10,
  },
  productionCompanyImage: {
    width: 60,
    height: 30,
    resizeMode: 'contain'
  },
  noImageContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tagText: {
    color: '#000',
    fontFamily: 'SF-Pro-Display-Bold',
    fontSize: 10
  }
})

export default TVDetailInformation