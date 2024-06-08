import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Dimensions, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import tasksData from './tasks.json'; // Importar datos del archivo tasks.json

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TasksScreen = ({ navigation, route }) => {
    const { usuario } = route.params; // Recibir el nombre de usuario como parámetro

    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {
        setTasks(tasksData);
    };

    const handleAddTask = () => {
        if (taskTitle && taskDescription) {
            const newTask = {
                id: Date.now(),
                title: taskTitle,
                description: taskDescription,
                author: usuario, // Utilizar el nombre de usuario como autor
                date: new Date().toISOString().slice(0,10), // Tomar la fecha actual de creación
                completed: false
            };
            setTasks([...tasks, newTask]);
            setTaskTitle('');
            setTaskDescription('');
        }
    };

    const handleEditTask = (task) => {
        setTaskTitle(task.title);
        setTaskDescription(task.description);
        setEditingTask(task);
    };

    const handleSaveTask = () => {
        setTasks(tasks.map(task => task.id === editingTask.id ? { ...task, title: taskTitle, description: taskDescription } : task));
        setTaskTitle('');
        setTaskDescription('');
        setEditingTask(null);
    };

    const handleViewTask = (task) => {
        alert(`Título: ${task.title}\nDescripción: ${task.description}\nFecha de creación: ${task.date}\nAutor: ${task.author}`);
    };

    const handleCompleteTask = (task) => {
        setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: true } : t));
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const renderItem = ({ item }) => (
        <View style={styles.taskItem}>
            <Text style={[styles.taskText, item.completed && styles.completedTask, styles.borderText]}>{item.title}</Text>
            {!item.completed && (
                <>
                    <TouchableOpacity style={styles.button} onPress={() => handleEditTask(item)}>
                        <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handleViewTask(item)}>
                        <Text style={styles.buttonText}>Ver</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handleCompleteTask(item)}>
                        <Text style={styles.buttonText}>Completado</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );

    return (
        <ImageBackground source={require('../assets/c36fdf6f58dd9cc4c5912ad7e6030371.jpg')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={[styles.title, styles.borderText]}>Lista de Tareas</Text>
                <TextInput
                    style={[styles.textInput, styles.borderText]}
                    placeholder="Título"
                    value={taskTitle}
                    onChangeText={setTaskTitle}
                />
                <TextInput
                    style={[styles.textInput, styles.borderText]}
                    placeholder="Descripción"
                    value={taskDescription}
                    onChangeText={setTaskDescription}
                />
                <TouchableOpacity
                    style={[styles.addButton, styles.borderText]}
                    onPress={editingTask ? handleSaveTask : handleAddTask}
                >
                    <Text style={[styles.addButtonText, styles.borderText]}>{editingTask ? 'Guardar' : 'Agregar'}</Text>
                </TouchableOpacity>
                <FlatList
                    data={tasks}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                />
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
        color: '#ededd3',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        backgroundColor: '#372919',
        color: '#ededd3',
        marginBottom: 10,
    },
    addButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        width: '50%',
        backgroundColor: '#4f0c00',
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    taskText: {
        fontSize: 16,
        color: '#000',
    },
    completedTask: {
        textDecorationLine: 'line-through',
        color: '#ccc',
    },
    button: {
        padding: 5,
        backgroundColor: '#4f0c00',
        borderRadius: 5,
        marginLeft: 10,
    },
    buttonText: {
        color: '#fff',
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

export default TasksScreen;
