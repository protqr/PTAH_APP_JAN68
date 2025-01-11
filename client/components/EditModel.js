import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const EditModal = ({ modalVisible, setModalVisible, post }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation(); // Corrected line

  // Handle update post
  const updatePostHandler = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/post/update-post/${id}`, {
        title,
        content,
        tag,
      });
      setLoading(false);
      alert(data?.message);
      navigation.push("Myposts");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  // Initial post data
  useEffect(() => {
    setTitle(post?.title);
    setContent(post?.content);
    setTag(post?.tag);
  }, [post]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>แก้ไขกระทู้</Text>
            <Text styles={styles.topic}>หัวข้อ</Text>
            <TextInput
              style={styles.inputBox}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <Text styles={styles.topic}>คำอธิบาย</Text>
            <TextInput
              style={styles.inputBox}
              multiline={true}
              numberOfLines={4}
              value={content}
              onChangeText={(text) => setContent(text)}
            />
            <Text styles={styles.topic}>#</Text>
            <TextInput
              style={styles.inputBox}
              value={tag}
              onChangeText={(text) => setTag(text)}
            />
          
            <View style={styles.btnContainer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStylecacel}>ยกเลิก</Text>
              </Pressable>
              <Pressable
          style={[styles.button, styles.buttonedit]}

                onPress={() => {
                  updatePostHandler(post && post._id),
                    setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>
                  {loading ? "Please Wait" : "แก้ไข"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  topic:{
    fontFamily:"Kanit",
   

  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:350
  },
  inputBox: {
    marginBottom: 20,
    paddingTop: 10,
    textAlignVertical: "top",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    fontFamily: "Kanit"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center", // ปรับเป็น 'center' เพื่อจัดปุ่มตามแนวนอนกึ่งกลาง
  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#87CEFA",
    elevation: 2,
    width: 100,
    margin: 10,
    borderColor:"#87CEFA"
  },
  buttonedit: {
    borderColor:"#87CEFA",
    backgroundColor: "white",
    borderColor:"#87CEFA",
    

    },
  buttonClose: {
    backgroundColor: "white",
   
  
  },
  textStyle: {
    color: "#87CEFA",
    textAlign: "center",
    fontFamily:"Kanit",
    fontSize:16


  },
  textStylecacel:{
    color: "#BD3737",
    textAlign: "center",
    fontFamily:"Kanit",
    fontFamily:"Kanit",
    fontSize:16

  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily:"Kanit",
    fontSize:20

  },
 
});
export default EditModal;
