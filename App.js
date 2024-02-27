import React, { useEffect, useRef, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import s from './gstyle';
import Header from './components/Header';
import Card from './components/Card';
import Tab from './components/Tab';
import BtnAdd from './components/BtnAdd';
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from '@react-native-async-storage/async-storage';

// const TO_DO = ;
let isFirstRender = true;
let isLoadUpdate = false;

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

  const [selectedTab, setSelectedTab] = useState('all');
  const [isAddDialogDisplayed, setIsAddDialogDisplayed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollviewRef = useRef();

  

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

  // -------------async storage----------------
  useEffect(() => {
    loadTodoList();
  },[]);

  useEffect(() => {
    if(!isLoadUpdate){
      if(!isFirstRender){
        saveTodoList();
  
      }else{
        isFirstRender = false;
      }
    }else{
      isLoadUpdate = false
    }
  },[todoList]);

  async function loadTodoList(){
    console.log('Load')
    try{
      const todoListString = await AsyncStorage.getItem("@todoList");
      const parseTodoList = JSON.parse(todoListString);
      isLoadUpdate = true;
      setTodoList(parseTodoList || []);
    }catch(err){

    }
  }

  async function saveTodoList(){
    console.log('save')
    try{
      await AsyncStorage.setItem("@todoList",JSON.stringify(todoList))
    }catch(err){
      alert(err);
    }
  }

  const getFilteredList = () => {
    switch(selectedTab){
      case "all":
        return todoList
      case "inProgress":
        return todoList.filter((todo) => !todo.isCompleted)
      case "done":
        return todoList.filter((todo) => todo.isCompleted === true)
    }
  }

  const deleteTodo = (todoToDelete) => {
    Alert.alert("Delete note?", "Are you sure you want to delete?",[
      {text:'Delete', style:"destructive",onPress:()=>{
       setTodoList(todoList.filter(t => t.id !== todoToDelete.id));
      }},
      {text:'Cancel',style:'cancel'}
    ])
  }

  function renderTodoList() {
    return getFilteredList().map((todo) => (
    <View>

      <Card key={todo.id} onLongPress={deleteTodo} onPress={updateTodo} todo={todo}/>
    </View>
      ))
  }

  const addTodo = () => {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    }
    // setTodoList([newTodo,...todoList]);
    setTodoList([...todoList,newTodo]);
    setIsAddDialogDisplayed(false);
    setInputValue("");
    setTimeout(() => {
      scrollviewRef.current.scrollToEnd()
    },300)
  }

  const renderAddDialog = () => {
    return (
      <Dialog.Container visible={isAddDialogDisplayed} onBackdropPress={() => setIsAddDialogDisplayed(false)}>
          <Dialog.Title>Add Todo</Dialog.Title>
          <Dialog.Description>
            Fill in description
          </Dialog.Description>
          <Dialog.Input onChangeText={(text) => setInputValue(text)} placeholder='Ex: go to shop'/>
          <Dialog.Button label="Cancel" color="grey" onPress={() => setIsAddDialogDisplayed(false)} />
          <Dialog.Button disabled={inputValue.length === 0} label="Save" onPress={addTodo} />
        </Dialog.Container>
    )
  }
 

  return (
    <>
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <Header />
        </View>
        <View style={s.body}>
          <ScrollView ref={scrollviewRef}> 
          {renderTodoList()}
          </ScrollView>
        </View>
        <BtnAdd onPress={() => setIsAddDialogDisplayed(true)}/>
      </SafeAreaView>
        <View style={s.footer}>
          <Tab 
          onPress={setSelectedTab} 
          selectedTabName={selectedTab} 
          todoList={todoList}
          />
        </View>
        {renderAddDialog()}
    
    </>
  );
}

export default React.memo(App);