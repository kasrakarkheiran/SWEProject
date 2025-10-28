//Use this file to implement API calls
import axios from 'axios';

const URL = "http://localhost:3000";

export async function getAllAccounts(){
    const response = await axios.get(`${URL}/accounts`);
    if (response.status === 200) {
        return response.data;
    }
    else{
        return null;
    }
}

export async function createAccount(accountObject){
    const response = await axios.post(`${URL}/accounts/create`, accountObject);
    return response;
}

export async function deleteAccount(id){
    const response = await axios.delete(`${URL}/accounts/delete/${id}`);
    return response;
}

export async function getOneAccount(id)
{
    const response = await axios.get(`${URL}/accounts/${id}`);
    if (response.status === 200) {
        return response.data;
    }
    else{
        return null;
    }
}

export async function updateAccount(id, accountObject)
{
    const response = await axios.put(`${URL}/accounts/update/${id}`, accountObject);
    return response;
}