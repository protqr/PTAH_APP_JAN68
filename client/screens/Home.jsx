import React, { useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, RefreshControl ,Image } from 'react-native';
import { PostContext } from '../context/postContext';
import PostCard from '../components/PostCard';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import HomeMenu from '../components/Menus/HomeMenu';
import { AuthContext } from '../context/authContext'



const Home = () => {
  const [posts, getAllPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [authState, setAuthState] = useContext(AuthContext)
  const { user } = authState


  // Refresh control
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // Function to filter posts based on the search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
     
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        
        <Text style={styles.hello}>สวัสดี {authState?.user.name} {authState?.user.surename}   </Text>
        
       <Image source={require('../img/poster.png')} style={styles.img} />

        <HomeMenu />

      
      </ScrollView>
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor:"white",
    alignItems: 'center', 

  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 10,
    alignItems:"center"
  },
  searchInput: {
    backgroundColor: '#EBEBEB',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    textAlign: 'right', // ให้ placeholder และข้อความใน TextInput อยู่ทางขวา,
    paddingRight:310,
    

  },
  searchIcon: {
    position: 'absolute',
    left: 25,
    top: 30,
    color:"#565656"
  
  },
  img:{
    width:380,
    height:220,
    borderRadius:15  ,
    marginTop:15
  } ,
  hello:{
  marginTop:15 ,
  alignSelf: 'flex-start', // จัดข้อความไปทางซ้าย
  marginLeft: 15,
  fontSize:18,
  fontWeight:"500",
  fontFamily:"Kanit"

}
}
);

export default Home;
