import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const EditPostScreen = ({ route }) => {
  const { post } = route.params;
 
  const [title, setTitle] = useState(post?.title);
  const [description, setDescription] = useState(post?.description);
  const [tag, setTag] = useState(post?.tag);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Function to update post
  const updatePostHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/post/update-post/${post?._id}`, {
   
        title,
        description,
        tag,
      });
      setLoading(false);
      Alert.alert(data?.message);
      navigation.navigate('Myposts');
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert('Error', 'An error occurred while updating the post.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Post</Text>
      <Text>Title</Text>
      <TextInput
        style={styles.inputBox}
        value={title}
        onChangeText={setTitle}
      />
      <Text>Description</Text>
      <TextInput
        style={[styles.inputBox, { height: 100 }]}
        multiline
        value={description}
        onChangeText={setDescription}
      />
      <Text>Tag</Text>
      <TextInput
        style={styles.inputBox}
        value={tag}
        onChangeText={setTag}
      />
    
      <Pressable
        style={styles.button}
        onPress={updatePostHandler}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Please Wait' : 'Update'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputBox: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default EditPostScreen;
