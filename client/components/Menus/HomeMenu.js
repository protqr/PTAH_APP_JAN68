import { View, Text , TouchableOpacity, StyleSheet , Image} from 'react-native'
import React from 'react'
import { useNavigation ,useRoute } from '@react-navigation/native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient';


const HomeMenu = () => {
  //hooks
  const navigation = useNavigation()

  const route = useRoute()

  return (
    <View style={styles.container}>

<View style={styles.menuWrapper}>
                
                
    <Text style={{marginLeft:10, marginTop:10, fontWeight:"600" , borderLeftWidth:1 ,padding:10 ,borderColor:"#87CEFA" ,fontFamily:"Kanit" , fontSize: 18}}>หมวดหมู่</Text>
      <View style={styles.row}>
        <TouchableOpacity  onPress={() => navigation.navigate('Therapy')}>
        <View style={styles.menuItem}>
          <Image source={require('../../img/icons/physiotherapist.png')} style={styles.iconStyle} />
          <Text style={styles.menuItemText}>ทำกายภาพบำบัด</Text>
          </View>
        </TouchableOpacity>
      
        <TouchableOpacity  onPress={() => navigation.navigate('Resultstherapy')}>
        <View style={styles.menuItem}>
          <Image source={require('../../img/icons/success.png')} style={styles.iconStyle} />
          <Text style={styles.menuItemText}>ผลกายภาพบำบัด</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('TherapyFeedback')}>
        <View style={styles.menuItem}>
          <Image source={require('../../img/icons/form.png')} style={styles.iconStyle} />
          <Text style={styles.menuItemText}>ผลประเมิน</Text>
          </View>
        </TouchableOpacity>
      
        <TouchableOpacity onPress={() => navigation.navigate('CalendarScreen')}>
        <View style={styles.menuItem}>
            <Image source={require('../../img/icons/mood.png')} style={styles.iconStyle} />
          <Text style={styles.menuItemText}>อารมณ์ประจำวัน</Text>
          </View>
        </TouchableOpacity>
      </View>
      
    </View>
    </View>
 
  )
}

const styles  = StyleSheet.create({
  container : {
    flexDirection: 'column',
    margin: 0,
    justifyContent: 'space-between',
    
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    
  
  },

  iconStyle: {
    width: 35,
    height: 35,
   
  },
 
  menuItem:{
    flexDirection: 'row',
    backgroundColor:"white",
    width:180,
    marginTop:13,
    height:70,
    borderColor:"#E7F6FF",
    borderWidth:1,
    borderRadius:15,
    alignItems:"center",
    padding:15,
    margin:4,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    },
    menuItemText: {
        color: 'black',
        marginLeft: 10,
        fontSize: 14,
        fontFamily:"Kanit"
        
        
        
      },
})

export default HomeMenu
