import { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

//context
const PostContext = createContext()

const PostProvider = ({ children }) => {

    //state
    const [loading, setLoading] = useState(false)
    const [posts, setPosts] = useState([])


    //get posts
    const getAllposts = async () => {
        setLoading(true) // เปลี่ยนค่า loading เป็น true เมื่อเริ่มเรียก API
        try {
            const { data } = await axios.get('/post/get-all-posts')
            setPosts(data?.posts)
        } catch (error) {
            console.log(error) // แก้ไขเป็น console.log เพื่อให้ทำงานได้ถูกต้อง
        }
        setLoading(false) // ตั้งค่า loading เป็น false เมื่อเสร็จสิ้นการโหลด
    }

    //initialize posts
    useEffect(() => {
        getAllposts()
    }, [])

    return (
        <PostContext.Provider value={[posts, setPosts,getAllposts]}>
            {children}
        </PostContext.Provider>
    )
}

export { PostContext, PostProvider }
