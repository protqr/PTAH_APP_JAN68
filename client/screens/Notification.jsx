import { View, Text , StyleSheet} from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import FooterMenu from '../components/Menus/FooterMenu'

const Notification = () => {
    
    const [state] = useContext(AuthContext)

   
  return (
    <View  style={styles.container}>
          <View style={{ flex:1 , justifyContent:"flex-end"}}>


      <FooterMenu/>

      </View>
    </View>
  )
}
  const styles = StyleSheet.create({
  
    container : {
        flex: 1 ,
        justifyContent:"space-between",
        marginTop:40, 
    }
})


export default Notification