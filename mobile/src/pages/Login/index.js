import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Text, Image, TextInput, TouchableOpacity } from "react-native";

import api from "../../services/api";

import styles from "./styles";

import logo from "../../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(user => {
        if (user) {
          navigation.navigate('List')
        }
      })
  }, []);

  async function handleSubmit() {
    const res = await api.post('/sessions', {
      email
    })

    const { _id } = res.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === 'ios'}
      behavior="padding" 
      style={styles.container}
    >
      <Image source={logo} alt="logo AirCnC" />
      
      <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL *</Text>
        <TextInput 
          style={styles.input}
          placeholder="Seu e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

      <Text style={styles.label}>TECNOLOGIAS *</Text>
        <TextInput 
          style={styles.input}
          placeholder="Tecnologias de interesse"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontrar Spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}