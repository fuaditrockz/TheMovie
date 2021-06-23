/**
 * @format
 */

import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  isHeaderSmall: boolean;
}

const Header: React.FC<HeaderProps> = ({isHeaderSmall}) => {
  const translation = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.timing(translation, {
      toValue: isHeaderSmall ? 0 : 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isHeaderSmall]);

  return (
    <Animated.View style={[
      styles.container,
      {
        transform: [{ scaleY: translation }]
      }
    ]}>
      <Text style={styles.text}>Title Here</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Header;
