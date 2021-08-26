import React, { useLayoutEffect, useEffect, useState } from "react";
import { StyleSheet, Text, KeyboardAvoidingView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Image } from 'react-native-elements';
import { auth } from "../firebase";


const loginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home");
            }
        });

        return unsubscribe; 
    }, []);

    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to login",
            headerTitleAlign: "center",
        })
    }, [navigation]);

    const signIn = () => {
        auth?.signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error));
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image
                source={{
                    uri:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/INSEA_logo.png/707px-INSEA_logo.png',
                }}
                style={{ width: 100, height: 100 }}
            />
            <View style={styles.inputContainer}>
                <Input 
                placeholder="Email" 
                autoFocus 
                type="email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                />
                <Input 
                placeholder="Password" 
                secureTextEntry 
                type="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                onSubmitEditing={signIn}
                />
            </View>

            <Button containerStyle={styles.button1} type="outline" onPress={signIn} title="Login" />
            <Button onPress={() => navigation.navigate('Register')} containerStyle={styles.button2} type="outline" title="Register" />
        </KeyboardAvoidingView>
    )
}

export default loginScreen

const styles = StyleSheet.create({
    inputContainer: {
        width: 300,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        padding: 10,
    },
    button1:{
        width: 200,
        marginTop: 10,
        backgroundColor: '#32ba6f',
        color: 'white',
    },
    button2:{
        width: 200,
        marginTop: 10,
        color: 'white',
    },
})
