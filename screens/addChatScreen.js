import React, { useLayoutEffect, useState } from 'react';
import { Button, Input, Image, Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from '../firebase';

const addChatScreen = ({ navigation }) => {

    const [input, setInput] = useState();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add new Group",
            headerBackTitle: "Groups",
            headerTitleAlign: "center",
        })
    }, [navigation]);

    const createGroup = async () => {
        await db
        .collection("chats")
        .add({
            chatName: input,
        })
        .then(() => {
            navigation.goBack();
        })
        .catch(error => alert(error));
    };

    return (
        <View style={styles.container}> 
            <Input 
            placeholder="Enter a group name"
            value={input}
            onChangeText={(text) => setInput(text)}
            onSubmitEditing={createGroup}
            leftIcon={
                <Icon name="wechat" type="antdesign" size={24} color="#32ba6f" />
            }
            />
            <Button disabled={!input} type="outline" style={styles.button} onPress={createGroup} title='Create new Group' />
        </View>
    )
}

export default addChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 30,
        height: "100%",
    },
    button: {
        width: 200,
        marginTop: 10,
        backgroundColor: '#32ba6f',
        color: 'white',
    }
})
