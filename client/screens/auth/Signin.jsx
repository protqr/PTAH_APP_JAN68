import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { AuthContext } from '../../context/authContext';
import InputBox from '../../components/form/InputBox';
import SubmitButton from '../../components/form/SubmitButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signin = ({ navigation }) => {
  // สถานะโกลบอล
  const [state, setState] = useContext(AuthContext);

  // สถานะภายใน
  const [ID_card_number, setID_card_number] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // ฟังก์ชันจัดการการลงชื่อเข้าใช้
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!ID_card_number || !password) {
        Alert.alert('กรุณากรอกข้อมูล');
        setLoading(false);
        return;
      }

      const { data } = await axios.post('/auth/signin', { ID_card_number, password });
      setState(data);
      await AsyncStorage.setItem('@auth', JSON.stringify(data));

      navigation.navigate('Home');
      console.log('Sign In ==>', { ID_card_number, password });

      setLoading(false);
    } catch (error) {
      alert(error.response?.data?.message || 'เกิดข้อผิดพลาด');
      setLoading(false);
      console.log(error);
    }
  };

  // ฟังก์ชันชั่วคราวเพื่อตรวจสอบข้อมูลใน Local Storage
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem('@auth');
    console.log('Local Storage ==>', data);
  };
  getLocalStorageData();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={require('../../img/logo_blue.png')} style={styles.img} />
        <View style={styles.bginput}>
          <InputBox
            inputTitle="รหัสบัตรประชาชน"
            value={ID_card_number}
            setValue={setID_card_number}
          />
          <InputBox
            inputTitle="รหัสผ่าน"
            secureTextEntry={true}
            autoComplete="password"
            value={password}
            setValue={setPassword}
          />
          <SubmitButton btnTitle="เข้าสู่ระบบ" handleSubmit={handleSubmit} />
          <Text style={styles.linkText}>
            ไม่มีบัญชี ?
            <Text style={styles.link} onPress={() => navigation.navigate("Signup")}> ลงทะเบียน</Text>{" "}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  img: {
    width: 400,
    height: 80,
    marginTop: 130,
  },
  linkText: {
    textAlign: "center",
    fontFamily: "Kanit",
  },
  link: {
    color: "white",
    fontFamily: "Kanit",
  },
  bginput: {
    backgroundColor: "#87CEFA",
    paddingVertical: 50,
    paddingHorizontal: 50,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 75,
    marginTop: 74,
    height: 550,
  },
});

export default Signin;
