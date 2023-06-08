import { StyleSheet, View, Text, FlatList } from "react-native";
import { styles } from "../assets/styles/styles";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ListCustomer(){
    const [dataCustomer, setDataCustomer] = useState([]);
    const getCustomers = async() =>{
        const customers = await axios.get(`http://127.0.0.1:3000/buscareserva`);
        setDataCustomer(customers.data);
    }

    useEffect(() => {
        if(dataCustomer.length === 0){
            getCustomers();
            console.log(dataCustomer);
        }
    },[]);

    return(
        <View style={styles.container}>
            <Text style={{color:'orange', fontSize:25}}>Listado de Reservas</Text>

            <FlatList
                data={dataCustomer}
                renderItem={({item}) => (<Text>{item.nombrecliente} {item.apellidocliente} / {item.telefonocliente} / {item.fechainicioreserva} / {item.fechafinalreserva}
                    
                </Text>)}
                //keyExtractor={item => item.id}
            />


        </View>
    )
}