import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ImageBackground, Image, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const InicioScreen = ({ navigation }) => {
    return (
        <ImageBackground source={require('../assets/Fondo1.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Image source={require('../assets/Sekiro.png')} style={styles.logo} />
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.buttonText}>Registro</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: windowWidth,
        height: windowHeight,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20, 
    },
    button: {
        backgroundColor: '#800040',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default InicioScreen;
