import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from "react-native";
import * as ImagePicker from 'expo-image-picker'
import * as Permission from 'expo-permissions'

export const IntroScreen = ({navigation}) => {

    // это коробочная функция, которая бкдут спрашивать права на использование (даешь доступ к камере и галереи)
    //доступ не дали, значит "нет прав"
    async function askForPermission() {
        const {status} = await Permission.askAsync(
            Permission.CAMERA,
            Permission.CAMERA_ROLL
        );
        if (status !== 'granted') {
            Alert.alert('У вас нет прав!');
            return false
        }
        return true
    }
// в первую очередь спрашиваем есть ли у нас доступы, затем задаем константу Image
    const takePhotoHandler = async () => {
        const hasPermissions = await askForPermission();
        if (!hasPermissions) {
            return
        }
// в которой мы берем коробочную ф реакта и запускаем камеру 
// quality- нарезка качества от первоначального 
// allowsEditing- доступ на редактирование 
// aspect- соотношение сторон
        const img = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: true,
            aspect: [3, 4]
        });
// передаем ревью компонент с картинкой с URL (кнопочка, что фотографирует, вызывает функцию TakePhoto)
        navigation.navigate('Review', {image: img.uri})
    };

    return (
        <View style={styles.container}>
                <Text style={styles.text}>Фото редактор</Text>
                <TouchableOpacity
                    style={styles.goButton}
                    onPress={takePhotoHandler}
                >
                    <Text style={styles.goButtonText}>Сделать фото</Text>
                </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#505050'
    },
    text: {
        color: '#fff',
        fontSize: 32
    },
    goButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#fff',
        padding: 10,
        width: '50%',
        marginTop: 20
    },
    goButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
