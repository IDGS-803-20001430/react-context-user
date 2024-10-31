// Este archivo representa la definición del estado, aqui estará el estado que se va a consumir

import axios from "axios";
import UserReducer from "./UserReducer"
import UserContext from "./UserContext";
import { useReducer } from "react";

const UserState = (props) => {

    //Definimos un estado inicial
    const inicialState = {
        users: [],
        selectedUser: null,
    }

    //Definimos un userReducer para manejar el estado de la aplicación
    const [state,dispatch] = useReducer(UserReducer, inicialState);
    //Metodo para obtener los datos de los usuarios
    const getUsers = async () => {
        const res = await axios.get('https://reqres.in/api/users');
        console.log(res.data.data); 
        dispatch({
            type: 'GET_USERS',
            payload: res.data.data
        });       
    }
    //Metodo para obtener los datos de un usuario especifico
    const getProfile = async (id) => {
        const res = await axios.get('https://reqres.in/api/users/'+id);
        console.log(res.data.data);   
        dispatch({
            type: 'GET_PROFILE',
            payload: res.data.data
        });      
    }

    //Metodo para crear un nuevo usuario
    const postUser = async (data) => {
        const res = await axios.post('https://reqres.in/api/users', data);
        console.log(res.data);
        dispatch({
            type: 'POST_USER',
            payload: res.data
        });
        return res.data; 
    }

    //Metodo para actualiza un usuario
    const putUser = async (data) => {
        const res = await axios.put('https://reqres.in/api/users/2',data);
        console.log(res.data);   
        dispatch({
            type: 'POST_USER',
            payload: res.data
        });  
        return res.data;    
    }

    // Metodo para eliminar un usuario
    const deleteUser = async (id) => {
        const res = await axios.delete(`https://reqres.in/api/users/${id}`);
        console.log(res.data);
        dispatch({
            type: 'DELETE_USER',
            payload: id // Retornamos el ID del usuario eliminado
        });
    }

  return (
    // Todos los componentes dentro de UserContext van a poder acceder al state 
    <UserContext.Provider value={{
        users: state.users,
        selectedUser: state.selectedUser,
        getUsers,
        getProfile,
        postUser,
        putUser,
        deleteUser
    }}>
        {props.children}
    </UserContext.Provider>
  )
}

export default UserState