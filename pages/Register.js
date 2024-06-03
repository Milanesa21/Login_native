import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Dimensions, Alert, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importa el icono de MaterialIcons

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Register = ({ navigation }) => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        // Validar el usuario
        if (usuario.length < 5 || usuario.length > 10) {
            setError('El nombre de usuario debe tener entre 5 y 10 caracteres.');
            return;
        }
        
        // Validar la contraseña
        if (password.length < 5) {
            setError('La contraseña debe tener al menos 5 caracteres.');
            return;
        }
        if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setError('La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un símbolo.');
            return;
        }

        const newUsuario = { usuario, password };
        navigation.navigate('Login', { newUsuario });
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
                <Text style={[styles.title, styles.borderText, { color: '#FFFFFF' }]}>Registro</Text>
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
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={[styles.registerButtonText, styles.borderText]}>Registrarse</Text>
                </TouchableOpacity>
                {error ? (
                    <View style={styles.errorContainer}>
                        <Text style={[styles.errorText, styles.borderText, {fontWeight: 'bold'}]}>{error}</Text>
                        <Image source={require('../assets/IMAGENIMPORTANTE-Photoroom.png')} style={styles.errorImage} resizeMode="contain" />
                    </View>
                ) : null}
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
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0e88c9',
        marginBottom: 30,
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
        backgroundColor: '#800040',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        backgroundColor: '#909edd',
        color: 'black',
    },
    registerButton: {
        marginTop: 13,
        padding: 10,
        borderRadius: 5,
        width: '50%',
        backgroundColor: '#4f0c00',
        alignItems: 'center',
    },
    registerButtonText: {
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
        fontWeight: 10,
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

export default Register;
