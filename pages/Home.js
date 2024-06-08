import React, { useState } from 'react';
import { StyleSheet, Text, Image, ImageBackground, Dimensions, TouchableOpacity, View } from 'react-native';
import { Video } from 'expo-av';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { usuario } = route.params;

    const [videoPlaying, setVideoPlaying] = useState(false);

    const handleBossFight = () => {
        setVideoPlaying(true);
    };

    const handleVideoPlaybackStatusUpdate = (status) => {
        if (!status.isPlaying && status.didJustFinish) {
            setVideoPlaying(false);
        }
    };

    const handleGoBack = () => {
        setVideoPlaying(false);
    };

    const handleTasksScreen = () => {
        navigation.navigate('Tareas', { usuario }); // Pasar el nombre de usuario como parámetro
    };

    if (videoPlaying) {
        return (
            <View style={styles.container}>
                <Video
                    source={require('../assets/Sekiro_video.mp4')}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                    onPlaybackStatusUpdate={handleVideoPlaybackStatusUpdate}
                    shouldPlay={true}
                />
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
            </View>
        );
    }
 
    return (
        <ImageBackground source={require('../assets/c36fdf6f58dd9cc4c5912ad7e6030371.jpg')} style={styles.backgroundImage}>
            <View style={styles.contentContainer}>
                <Image source={require('../assets/escultor.png')} style={styles.logo} />
                <Text style={styles.welcome}>¡Bienvenido! {usuario}</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleTasksScreen}
                >
                    <Text style={styles.buttonText}>Ir a Tareas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleBossFight}
                >
                    <Text style={styles.buttonText}>Boss Fight</Text>
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
        alignItems: 'center',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ededd3',
        backgroundColor: '#372919',
        borderRadius: 5,
        padding: 5,
        marginTop: 20, // Adjust as needed
    },
    button: {
        padding: 10,
        borderRadius: 5,
        width: '50%',
        backgroundColor: '#4f0c00',
        alignItems: 'center',
        marginTop: 20,
    },
    tasksButton: {
        padding: 10,
        borderRadius: 5,
        width: '50%',
        backgroundColor: '#0c4f00',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        position: 'absolute',
        top: (windowHeight - windowHeight / 2) / 2,
        left: (windowWidth - windowWidth / 2) / 2,
        width: windowWidth / 2,
        height: windowHeight / 2,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 20,
    },
    logo: {
        width: 150, // Adjust width as needed
        height: 150, // Adjust height as needed
        marginBottom: 20, // Adjust as needed
    },
});

export default HomeScreen;
