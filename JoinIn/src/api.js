//Use this file to implement API calls
import axios from 'axios';

const URL = "http://localhost:3000";


export async function getMe(email){
    const response = await axios.get(`${URL}/me/${email.toString()}`)
    if (response.status === 200){
        return response.data;
    }
    else{
        console.log("Account verification error");
    }
}


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

export async function deleteAccount(email){
    const response = await axios.delete(`${URL}/accounts/delete/${email.toString()}`);
    return response;
}

export async function getOneAccount(email)
{
    const response = await axios.get(`${URL}/accounts/${email.toString()}`);
    if (response.status === 200) {
        return response.data;
    }
    else{
        return null;
    }
}

export async function updateAccount(email, accountObject)
{   
    try{
       const response = await axios.patch(`${URL}/accounts/update/${email.toString()}`, accountObject);
        return response; 
    }
    catch(err){ 
        return err.response.data.error;
    }
    
}

export async function updateEvents(email, events)
{
    try{
        const response = await axios.patch(`${URL}/accounts/uevents/${email.toString()}`, { events: events });
        return response;
    }catch(error){
        console.error("Error Updating Events: " , error);
        throw error;
    }
}

export async function getSubscribedEvents(email){
    try{
        const response = await axios.get(`${URL}/accounts/subscribed/${email.toString()}`);
        return response.data;
    }catch(error){
        console.log("fetching sunscribed to events error: ", error);
        throw error;
    }
}


export async function getMyEvents(email){
    try{
        const response = await axios.get(`${URL}/accounts/myEvents/${email.toString()}`)
        return response.data;
    }catch(err){
        console.log("fetching User events error: ", err);
        throw err;
    }
}


export async function getFilteredPosts(queryParams){
    try {
        const response = await axios.get(`/posts/filter?${queryParams.toString()}`);
        return response.data;
    } catch (error) {
        console.error("Error Fetching posts:", error);
        throw error;
    }
}

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

export async function verifyEmail(token) {
    const response = await axios.get(`${URL}/accounts/verify-email/${token}`);
    return response;
}

export async function sendEmailNotification(to, subject, htmlBody) {
    const response = await axios.put(`${URL}/posts/email-notif`, { to: to, subject: subject, htmlBody: htmlBody });
    return response;
}