import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../screens/Home'
import { AuthContext } from '../../context/authContext'
import { useContext } from 'react'
import HeaderMenu from './HeaderMenu'
import Signup from '../../screens/auth/Signup'
import Signin from '../../screens/auth/Signin'
import Post from '../../screens/Post'
import Notification from '../../screens/Notification'
import Account from '../../screens/Account'
import Myposts from '../../screens/Myposts'
import HeaderLogo from '../../screens/HeaderLogo.jsx'
import { TouchableOpacity  } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native'
import Allblog from '../../screens/Allblog.jsx'
import EditPostScreen from '../../screens/EditPost.jsx'
import PostDetails from '../../screens/PostDetails.jsx'
import Therapy from '../../screens/Therapy.jsx'
import TherapyFeedback from '../../screens/TherapyFeedback.jsx'
import Resultstherapy from '../../screens/Resultstherapy.jsx'
import CalendarScreen from "../../screens/CalendarScreen.jsx"


const ScreenMenu = () => {
    const navigation = useNavigation()

    const [state] = useContext(AuthContext) // Hook ใช้ตามกฎที่กำหนด

    //auth condition true false

    const authenticatedUsed = state?.user && state?.token

    const Stack = createNativeStackNavigator()
    

    return (
        <Stack.Navigator initialRouteName='Signin'>
            {authenticatedUsed ? (
                <>
             <Stack.Screen 
    name="Home" 
    component={Home}  
    options={{
        headerTitle: (props) => <HeaderLogo {...props} />,
        headerTitleAlign: 'center', // Align the title to the center
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                <FontAwesome5 name="bell" size={24} color="black" style={{marginLeft: 10}} />
            </TouchableOpacity>
        ),
      
        
            
    }} 
    />

<Stack.Screen 
    name="Allblog" 
    component={Allblog}  
    options={{
        headerBackTitle:"Back",
        headerTitle: (props) => <HeaderLogo {...props} />,
        headerTitleAlign: 'center',
      
    }} 
    />

<Stack.Screen 
    name="Notification" 
    component={Notification}  
    options={{
        headerBackTitle:"Back",
        headerTitle: (props) => <HeaderLogo {...props} />,
        headerTitleAlign: 'center',
    }} 
    />

<Stack.Screen 
    name="Post" 
    component={Post}  
    options={{
        headerBackTitle:"Back",
        headerTitle: (props) => <HeaderLogo {...props} />,
        headerTitleAlign: 'center',
        
    }} 
    />

<Stack.Screen 
    name="Myposts" 
    component={Myposts}  
    options={{
        headerBackTitle:"Back",
        headerTitle: (props) => <HeaderLogo {...props} />,
        headerTitleAlign: 'center',
        
    }} 
    />
    <Stack.Screen 
    name="Editpost" 
    component={EditPostScreen}  
    options={{
        headerBackTitle:"Back",
        headerTitle: (props) => <HeaderLogo {...props} />,
        headerTitleAlign: 'center',
        
    }} 
    />


<Stack.Screen 
    name="Account" 
    component={Account}  
    options={{
        headerBackTitle:"Back",
        headerTitle: (props) => <HeaderLogo {...props} />,
        headerTitleAlign: 'center',
    }} 
    />


<Stack.Screen 
    name="PostDetails" 
    component={PostDetails}  
    options={{
        headerBackTitle:"Back",
        headerTitle: (props) => <HeaderLogo {...props} />,
        headerTitleAlign: 'center',
    }} 
    />
    <Stack.Screen 
    name="Therapy" 
    component={Therapy}  
    options={{
        headerBackTitle:"Back",
        headerTitle: (props) => <HeaderLogo {...props} />,
        headerTitleAlign: 'center',
    }} 


    />




<Stack.Screen 
    name="TherapyFeedback" 
    component={TherapyFeedback}  
    options={{
        headerBackTitle:"Back",
        headerTitle: (props) => <HeaderLogo {...props} />,
        headerTitleAlign: 'center',
    }} 
    />

<Stack.Screen 
    name="Resultstherapy" 
    component={Resultstherapy}  
    options={{
        headerBackTitle:"Back",
        headerTitle: (props) => <HeaderLogo {...props} />,
        headerTitleAlign: 'center',
    }} 
    />



    

    <Stack.Screen 
    name="CalendarScreen" 
    component={CalendarScreen}  
    options={{
        headerBackTitle:"Back",
        headerTitle: (props) => <HeaderLogo {...props} />,
        headerTitleAlign: 'center',
    }} 
    />



</>


 ) : (
                <>
                
            <Stack.Screen name="Signup" 
                component={Signup}  
                options={{headerShown:false}}/>
                
                
                <Stack.Screen name="Signin" 
                component={Signin} 
                options={{headerShown:false}}/>
                
                </>
            )}
            

           


          
        </Stack.Navigator>
    )
}

export default ScreenMenu
