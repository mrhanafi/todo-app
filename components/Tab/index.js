import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import s from './style';

const Tab = ({selectedTabName, onPress, todoList}) => {

    const countByStatus = todoList.reduce((acc,todo) => {
        todo.isCompleted ? acc.done++ : acc.inProgress++
        return acc;
    },{
        all: todoList.length,
        inProgress: 0,
        done: 0
    });
    console.log(countByStatus);

    const getTextStyle = (tabName) => {
        return {
            fontWeight: 'bold',
            color: selectedTabName === tabName ? "#2f76e5" : 'black'
        }
    }

    return (
        <View style={s.container}>
            <TouchableOpacity onPress={() => onPress('all')}>
                <Text style={getTextStyle("all")}>All ({countByStatus.all})</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPress('inProgress')}>
                <Text style={getTextStyle("inProgress")}>In Progress ({countByStatus.inProgress})</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onPress('done')}>
                <Text style={getTextStyle("done")}>Done ({countByStatus.done})</Text>
            </TouchableOpacity>
        </View>
    );
}

export default React.memo(Tab);