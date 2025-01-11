import { View, Text,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'

const SubmitButton = ({
    handleSubmit,
    btnTitle,
   loading}) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} >
      <Text style={styles.btnText} >

        {loading ? "Please Wait..." : btnTitle}




      </Text>

    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({

    submitBtn:{
        backgroundColor:"white",
        height:45,
        marginHorizontal:60,
        borderRadius:30,
        justifyContent:"center",
        marginBottom:20,
        marginTop:40,
        borderColor:"white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        
    },
    btnText:{
        color:"#87CEFA",
        textAlign:"center",
        fontSize:22,
        fontFamily:"Kanit"


    }
})
export default SubmitButton