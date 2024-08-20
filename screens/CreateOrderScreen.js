import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const CreateOrderScreen = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');

  const handleCreateOrder = () => {
    axios.post('https://6731-2001-16a2-e717-7d00-a4af-29d0-ac5c-8dce.ngrok-free.app/api/create-order', {
      location,
      size,
      weight,
      pickup_time: pickupTime,
      delivery_time: deliveryTime,
    })
    .then(response => {
      if (response.data.success) {
        Alert.alert('Success', 'Order created successfully', [
          { text: 'OK', onPress: () => navigation.goBack() } // العودة إلى صفحة OrdersScreen
        ]);
      } else {
        Alert.alert('Error', 'Failed to create order');
      }
    })
    .catch(error => {
      console.error('Error creating order:', error);
      Alert.alert('Error', 'An error occurred while creating the order');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>إنشاء طلب جديد</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Size"
        value={size}
        onChangeText={setSize}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={weight}
        onChangeText={setWeight}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Pickup Time (YYYY-MM-DD HH:MM:SS)"
        value={pickupTime}
        onChangeText={setPickupTime}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Delivery Time (YYYY-MM-DD HH:MM:SS)"
        value={deliveryTime}
        onChangeText={setDeliveryTime}
      />
      
      <Button
        title="Create Order"
        onPress={handleCreateOrder}
      />
      
      <Button
        title="Back to Orders"
        onPress={() => navigation.goBack()} // العودة إلى صفحة OrdersScreen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default CreateOrderScreen;
