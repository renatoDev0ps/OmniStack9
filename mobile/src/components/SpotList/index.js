import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

import api from "../../services/api";

export default function SpotList({ tech }) {
  const [spots, setSpots] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function loadSpots() {
      const res = await api.get('/spots', {
        params: { tech }
      })

      setSpots(res.data); 
    }

    loadSpots();
  }, []);

  function handleNavigate(spot) {
    navigation.navigate('Book', { spot });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>
    
      <FlatList 
        style={styles.list}
        data={spots}
        keyExtractor={spot => spot._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: spot }) => (
          <View style={styles.listItem}>
            <Image style={styles.thumbnail} source={{ uri: spot.thumbnail_url }} />
            <Text style={styles.company}>{spot.company}</Text>
            <Text style={styles.price}>{spot.price ? `R$ ${spot.price} /dia` : 'GRATUITO'}</Text>
            <TouchableOpacity onPress={() => handleNavigate(spot)} style={styles.button}>
              <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}