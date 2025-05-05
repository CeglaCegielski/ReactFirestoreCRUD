import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import {db,doc,updateDoc,deleteDoc } from "../Firebase/index";

const ShoppingItem = (props) => {
    const [isChecked,setIsChecked] = useState(props.isChecked);

    const updateIsChecked = async() => {
        await updateDoc(doc(db, "zakupy", props.id),{
          isChecked: isChecked
        })
      }
      
      const deleteShoppinItem = async() =>{
        await deleteDoc(doc(db, "zakupy", props.id));
        props.getList();
      }
  
      useEffect(()=>{
        updateIsChecked();
      },[isChecked])

  return (
    <View style = {styles.container}>
        
        <Pressable onPress={()=> setIsChecked(!isChecked)}>      
            {
            isChecked ? (
                <AntDesign name="checksquare" size={24} color="black" />
            ):(
                <AntDesign name="checksquareo" size={24} color="black" />
            )
            }
        </Pressable>
        <Text style={styles.title}>{props.produce}</Text>
        <Pressable onPress={deleteShoppinItem}>
            <AntDesign name="delete" size={24} color="black" /> 
        </Pressable>
    </View>
  )
}

export default ShoppingItem

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-between",
        padding: 10,
        alignItems:"center",
    },
    title:{
        flex: 1,
        marginLeft: 10,
        fontSize: 20
    }
})