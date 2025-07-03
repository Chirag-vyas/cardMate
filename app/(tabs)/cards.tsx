import { Image, StyleSheet, View, Text } from 'react-native';

export default function MyCards() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/cardMateLogo.png')} style={styles.logo} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  greeting: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
