import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';

import SignUpScreen from './SignUpScreen'; 
import OrdersScreen from './screens/OrdersScreen';
import CreateOrderScreen from './screens/CreateOrderScreen';

const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios.post('https://6731-2001-16a2-e717-7d00-a4af-29d0-ac5c-8dce.ngrok-free.app/api/login', {
      email: email,
      password: password
    })
    .then(response => {
      console.log('Login Success:', response.data);
      const { token, user_id } = response.data; // استخرج التوكن ومعرّف المستخدم
      if (token && user_id) {
        // إعادة توجيه المستخدم إلى صفحة الطلبات وتمرير التوكن ومعرّف المستخدم
        navigation.navigate('Orders', { token, user_id });
      } else {
        Alert.alert(
          'Login Error',
          'The email or password you entered is incorrect. Please try again.',
          [{ text: 'OK' }]
        );
      }
    })
    .catch(error => {
      console.error('Login Error:', error.response || error);
      Alert.alert(
        'Login Error',
        'The email or password you entered is incorrect. Please try again.',
        [{ text: 'OK' }]
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Rodud</Text>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
      />
      
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <Button title="Login" onPress={handleLogin} />

      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: "5%",
  },
  headerTitle: {
    fontSize: 25,
    paddingHorizontal: "39%",
    fontWeight: "700",
    color: "#800080",
    marginTop: "10%",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20, 
    paddingHorizontal: 10,
    marginBottom: 16,
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
         <Stack.Screen name="CreateOrder" component={CreateOrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
