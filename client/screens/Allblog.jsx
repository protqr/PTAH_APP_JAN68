import React, { useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, RefreshControl } from 'react-native';
import { PostContext } from '../context/postContext';
import PostCard from '../components/PostCard';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Allblog = () => {
  const [posts, getAllPosts] = useContext(PostContext);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

        <TextInput
          style={styles.searchInput}
          placeholder="ค้นหา..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FontAwesome5 name="search" style={styles.searchIcon} />

        <PostCard posts={filteredPosts} />
        
      </ScrollView>
      <FooterMenu />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor:"white"
  },
  scrollViewContent: {
    paddingBottom:100
  },
  searchInput: {
    backgroundColor: '#EBEBEB',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    textAlign: 'left', // ให้ placeholder และข้อความใน TextInput อยู่ทางขวา,
   paddingLeft:30
    

  },
  searchIcon: {
    position: 'absolute',
    left: 25,
    top: 30,
    color:"#565656"
  
  },

});

export default Allblog;
