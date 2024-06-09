import React, { useState } from 'react';
import { StyleSheet, Text, ImageBackground, View, Switch, Picker, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ConfiguracionesScreen = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('es');
    const navigation = useNavigation();

    const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

    return (
        <ImageBackground source={require('../assets/c36fdf6f58dd9cc4c5912ad7e6030371.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.contentContainer}>
                    <Text style={styles.header}>Configuraciones</Text>
                    <View style={styles.settingItem}>
                        <Text style={styles.settingText}>Activar modo oscuro</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
                            onValueChange={toggleSwitch}
                            value={isDarkMode}
                        />
                    </View>
                    <View style={styles.settingItem}>
                        <Text style={styles.settingText}>Seleccionar idioma de la aplicación</Text>
                        <Picker
                            selectedValue={selectedLanguage}
                            style={styles.picker}
                            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
                        >
                            <Picker.Item label="Español" />
                            <Picker.Item label="Inglés" />
                            <Picker.Item label="Guarani" />
                        </Picker>
                    </View>
                </View>
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
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: add a semi-transparent background
        padding: 20,
        borderRadius: 10,
        width: '90%',
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ededd3',
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    settingText: {
        fontSize: 20,
        color: '#ededd3',
    },
    picker: {
        height: 50,
        width: 150,
        color: '#ededd3',
    },
    backButton: {
        backgroundColor:'#800040',
        borderRadius: 10,
        position: 'absolute',
        top: 20,
        left: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
});

export default ConfiguracionesScreen;
