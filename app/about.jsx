import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Goals_About = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/goal.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
        <Text style={styles.title}>About Goals</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          This is the Goals app where you can track and manage your daily goals.
        </Text>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>• Add new goals</Text>
          <Text style={styles.featureText}>• Mark goals as complete</Text>
          <Text style={styles.featureText}>• Track your progress</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          if(router.canGoBack()){
            router.back();
          } else {
            router.replace('/(tabs)');
          }
        }}
      >
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: '25%',
    backgroundColor: '#5e08cc',
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 75,
    height: 75,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5e08cc',
    marginBottom: 15,
  },
  featureItem: {
    marginLeft: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#5e08cc',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Goals_About;