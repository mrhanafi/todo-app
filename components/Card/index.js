import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import s from './style';

const Card = ({todo}) => {
    return (
        <TouchableOpacity style={s.card}>
           <Text style={[s.title, todo.isCompleted && {textDecorationLine: "line-through"}]}>{todo.title}</Text>
           {todo.isCompleted && <Image style={s.check} source={require('../../assets/check.png')} />}
        </TouchableOpacity>
    );
}

export default React.memo(Card);