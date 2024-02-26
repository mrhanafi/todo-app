import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import s from './gstyle';
import Header from './components/Header';
import Card from './components/Card';

// const TO_DO = ;

const App = () => {
  const [todoList, setTodoList] = useState([
    {id: 1, title: 'Test 1', isCompleted:true},
    {id: 2, title: 'Test 2', isCompleted:false},
    {id: 3, title: 'Test 3', isCompleted:false},
    {id: 4, title: 'Test 4', isCompleted:true},
    {id: 5, title: 'Test 5', isCompleted:false},
    {id: 6, title: 'Test 6', isCompleted:false},
    {id: 7, title: 'Test 7', isCompleted:true},
    {id: 8, title: 'Test 8', isCompleted:false},
    {id: 9, title: 'Test 9', isCompleted:false},
    {id: 10, title: 'Test 10', isCompleted:true},
    {id: 11, title: 'Test 11', isCompleted:false},
    {id: 12, title: 'Test 12', isCompleted:false},
  ]);

  function renderTodoList() {
    return todoList.map((todo) => (
    <View>

      <Card key={todo.id} onPress={updateTodo} todo={todo}/>
    </View>
      ))
  }

  const updateTodo = (todo) => {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted
    }
    const updatedTodoList = [...todoList];
    const indexToUpdate = updatedTodoList.findIndex(t => t.id === updatedTodo.id);

    updatedTodoList[indexToUpdate] = updatedTodo;
    setTodoList(updatedTodoList);
    // console.log(updatedTodo)
  }

  return (
    <>
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <Header />
        </View>
        <View style={s.body}>
          <ScrollView>
          {renderTodoList()}
          </ScrollView>
        </View>
      </SafeAreaView>
        <View style={s.footer}>
          <Text>Footer</Text>
        </View>
    
    </>
  );
}

export default React.memo(App);