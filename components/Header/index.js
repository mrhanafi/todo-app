import React from 'react';
import { Image, Text } from 'react-native';
import s from './style';

const Header = () => {
    return (
        <>
            <Image style={s.img} source={require('../../assets/logo.png')} 
            resizeMode='contain' />
            <Text style={s.subtitle}>You probably have something to do</Text>
        </>
    );
}

export default React.memo(Header);