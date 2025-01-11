import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Keyboard } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const FooterMenu = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Clean up listeners when component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (!isFocused || keyboardVisible) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('../../img/icons/home.png')} style={styles.iconStyle} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Allblog')}>
        <Image source={require('../../img/icons/search.png')} style={styles.iconStyle} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Post')}>
        <Image source={require('../../img/icons/add.png')} style={styles.iconStyle} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Myposts')}>
        <Image source={require('../../img/icons/history.png')} style={styles.iconStyle} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Account')}>
        <Image source={require('../../img/icons/account.png')} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#87CEFA',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  iconStyle: {
    marginBottom: 3,
    alignSelf: 'center',
    width: 25,
    height: 25,
    margin: 12,
  },
});

export default FooterMenu;
