import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

const InputBox = ({
    inputTitle,
    autoComplete,
    keyboardType,
    secureTextEntry = false,
    value,
    setValue
}) => {
  return (
    <View> 
      <Text style={styles.inputTitle}>{inputTitle}</Text>
      <TextInput 
        style={styles.inputBox} 
        autoCorrect={false}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputTitle: {
    marginBottom: 3,
    fontSize: 15,
    color: 'white',
    fontFamily:"Kanit"

  },
  inputBox: {
    height: 42,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    paddingLeft: 10,
    color: '#87CEFA',
    shadowColor: "#87CEFA",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
  },
});

export default InputBox;
