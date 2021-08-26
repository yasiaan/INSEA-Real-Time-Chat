import React, { useLayoutEffect, useEffect,  useState } from "react";
import { ScrollView } from 'react-native';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { Avatar, Button, Input, Image, ThemeConsumer } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import { TouchableOpacity } from "react-native";

const homeScreen = ({ navigation }) => {
    
    const [groups, setGroups] = useState([]);

    const signOut = () => {
        auth?.signOut().then(() => {
            navigation.replace('Login');
        });
    };

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setGroups(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "INSEA Cty.",
            headerStyle: { backgroundColor: "#fff"},
            headerTitleStyle: { color: "black"},
            headerTintColor: "black",
            headerLeft: () => (
                <View style={{marginLeft: 20}}>
                    <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
                        <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }}/>
                    </TouchableOpacity>    
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }} >
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation])
    
    const enterGroup = (id, chatName) => {
        navigation.navigate("Group", {
           id,
           chatName, 
        });
    }
    
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {groups.map(({id, data: { chatName }}) => (
                    <CustomListItem 
                    key={id} 
                    id={id} 
                    chatName={chatName}
                    enterGroup={enterGroup}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default homeScreen

const styles = StyleSheet.create({
    container: {
        height: "100%",
    }
})
