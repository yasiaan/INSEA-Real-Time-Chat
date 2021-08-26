import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Image, Text } from 'react-native-elements';
import { auth } from '../firebase';

const registerScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to login",
            headerTitleAlign: "center",
        })
    }, [navigation]);

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || 
                'https://oasys.ch/wp-content/uploads/2019/03/photo-avatar-profil.png',
            });
        })
        .catch(error => alert(error.message));
    };

    return (
        <View behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <View style={{height: 100}}></View>
            <Text h3 style={{ marginBottom: 50}}>
                Create your account
            </Text>

            <View style={styles.inputContainer}>
                <Input 
                placeholder="Full Name" 
                autofocus 
                type="text" 
                value={name} 
                onChangeText={text => setName(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Input 
                placeholder="Email" 
                type="email" 
                value={email} 
                onChangeText={text => setEmail(text)}
                />
            </View>
            
            <View style={styles.inputContainer}>
                <Input 
                placeholder="Password" 
                type="password"
                secureTextEntry 
                value={password} 
                onChangeText={text => setPassword(text)}
                />
            </View>
            
            <View style={styles.inputContainer}>
                <Input 
                placeholder="Profile Picture URL (optional)" 
                type="text" 
                value={imageUrl} 
                onChangeText={text => setImageUrl(text)}
                onSubmitEditing={register}

                />
            </View>

            <Button 
            raised 
            onPress={register} 
            title="Register" 
            type="outline"
            style={styles.button}
            />

        </View>
    )
}

export default registerScreen

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
    button:{
        width: 200,
        marginTop: 10,
        color: 'black',
    },
});