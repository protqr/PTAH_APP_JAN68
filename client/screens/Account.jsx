import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Menus/FooterMenu'
import HeaderMenu from '../components/Menus/HeaderMenu'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // นำเข้า MaterialIcons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'

const Account = () => {
    //global state
    const [authState, setAuthState] = useContext(AuthContext)
    const { user } = authState

    //logout
    const handleLogout = async () => {
        setAuthState({ token: '', user: null })
        await AsyncStorage.removeItem('@auth')
        alert("Logout Successfully")
    }

    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Image
                    style={styles.imgprofile}
                    source={{
                        uri: 'https://p16-va.lemon8cdn.com/tos-alisg-v-a3e477-sg/o4fXpT5bfAA3xIQWF0LeGJAEu8eAFkIH2AGO29~tplv-tej9nj120t-origin.webp'
                    }}
                />
                <View style={styles.textContainer}>
                    <Text style={styles.username}>{authState?.user.name}  {authState?.user.surename}</Text>
                    <Text style={styles.idcard}> เบอร์โทรศัพท์ : {authState?.user.tel} </Text>
                    <Text style={styles.idcard}>รหัสบัตรประจำตัวประชาชน :  {authState?.user.ID_card_number}</Text>
                    <Text style={styles.idcard}>แพทย์ผู้ดูแล พญ.สมพร เตโช</Text>

                </View>
            </View>

            <View style={styles.information}>

            <View style={styles.infoHeader}>
        <Text style={styles.infoHeaderText}>การตั้งค่า</Text>
       
    </View>
                <TouchableOpacity>
                    <View style={styles.menuItem}>
                        <FontAwesome5 name="user-edit" color="#87CEFA" size={20}  style={styles.icon}/>
                        <Text style={styles.menuItemTextsignout}>แก้ไขข้อมูลส่วนตัว</Text>
                        <FontAwesome5 name="angle-right" color="#87CEFA" size={20}  style={styles.right}/>


                    </View>
                </TouchableOpacity>

                <TouchableOpacity >
                    <View style={styles.menuItem}>
                        <MaterialIcons name="help" color="#87CEFA" size={20}  style={styles.icon}/>
                        <Text style={styles.menuItemTextsignout}>ความช่วยเหลือ</Text>
                        <FontAwesome5 name="angle-right" color="#87CEFA" size={20}  style={styles.right}/>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogout}>
                    <View style={styles.menuItem}>
                        <FontAwesome5 name="sign-out-alt" color="#87CEFA" size={20}  style={styles.icon}/>
                        <Text style={styles.menuItemTextsignout}>ออกจากระบบ</Text>

                    </View>
                </TouchableOpacity>
           
            </View>

            

            <FooterMenu />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
       
       
        
    },
    textContainer: {
        marginLeft: 10
    },
    imgprofile: {
        width: 90,
        height: 90,
        borderRadius: 30,
    },
    name: {
        fontSize: 15,
        color: "black",
        fontFamily:"Kanit",
        
    },
    idcard: {
        color: "grey",
        marginTop: 10,
        fontSize: 12,
        fontFamily:"Kanit"
    },
    information: {
        paddingHorizontal: 30,
        marginBottom: 25,
        padding:10,
        borderRadius:10,
        backgroundColor: "#fff",
        marginTop:0

      
    },
    cardText: {
        fontSize: 14,
        padding:0,
        lineHeight: 26,
        fontFamily:"Kanit",
        

        
    },
    menuWrapper:{
        marginTop:70,
        alignItems: "center", // จัดเรียงขอบเขตในแนวแกนนอน
        flex: 1, // ยืดขยายให้เต็มพื้นที่ที่เหลือ
       

    },
    menuItem:{
    flexDirection: 'row',
    backgroundColor:"white",
    width:200,
    marginTop:13,
    height:42,
    borderColor:"#87CEFA",
    borderWidth:1,
    alignItems:"center",
    justifyContent:"center"


    },
    menuItem:{
    flexDirection: 'row',
    padding:15,
    
 
    },
    menuItemText: {
        color: '#87CEFA',
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
        fontFamily:"Kanit",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        
        
      },
      menuItemTextsignout:{
        color: 'black',
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
        fontFamily:"Kanit",
        flex: 1, // ข้อความตรงกลาง (right) ครอบคลุมพื้นที่ทางฝั่งขวาของ container

      },
      infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // จัดการส่วนเว้นวรรคระหว่างองค์ประกอบ
        borderBottomWidth:0.7,
        paddingBottom:10,
        borderColor:"#D4EFFF",
        margin:5

    },
    infoHeaderText: {
        fontSize: 16,
        marginRight: 10,
        fontFamily: "Kanit",
    },
    right: {
        marginLeft: 'auto', // ตั้งให้ right อยู่ชิดหน้าจอฝั่งขวา
    },
    
})


export default Account
