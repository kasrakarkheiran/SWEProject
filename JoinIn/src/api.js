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

//wadadwawdawwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww

export async function getAllPosts(){
    const response = await axios.get(`${URL}/posts`);
    if (response.status === 200) {
        return response.data;
    }
    else{
        return console.log("Error");
    }
}

export async function createPost(accountObject){
    const response = await axios.post(`${URL}/posts/create`, accountObject);
    return response;
}

export async function deletePost(id){
    const response = await axios.delete(`${URL}/posts/delete/${id}`);
    return response;
}

export async function getOnePost(id)
{
    const response = await axios.get(`${URL}/posts/${id}`);
    if (response.status === 200) {
        return response.data;
    }
    else{
        return null;
    }
}

export async function updatePost(id, accountObject)
{
    const response = await axios.put(`${URL}/posts/update/${id}`, accountObject);
    return response;
}