import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importa el icono de MaterialIcons

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const validarLogin = (usuario, contraseña, usuarios) => {
    if (!usuarios) return false; // Si no hay usuarios, retornar falso directamente
    const usuarioValido = usuarios.find(u => u.usuario === usuario && u.password === contraseña);
    return !!usuarioValido;
};

const LoginScreen = ({ navigation, route }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (route.params?.newUsuario) {
            setUsuarios(prevUsuarios => [...prevUsuarios, route.params.newUsuario]);
        }
    }, [route.params?.newUsuario]);

    const handleLogin = () => {
        if (validarLogin(usuario, password, usuarios)) {
            navigation.navigate('Home', { usuario });
        } else {
            setError(true);
        }
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <ImageBackground source={require('../assets/784402.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={[styles.title, styles.borderText, { color: '#FFFFFF' }]}>¡Bienvenido!</Text>
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: '#FFFFFF' }]}>Usuario</Text>
                    <TextInput
                        style={[styles.textInput, { backgroundColor: '#800040' }]}
                        value={usuario}
                        onChangeText={setUsuario}
                        autoCapitalize="none"
                        keyboardType="default"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={[styles.label, { color: '#FFFFFF' }]}>Contraseña</Text>
                    <TextInput
                        style={[styles.textInput, { backgroundColor: '#800040' }]}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={[styles.loginButtonText, styles.borderText]}>Iniciar sesión</Text>
                </TouchableOpacity>

                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={[styles.errorText, styles.borderText, {fontWeight: 'bold'}]}>Usuario no válido</Text>
                        <Image source={require('../assets/IMAGENIMPORTANTE-Photoroom.png')} style={styles.errorImage} resizeMode="contain" />
                    </View>
                )}
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
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 10,
        width: '100%',
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    textInput: {
        borderWidth: 0,
        borderRadius: 5,
        padding: 10,
        width: '100%',
        color: '#FFFFFF',
        backgroundColor: '#800040',
    },
    loginButton: {
        marginTop: 13,
        padding: 10,
        borderRadius: 5,
        width: '50%',
        backgroundColor: '#4f0c00',
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    errorText: {
        color: '#ff0000',
        fontSize: 25,
        marginBottom: 10,
    },
    errorImage: {
        width: '80%',
        height: 150,
    },
    backButton: {
        backgroundColor:'#800040',
        borderRadius: 10,
        position: 'absolute',
        top: 20,
        left: 20,
        width: '150 px',
        height: '100 px', 
        zIndex: 999, 
    },
    borderText: {
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});

export default LoginScreen;
