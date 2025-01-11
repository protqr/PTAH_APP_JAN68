import { View, Text,StyleSheet, ScrollView  ,link} from 'react-native'
import React from 'react'
import FooterMenu from '../components/Menus/FooterMenu'
import { useState,useEffect } from 'react'
import axios from 'axios'
import PostCard from '../components/PostCard'


const Myposts = () => {
  //state
  const [posts, setPosts] = useState([])
  const [loading,setLoading] = useState(false)


  //get user post
  const getUserPosts = async ()=>{
    try{
      setLoading(true)
      const { data } = await axios.get(`/post/get-user-posts`)
      //const { data } = await axios.get('http://10.0.2.2:8080/api/v1/post/get-user-posts');

      setLoading(false)
      setPosts(data?.userPosts)
    }catch (error) {
      setLoading(false)
      console.log(error)
      alert(error)

    }
  }


  //initaial 

  useEffect(() => {
    getUserPosts();
  },[])
  return (
    <View style={styles.container}>
     
      <ScrollView         
      contentContainerStyle={styles.scrollViewContent}
>
      <Text style={styles.heading}>กระทู้ของฉัน  กระทู้</Text>

        <PostCard posts={posts} myPostScreen={true}/>
      </ScrollView>
     
    <FooterMenu/>
    </View>

  )
}
const styles = StyleSheet.create({
  
  container : {
      flex: 1 ,
      margin:0,
      justifyContent:"space-between",
      backgroundColor:"white"
    
  },
  heading: {
    fontSize: 20,
    marginTop: 20,
    fontFamily: "Kanit",
    marginLeft:20,
    borderLeftWidth:1,
    padding:10,
    borderColor:"#87CEFA"
  },
  scrollViewContent:{
    paddingBottom:100
  }


})

export default Myposts