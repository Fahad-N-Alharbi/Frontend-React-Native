// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    axios.post('https://6731-2001-16a2-e717-7d00-a4af-29d0-ac5c-8dce.ngrok-free.app/api/login', { email, password })
      .then(response => {
        if (response.data.success) {
          // حفظ التوكن في الذاكرة أو تخزينه في مكان آمن
          // ثم الانتقال إلى صفحة الطلبات
          navigation.navigate('Orders');
        } else {
          Alert.alert('Error', 'Invalid email or password');
        }
      })
      .catch(error => {
        Alert.alert('Error', 'Something went wrong');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
