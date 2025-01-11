import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import moment from 'moment/moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import EditModel from './EditModel';

const PostCard = ({ posts, myPostScreen }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [post, setPost] = useState({});
  const navigation = useNavigation();

  // handle delete prompt
  const handleDeletePrompt = (id) => {
    Alert.alert('ลบกระทู้', 'คุณต้องการลบกระทู้นี้ใช่หรือไม่', [
      {
        text: 'Cancel',
        onPress: () => console.log('cancel press'),
      },
      {
        text: 'Delete',
        onPress: () => handleDeletePost(id),
      },
    ]);
  };

  // delete post data
  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);
      setLoading(false);
      alert(data?.message);
      navigation.push("Myposts");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  // navigate to post details
  const navigateToDetails = (post) => {
    navigation.navigate('PostDetails', { post }); // ใช้ post object เป็น parameter
  };

  return (
    <View>
      {myPostScreen && (
        <EditModel
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          post={post}
        />
      )}

      {posts?.map((post, i) => (
        <TouchableOpacity key={i} onPress={() => navigateToDetails(post)}>
          <View style={styles.card}>
            {myPostScreen && (
              <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <Text style={{ marginHorizontal: 20 }}>
                  <FontAwesome5
                    name="pen"
                    color="#0072B8"
                    size={16}
                    onPress={() => {
                      setPost(post);
                      setModalVisible(true);
                    }}
                  />
                </Text>
                <Text>
                  <FontAwesome5
                    name="trash"
                    color="#E06A6A"
                    size={16}
                    onPress={() => handleDeletePrompt(post?._id)}
                  />
                </Text>
              </View>
            )}
            <Text style={styles.title}>{post?.title}</Text>
            <Text style={styles.content}>{post?.content}</Text>
            <View style={styles.tagContainer}>
              <FontAwesome5 name="hashtag" color="#87CEFA" size={14} />
              <Text style={styles.tagText}>{post?.tag}</Text>
            </View>
            <View style={styles.footer}>
             
              <View style={styles.footerItem}>
                <FontAwesome5 name="clock" color="#87CEFA" size={14} />
                <Text>{" "} {moment(post?.createdAt).format('DD/MM/YYYY')}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: 'black',
    fontWeight: '500',
    marginTop: 10,
    fontSize: 17,
    marginBottom: 10
  },
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 0.2,
    borderColor: '#C7C7C7',
    padding: 15,
    marginVertical: 5,
    elevation: 5, 
    shadowColor: 'grey', 
    shadowOffset: { width: 3, height: 2 }, 
    shadowOpacity: 0.20, 
    shadowRadius: 3, 
    alignSelf: 'center', 
  },
  title: {
    fontSize: 17,
    paddingBottom: 5,
    borderBottomWidth: 0.3,
    fontFamily: "Kanit"
  },
  content: {
    color: 'grey',
    marginTop: 10,
    marginBottom: 5,
    fontFamily: "Kanit"
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    fontFamily: "Kanit"
  },
  tagText: {
    marginLeft: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PostCard;
