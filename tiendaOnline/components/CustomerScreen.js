import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput,Button } from 'react-native-paper';
import { useState, useEffect } from 'react';

export default function CustomerScreen() {

    const image = {uri:"https://firebasestorage.googleapis.com/v0/b/hotel-app-4a5f3.appspot.com/o/INTERFAZ%20CON%20EL%20PRFESOR%2FBANNER.jpg?alt=media&token=969a2840-d321-4aae-8f04-07553de61e16"}
    const [mensaje, setMensaje]= useState('');
    const [isError, setIsError]= useState(false);
    const [isSearch, setSearch]= useState('');

  const { control, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      nombre: '',
      descripcion: '',
      precio: '',
      numeropersonas: '',
    }
  });
  const onSave = async (data) => {
    //console.log(data);
    let nombre = data.nombre;
    let descripcion = data.descripcion;
    let precio = data.precio;
    let numeropersonas = data.numeropersonas;
    const response = await axios.post(`http://127.0.0.1:3000/registrarhabitacion`, {
      nombre,
      descripcion,
      precio,
      numeropersonas
      
    });
    try{
      
       setIsError(false);
    setMensaje('Habitacion creada correctamente');
    setTimeout(()=>{
        setMensaje('')
    },2000)
    reset();
    }
    catch(error){
      res.status(400).json({
                "mensaje":"Fallamos en la operacion de la reserva "+error
            })
    }
   
  };


  const onUpdate = async (data) => {
    //console.log(data);
    const response = await axios.put(`http://127.0.0.1:3000/editarhabitacion/${isSearch}`, {
        nombre:data.nombre,
        descripcion:data.descripcion,
        precio:data.precio,
        numeropersonas:data.numeropersonas
    });
    setIsError(false);
    setMensaje('Habitacion actualizada correctamente');
    setTimeout(()=>{
        setMensaje('')
        reset();
    },2000);
    setSearch('');
  }

  const onDele = async (data) =>{
    if(confirm(`Esta seguro de eliminar la habitacion ${data.nombre}`)){
      const response = await axios.delete(`http://127.0.0.1:3000/eliminar/${isSearch}`);
      setIsError(false);
      setMensaje('Habitacion eliminado correctamente...');
      setTimeout(() =>{
        setMensaje('');
        reset();
      },2000)
      setSearch('');
    }
  };


  const onSearch = async()=>{
    try{
    const response = await axios.get(`http://127.0.0.1:3000/buscarhabitacion/${isSearch}`);
    console.log(response.data.habitacion.nombre)
    
      if (response.data){
        if(!response.data.error){
          setValue('nombre', response.data.habitacion.nombre);
          setValue('descripcion', response.data.habitacion.descripcion);
          setValue('precio', response.data.habitacion.precio);
          setValue('numeropersonas', response.data.habitacion.numeropersonas);
          setIsError(false);
          setMensaje('');
        }
      }else{
        setIsError(true);
        setMensaje('id de cliente no existe');
    }
    }
    catch(errors){
      res.status(400).json({
                "mensaje":"Fallamos en la operacion de la reserva "+errors
            })
    }
    
  }


  return (
    <View style={styles.container}>

        <Text style={{fontSize:25,color:"red", fontFamily:"bold", marginBottom:20}} >Deseas Registrar Alguna Reserva</Text>

        <TextInput
            label="Id de la Reserva"
            mode="outlined"
            style={{marginBottom: 15}}
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
              label="Nombre"
              mode="outlined"
              left={<TextInput.Icon icon="account"/>}
              style={{marginBottom: 15}}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="nombre"
    />
        {errors.nombre?.type == 'required' && <Text style={{color:'red'}}>El nombre es obligatorio</Text>}
        {errors.nombre?.type == 'maxLength' && <Text style={{color:'red'}}>El nombre no debe de pasar mas</Text>}


        <Controller
          control={control}
          rules={{
          required: true,
          
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Description"
              mode="outlined"
              left={<TextInput.Icon icon="account-arrow-down"/>}
              style={{marginBottom: 15}}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="descripcion"
        />

        {errors.descripcion && <Text style={{color:'red'}}>El Apellido es obligatorio</Text>}

    <Controller
      control={control}
      rules={{
      required: true,
      maxLength:30
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          label="precio"
          mode="outlined"
          left={<TextInput.Icon icon="phone"/>}
          style={{marginBottom: 15}}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
        />
      )}
      name="precio"
    />
        {errors.precio?.type == 'required' && <Text style={{color:'red'}}>El nombre es obligatorio</Text>}
        {errors.precio?.type == 'maxLength' && <Text style={{color:'red'}}>El nombre no debe de pasar mas</Text>}
        
        <Controller
          control={control}
          rules={{
          required: true,
          maxLength:30
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Numero de personas"
              mode="outlined"
              left={<TextInput.Icon icon="calendar-range"/>}
              style={{marginBottom: 15}}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="numeropersonas"
    />
        {errors.numeropersonas?.type == 'required' && <Text style={{color:'red'}}>El nombre es obligatorio</Text>}
        {errors.numeropersonas?.type == 'maxLength' && <Text style={{color:'red'}}>El nombre no debe de pasar mas</Text>}
        
        {/* <Controller
          control={control}
          rules={{
          required: true,
          maxLength:30
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Fecha final"
              mode="outlined"
              left={<TextInput.Icon icon="calendar"/>}
              style={{marginBottom: 15}}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="fechafinalreserva"
    />
        {errors.fechafinalreserva?.type == 'required' && <Text style={{color:'red'}}>El nombre es obligatorio</Text>}
        {errors.fechafinalreserva?.type == 'maxLength' && <Text style={{color:'red'}}>El nombre no debe de pasar mas</Text>} */}

                
        <Text style={{color: isError ? 'red':'green'}}>{mensaje}</Text>

        <View style={{flexDirection:'row', marginBottom:10}}>
          <Button 
          icon="plus-box" 
          mode="contained" 
          onPress={handleSubmit(onSave)} 
          style={{backgroundColor:'red',marginRight:10}}
          >
            Guardar-Habitacion
          </Button>

          <Button 
          icon="card-search-outline" 
          mode="contained" 
          onPress={onSearch}
          style={{backgroundColor:'red'}}
          >
            Buscar-Habitacion
          </Button>
        </View>

        <View style={{flexDirection:'row', marginBottom:10}}>
          <Button 
          icon="update" 
          mode="contained" 
          onPress={handleSubmit(onUpdate)}
          style={{backgroundColor:'red', marginRight:10}}
          >
           Actualizar-Habitacion
          </Button>
          <Button 
          icon="delete-empty-outline" 
          mode="contained" 
          onPress={handleSubmit(onDele)}
          style={{backgroundColor:'red'}}
          >
            Eliminar-Habitacion
          </Button>

        </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#95cafe',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
