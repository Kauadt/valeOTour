import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Animated, Dimensions } from 'react-native';
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen({ navigation }) {
  const [logoOpacity] = useState(new Animated.Value(1)); 
  const [textPosition] = useState(new Animated.Value(50));
  const [logoPosition, setLogoPosition] = useState({ y: 0, height: 0 }); 

  const onLogoLayout = (event) => {
    const { y, height } = event.nativeEvent.layout;
    setLogoPosition({ y, height });
  };

  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    Animated.timing(textPosition, {
      toValue: -(screenHeight / 2) + 50,
      duration: 2000,
      delay: 2000,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      checkLogin();
    }, 5000); 

    return () => clearTimeout(timeout); 
  }, [logoOpacity, textPosition, screenHeight]);

  const [logged, setLogged] = useState(0);

  const checkLogin = async () => {
    const user = await AsyncStorage.getItem('@user');

    if (user) {
      setLogged(1);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } else {
      setLogged(2)
      navigation.replace('Welcome');
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Animated.Image
          source={require('../../assets/logo.png')}
          style={[styles.logo, { opacity: logoOpacity }]}
          onLayout={onLogoLayout} 
        />
      </View>

      <Animated.View style={[styles.footer, { transform: [{ translateY: textPosition }] }]}>
        <Text style={styles.text}>ValeOTour!</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 200,
  },
  footer: {
    position: 'absolute',
    bottom: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 38,
    color: colors.white,
    fontFamily: fonts.bold,
  },
});
