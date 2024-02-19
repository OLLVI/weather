import { View, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

const api = {
    url: process.env.EXPO_PUBLIC_API_URL,
    key: process.env.EXPO_PUBLIC_API_KEY,
    icons: process.env.EXPO_PUBLIC_ICONS_URL
}

export default function Weather(props) {
    const [temp, setTemp] = useState(0);
    const [icon, setIcon] = useState('');
    const [desc, setDesc] = useState('');


    useEffect(() => {
        const url =
            api.url +
            'lat=' + props.latitude +
            '&lon=' + props.longitude +
            '&appid=' + api.key +
            '&units=metric';
    
        console.log(url);
    
        fetch(url)
            .then(res => res.json())
            .then((json) => {
                if (json && json.main && json.main.temp && json.weather && json.weather[0]) {
                    setTemp(json.main.temp);
                    setIcon(api.icons + json.weather[0].icon + '@2x.png');
                    setDesc(json.weather[0].description);
                } else {
                    setDesc('Error: Unexpected response structure');
                    console.error('Unexpected API response:', json);
                }
            })
            .catch((error) => {
                setDesc('Error retrieving weather info: ' + error);
                console.error('Fetch Error:', error);
            });
    }, []);
    

return (
    <View>
        <Text style={styles.temp}>{temp}</Text>
        {icon &&
        <Image source={{uri: icon}} style={{width: 100, height: 100}} />
        }
        <Text>{desc}</Text>
    </View>
);
}

const styles = StyleSheet.create({
    temp: {
        fontSize: 40
    }
});
