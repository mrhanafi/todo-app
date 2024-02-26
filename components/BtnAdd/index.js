import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import s from './style';

const BtnAdd = ({onPress}) => {
    return (
    <TouchableOpacity onPress={onPress} style={s.btn}>
        <Text style={s.btntext}>+ New Todo</Text>
    </TouchableOpacity>
    );
}

export default React.memo(BtnAdd);