import React, { useState, useEffect } from "react";
import { ScrollView, SafeAreaView, Image, AsyncStorage } from "react-native";

import SpotList from "../../components/SpotList";

import styles from "./styles";

import logo from "../../assets/logo.png";

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('techs')
      .then(storagedTechs => {
        const techsArray = storagedTechs.split(',').map(tech => tech.trim());

        setTechs(techsArray)
      })
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logo} alt="logo AirCnC" />
        <ScrollView>
          {techs.map(tech => <SpotList key={tech} tech={tech} />)}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}