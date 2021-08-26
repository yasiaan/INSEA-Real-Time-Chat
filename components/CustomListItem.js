import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements';
import { ListItem, Avatar } from 'react-native-elements'
import { auth, db } from "../firebase";

const CustomListItem = ({ id, chatName, enterGroup }) => {
    const [chatMessages, setChatMessages] = useState([]);

    useLayoutEffect(() => {
        const unsubscribe = db
        .collection('chats')
        .doc(id)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => 
            setChatMessages(snapshot.docs.map((doc) => doc.data())));
        
            return unsubscribe;
    });

    return (
        <ListItem key={id} onPress={() => enterGroup(id, chatName)} key={id} bottomDivider>
            <Avatar
                rounded
                source={{
                    uri:
                    chatMessages?.[chatMessages.length - 1]?.photoURL ||
                  "https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png",
                }}
            />
            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: "800" }} >
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle 
                numberOfLines={1} 
                ellipsizeMode="tail"
                >
                    {chatMessages?.[chatMessages.length - 1]?.displayName} : {chatMessages?.[chatMessages.length - 1]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})