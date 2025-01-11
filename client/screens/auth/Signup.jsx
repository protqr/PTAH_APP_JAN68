import { View, Text, StyleSheet, TextInput, Image, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import InputBox from '../../components/form/InputBox';
import SubmitButton from '../../components/form/SubmitButton';
import axios from 'axios';

const Signup = ({ navigation }) => {
  // State
  const [ID_card_number, setID_card_number] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surename, setSurename] = useState('');
  const [loading, setLoading] = useState(false);

  // Function
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!ID_card_number || !password) {
        Alert.alert('Please Fill All Fields');
        setLoading(false);
        return;
      }
      setLoading(false);
      const { data } = await axios.post('/auth/signup', { ID_card_number, password, name, surename });
      alert(data && data.message);
      navigation.navigate('Signin');
      console.log('Sign Up ==>', { ID_card_number, password, name, surename });
    } catch (error) {
      alert(error.response?.data?.message || 'Something went wrong');
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={require('../../img/logo_blue.png')} style={styles.img} />

        <View style={styles.bginput}>
          <InputBox inputTitle="ชื่อ" value={name} setValue={setName} />
          <InputBox inputTitle="นามสกุล" value={surename} setValue={setSurename} />
          <InputBox inputTitle="รหัสบัตรประชาชน" value={ID_card_number} setValue={setID_card_number} />
          <InputBox
            inputTitle="รหัสผ่าน"
            secureTextEntry={true}
            autoComplete="password"
            value={password}
            setValue={setPassword}
          />

          <SubmitButton btnTitle="ลงทะเบียน" handleSubmit={handleSubmit} />

          <Text style={styles.linkText}>
            มีบัญชีอยู่แล้ว?{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Signin')}>
              เข้าสู่ระบบ
            </Text>{' '}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between', // จัดวางให้อยู่ตรงกลาง
  },
  img: {
    width: 400,
    height: 80,
    marginTop: 130,
    alignSelf: 'center',
  },
  linkText: {
    textAlign: 'center',
    fontFamily: 'Kanit',
  },
  link: {
    color: 'white',
    fontFamily: 'Kanit',
  },
  bginput: {
    backgroundColor: '#87CEFA',
    paddingVertical: 50,
    paddingHorizontal: 50,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 75,
    marginTop: 74,
    flex: 1,
  },
});

export default Signup;
