import axios from 'axios';
import { StyleSheet, Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput,Button } from 'react-native-paper';

export default function App() {

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: ''
    }
  });
  const onSubmit = data => console.log(data);


  return (
    <View style={styles.container}>

    <Controller
          control={control}
          rules={{
          required: true,
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
        {errors.firstName && <Text style={{color:'red'}}>El nombre es obligatorio</Text>}

        <Controller
          control={control}
          rules={{
          maxLength: 100,
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

        {errors.firstName && <Text style={{color:'red'}}>El nombre es obligatorio</Text>}

        <View style={{flexDirection:'row'}}>
          <Button 
          icon="plus-box" 
          mode="contained" 
          onPress={() => console.log('Pressed')}
          style={{backgroundColor:'orange'}}
          >
            
            Guardar
          </Button>
          <Button 
          icon="card-search-outline" 
          mode="contained" 
          onPress={() => console.log('Pressed')}
          style={{backgroundColor:'blue'}}
          >
            
            Buscar
          </Button>
        </View>

        <View style={{flexDirection:'row'}}>
          <Button 
          icon="update" 
          mode="contained" 
          onPress={() => console.log('Pressed')}
          style={{backgroundColor:'green'}}
          >
           Actualizar
          </Button>
          <Button 
          icon="delete-empty-outline" 
          mode="contained" 
          onPress={() => console.log('Pressed')}
          style={{backgroundColor:'red'}}
          >
            Eliminar
          </Button>
        </View>

          <Button 
          icon="list-box-outline" 
          mode="contained" 
          onPress={() => console.log('Pressed')}
          style={{backgroundColor:'red'}}
          >
            listar
          </Button>


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
