import { OrdinaryLoading } from "../components";
import { View,Text } from "react-native";
import {colors} from "../utils/colors";
import { useEffect, useState } from "react";
import { getUserData } from "../asyncStorage/user";
import { useRouter } from 'expo-router';
import { saveUserRooms, getUserRooms } from "../asyncStorage/rooms";

// t_ichalalen@estin.dz

const RoomsLoading = () => {
    const router = useRouter();
    const [token, setToken] = useState('');
    const [error, setError] = useState('')
    const [rooms, setRooms] = useState([])
    const [savedRooms, setSavedRooms] = useState([])

    const getSavedRooms = async () => {
        const rooms = await getUserRooms();
        setSavedRooms(rooms)
    }

    const getToken = async () => {
        const user = await getUserData();
        setToken(user.token);
    }

    useEffect(() => {
        getToken()
    },[])

    const getRooms = async () => {
        try{
            const response = await fetch("http://192.168.1.71:3000/api/room/get-user-rooms",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            const data = await response.json()
            if (response.ok) {
                // await saveUserRooms(data.rooms)
                setRooms(data.rooms)
                router.replace(`/rooms/${data.rooms.filter((room) => room.isGeneral)[0]._id}`)
            } else {
                setError(data.error)
            }
        } catch(error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        if(token){
            getRooms()
            getSavedRooms
        }
    },[token])

    useEffect(() => {
        if(rooms.length > 0 && savedRooms.length > 0){
            for (let i = 0; i < savedRooms.length; i++) {
                if(rooms[i].lastMessage.timestamp !== savedRooms[i].lastMessage.timestamp){
                    rooms[i].isNotified = true;
                }
            }
        } else if (!savedRooms){
            rooms.forEach(room => room.isNotified = true)
        }
        saveUserRooms(rooms)
    },[rooms, savedRooms])

    return (
        <View style={{height:"100%", width:"100%",justifyContent:'center', alignItems:'center'}}>
            {error ? <Text>{error}</Text> : <OrdinaryLoading size={30} color={colors.dark_blue}/>}
        </View>
    )
}

export default RoomsLoading