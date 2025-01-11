import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState, useContext } from 'react';
import { PostContext } from '../context/postContext';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const Post = ({ navigation }) => {
  // global state
  const [posts, setPosts] = useContext(PostContext);
  // local state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    try {
      setLoading(true);
      if (!title) {
        alert("Please add post title");
        setLoading(false);
        return;
      }
      if (!content) {
        alert("Please add post content");
        setLoading(false);
        return;
      }
      const { data } = await axios.post('/post/create-post', { title, content, tag });
      setLoading(false);
      setPosts([...posts, data?.post]);
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
       <Text style={styles.heading}>สร้างกระทู้ </Text>
        <View style={styles.innerContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>หัวข้อ</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="เพิ่มหัวข้อ"
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>รายละเอียด</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="เพิ่มรายละเอียด"
              multiline={true}
              numberOfLines={4}
              value={content}
              onChangeText={(text) => setContent(text)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>แท็ก</Text>
            <TextInput
              style={styles.inputBox}
              placeholder="เช่น #ไอ"
              value={tag}
              onChangeText={(text) => setTag(text)}
            />
          </View>

          <TouchableOpacity
            style={styles.postBtn}
            onPress={handlePost}
            disabled={loading}
          >
            <Text style={styles.postBtnText}>
              <FontAwesome5 name="plus-square" size={20} />{" "}
              สร้างกระทู้
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <FooterMenu />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 ,
    margin:0,
    justifyContent:"space-between",
    backgroundColor:"white"
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 100, 
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    padding: 20,
    marginTop: 0, 
  },
  heading: {
    fontSize: 20,
    fontFamily: "Kanit",
  
   
  },
  inputWrapper: {
    width: '100%',
    marginBottom:20,
  },
  inputBox: {
    backgroundColor: "#FFFFFF",
    width: '100%',
    fontSize: 16,
    paddingLeft: 20,
    padding: 10,
    borderRadius: 5,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    textAlignVertical: "center",
    fontFamily: "Kanit",
  },
  postBtn: {
    backgroundColor: "white",
    width: 200,
    height: 45,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    borderWidth: 1,
    borderColor: "#87CEFA",
    marginTop: 20,
  },
  postBtnText: {
    color: "#87CEFA",
    fontWeight: "600",
    fontFamily: "Kanit",
  },
  label: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    paddingLeft: 10,
    marginBottom: 0,
    marginTop: 10,
    color: '#555',
    fontFamily: "Kanit",
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
});

export default Post;
