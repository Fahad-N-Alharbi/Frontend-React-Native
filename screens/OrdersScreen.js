import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const OrdersScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`https://6731-2001-16a2-e717-7d00-a4af-29d0-ac5c-8dce.ngrok-free.app/api/orders/3`)
      .then(response => {
        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          console.error('Failed to fetch orders');
        }
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.orderContainer}>
      <Text style={styles.orderText}>Location: {item.location}</Text>
      <Text style={styles.orderText}>Size: {item.size}</Text>
      <Text style={styles.orderText}>Weight: {item.weight}</Text>
      <Text style={styles.orderText}>Status: {item.status}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>طلباتي</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <Button
        title="إنشاء طلب جديد"
        onPress={() => navigation.navigate('CreateOrder')} // التنقل إلى صفحة CreateOrder
        style={styles.button}
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
  orderContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  orderText: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
  },
});

export default OrdersScreen;
