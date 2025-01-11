import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const HeaderLogo = () => {
  return (
    <View>
      <Image source={require('../img/logo_blue.png')} style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 40,
    marginTop: 0,
  },
});

export default HeaderLogo;
