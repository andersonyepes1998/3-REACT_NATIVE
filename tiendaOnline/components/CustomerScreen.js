import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput,Button } from 'react-native-paper';
import { useState, useEffect } from 'react';

export default function CustomerScreen() {
    const [mensaje, setMensaje]= useState('');
    const [isError, setIsError]= useState(false);
    const [isSearch, setSearch]= useState('');

  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });
  const onSave = async (data) => {
    //console.log(data);
    let nombre = data.firstName
    let apellidos = data.lastName
    const response = await axios.post(`http://127.0.0.1:3000/api/clientes`, {
        nombre,
        apellidos,
    });
    setIsError(false);
    setMensaje('Cliente creado correctamente');
    setTimeout(()=>{
        setMensaje('')
    },2000)
    reset();
  };


  const onUpdate = async (data) => {
    //console.log(data);
    const response = await axios.put(`http://127.0.0.1:3000/api/clientes/${isSearch}`, {
        nombre:data.firstName,
        apellidos:data.lastName,
    });
    setIsError(false);
    setMensaje('Cliente actualizado correctamente');
    setTimeout(()=>{
        setMensaje('')
        reset();
    },2000);
    setSearch('');
  }

  const onDele = async (data) =>{
    if(confirm(`Esta seguro de eliminar al cliente ${data.firstName} ${data.lastName}`)){
      const response = await axios.delete(`http://127.0.0.1:3000/api/clientes/${isSearch}`);
      setIsError(false);
      setMensaje('Cliente eliminado correctamente...');
      setTimeout(() =>{
        setMensaje('');
        reset();
      },2000)
      setSearch('');
    }
  };

  const onSearch = async()=>{
    const response = await axios.get(`http://127.0.0.1:3000/api/clientes/${isSearch}`);
    console.log(response.data)
    if (!response.data.error){
        setValue('firstName', response.data.nombre);
        setValue('lastName', response.data.apellidos);
        setIsError(false);
        setMensaje('');
    }else{
        setIsError(true);
        setMensaje('id de cliente no existe');
    }
  }


  return (
    <View style={styles.container}>
        <TextInput
            label="Id del cliente"
            mode="outlined"
            style={{marginBottom: 20}}
            onChangeText={isSearch => setSearch(isSearch)}
            value={isSearch}
        />
    <Controller
          control={control}
          rules={{
          required: true,
          maxLength:30
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Nombre completo"
              mode="outlined"
              left={<TextInput.Icon icon="account"/>}
              style={{marginBottom: 20}}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="firstName"
        />
        {errors.firstName?.type == 'required' && <Text style={{color:'red'}}>El nombre es obligatorio</Text>}
        {errors.firstName?.type == 'maxLength' && <Text style={{color:'red'}}>El nombre no debe de pasar mas</Text>}


        <Controller
          control={control}
          rules={{
          required: true,
          
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Apellidos"
              mode="outlined"
              left={<TextInput.Icon icon="account"/>}
              style={{marginBottom: 20}}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="lastName"
        />

        {errors.firstName && <Text style={{color:'red'}}>El Apellido es obligatorio</Text>}


        <Text style={{color: isError ? 'red':'green'}}>{mensaje}</Text>

        <View style={{flexDirection:'row', marginBottom:10}}>
          <Button 
          icon="plus-box" 
          mode="contained" 
          onPress={handleSubmit(onSave)} 
          style={{backgroundColor:'orange',marginRight:10}}
          >
            Guardar
          </Button>

          <Button 
          icon="card-search-outline" 
          mode="contained" 
          onPress={onSearch}
          style={{backgroundColor:'blue'}}
          >
            Buscar
          </Button>
        </View>

        <View style={{flexDirection:'row', marginBottom:10}}>
          <Button 
          icon="update" 
          mode="contained" 
          onPress={handleSubmit(onUpdate)}
          style={{backgroundColor:'green', marginRight:10}}
          >
           Actualizar
          </Button>
          <Button 
          icon="delete-empty-outline" 
          mode="contained" 
          onPress={handleSubmit(onDele)}
          style={{backgroundColor:'red'}}
          >
            Eliminar
          </Button>

        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
