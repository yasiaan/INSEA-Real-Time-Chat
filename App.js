import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import loginScreen from './screens/loginScreen';
import registerScreen from './screens/registerScreen';
import homeScreen from './screens/homeScreen';
import addChatScreen from './screens/addChatScreen';
import chatScreen from './screens/chatScreen';
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#32ba6f"},
  headerTitleStyle: { color: "white"},
  headerTintColor: "white",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={globalScreenOptions}
      >
        <Stack.Screen name="Login" component={loginScreen}/>
        <Stack.Screen name="Register" component={registerScreen}/>
        <Stack.Screen name="Home" component={homeScreen}/>
        <Stack.Screen name="AddChat" component={addChatScreen}/>
        <Stack.Screen name="Group" component={chatScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
