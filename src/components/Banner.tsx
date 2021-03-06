import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { textStyles } from '../constants/styles';

interface BannerProps {
  goBack: Object;
  isMovie: boolean;
}

const Banner: React.FC<BannerProps> = ({ goBack, isMovie }) => {
  const statusBarHeight = StatusBar.currentHeight

  return (
    <LinearGradient
        colors={['rgba(39, 38, 43, 0.9)',  'rgba(39, 38, 43, 0.7)', 'rgba(39, 38, 43, 0.5)', 'rgba(39, 38, 43, 0)']}
        style={[
          styles.banner,
          {
            top: statusBarHeight
          }
        ]}
      >
        <TouchableOpacity
          onPress={goBack}
          style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <MaterialIcons
            name="close"
            size={25}
            color="#fff"
            style={{ position: 'relative', top: 12, marginRight: 10 }}
          />
          <Text style={textStyles.movie_title}>
            {isMovie ? 'Movie' : 'TV Show'}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  banner: {
    paddingTop: 0,
    paddingBottom: 50,
    paddingHorizontal: 10,
    position: 'absolute',
    left: 0,
    zIndex: 99,
    width: '100%',
    flexDirection: 'row'
  },
})

export default Banner