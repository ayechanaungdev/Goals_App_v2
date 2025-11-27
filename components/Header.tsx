import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

type HeaderProps = {
  title: string;
  onAboutPress: () => void;
};

const Header = ({ title, onAboutPress }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.title}>{title}</Text>
        <Image
          source={require('../assets/images/goal.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>

      <Pressable 
        style={({ pressed }) => [
          styles.aboutButton,
          pressed && { opacity: 0.7 }
        ]}
        onPress={onAboutPress}
      >
        <Text style={styles.aboutButtonText}>i</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '12%',
    padding: 16,
    backgroundColor: '#5e08cc',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  logo: {
    width: 36,
    height: 36,
  },
  aboutButton: {
    marginTop: 28,
    position: 'absolute',
    right: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 28,
    height: 28,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default Header;