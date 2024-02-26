import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import s from './gstyle';


const App = () => {
  return (
    <>
      <SafeAreaView style={s.container}>
        <View style={s.header}>
          <Text>Header</Text>
        </View>
        <View style={s.body}>
          <Text>Body</Text>
        </View>
      </SafeAreaView>
        <View style={s.footer}>
          <Text>Footer</Text>
        </View>
    
    </>
  );
}

export default React.memo(App);