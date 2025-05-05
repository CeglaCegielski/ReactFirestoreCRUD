import { StyleSheet, Text, View, Pressable, TextInput, FlatList, ActivityIndicator } from 'react-native';
import ShoppingItem from './components/ShoppingItem';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import {app,db,getFirestore,collection,addDoc,getDocs} from "./Firebase/index"

export default function App() {

  const[produce,setProduce]=useState("");
  const[list,setList] = useState([]);

  const addItem = async() =>{
    try{
      const docRef = await addDoc(collection(db,"zakupy"),{
        produce:produce,
        isChecked: false,
      });
      console.log("Document written with ID: ",docRef.id);
      setProduce("");
    } catch (e){
      console.error("Error adding documents: ",e);
    }
    getList();
  };

  const getList = async () => {

    setList([]);

    const myShopping = [];

    const querySnapshot = await getDocs(collection(db, "zakupy"));

    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
      myShopping.push({ id: doc.id, produce: doc.data().produce });
    });

    setList(myShopping);

  };

  useEffect(() => {
    getList();
  },[]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subheader}>Lista zakupów</Text>
        <Text style={styles.subheader}>{list.length}</Text>
      </View>
      {
      list.length > 0 ? (
      <FlatList
      data={list}
      renderItem={({item})=>
      <ShoppingItem 
      id={item.id} 
      produce={item.produce} 
      isChecked={item.isChecked}  
      getList={getList}/>}
      keyExtractor={item=>item.id}
      />
      ):(
        <ActivityIndicator/>
      )}
      <TextInput 
      placeholder="Wpisz Produkt" 
      style={styles.input} 
      value={produce} 
      onChangeText={(text)=>setProduce(text)}
      onSubmitEditing={addItem}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray'
  },
  header:{
    flexDirection:"row",
    backgroundColor:"darkgray",
    alignSelf:"center",
    padding:10,
    paddingTop: 20,
    justifyContent:"space-between",
    alignItems:"center",
    width:"100%"
  },
  subheader:{
    fontSize:20,
    fontWeight:"bold",
    marginRight:"auto"
  },
  input:{
    padding:10,
    fontSize: 20,
    marginTop:"auto",
    backgroundColor:"darkgray"
  },
});
