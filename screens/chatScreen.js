import React, {useLayoutEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign, SimpleLineIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { Touchable } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { auth, db } from '../firebase';
import firebase from 'firebase/app';

const chatScreen = ({ navigation, route }) => {
    
    const [input, setInput] = useState([])
    const [messages, setMessages] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Group",
            headerTitle: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                }} >
                    <Avatar rounded source={{
                        uri:
                            messages[messages.length - 1]?.data.photoURL ,
                    }} />
                    <Text style={{
                        color: "white",
                        marginLeft: 10,
                        marginRight: 70,
                        fontWeight: "500",
                    }} >{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{
                    marginLeft: 10,
                }}
                onPress={navigation.goBack}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View 
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: 80,
                    marginRight: 20,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
        })
    }, [navigation, messages]);

    const sendMessage = () => {
        Keyboard.dismiss();
        db
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        });

        setInput("");
    };

    useLayoutEffect(() => {
        const unsubscribe = db
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
        ));

        return unsubscribe;
    }, [route]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white "}}>
            <StatusBar style="light"/>
            <View
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
                >
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss()}> */}
                <>
                    <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                        {messages.map(({id, data}) => (
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.receiver} >
                                    <Avatar
                                    //For WEB
                                    containerStyle={{
                                        position: "absolute",
                                        bottom: -15,
                                        right: -5,
                                    }}
                                    position="absolute"
                                    rounded
                                    bottom={-15}
                                    right={-5}
                                    size={26}
                                    source={{
                                        uri: data.photoURL,
                                    }} 
                                    /> 
                                    <Text style={styles.receiverText} >{data.message}</Text>
                                </View>
                            ) : (
                                <View key={id} style={styles.sender} >
                                    <Avatar 
                                    //For WEB
                                    containerStyle={{
                                        position: "absolute",
                                        bottom: -15,
                                        left: -5,
                                    }}
                                    position="absolute"
                                    rounded
                                    bottom={-15}
                                    left={-5}
                                    size={26}
                                    source={{
                                        uri: data.photoURL,
                                    }}
                                    />
                                    <Text style={styles.senderText} >{data.message}</Text>
                                    <Text style={styles.senderName} >{data.displayName}</Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput 
                            value={input}
                            onChangeText={(text) => setInput(text)}
                            onSubmitEditing={sendMessage}
                            placeholder="Enter new message" 
                            style={styles.textInput} 
                            />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5} >
                            <Ionicons name="send" size={24} color="#32ba6f" />
                        </TouchableOpacity>
                    </View>
                </>
                {/* </TouchableWithoutFeedback> */}
            </View>
        </SafeAreaView>
    )
}

export default chatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        borderWidth: 1,
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
    receiver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        borderColor: "#32ba6f",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    receiverText: {
        color: "#32ba6f",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    sender: {
        padding: 15,
        backgroundColor: "#32ba6f",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",},
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15, 
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
})
