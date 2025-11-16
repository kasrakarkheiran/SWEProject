import { createAccount } from "../api"
import { useState } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export function CreateAccount() {

    const [user, setUser] = useState( {
        name: "",
        email: "",
        password: "",
        dateCreated: new Date()
    });

    function handleSignup() {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCred => console.log("User created:", userCred.user))
            .catch(err => console.error(err));
    }

    function handleLogin() {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCred => console.log("Logged in:", userCred.user))
            .catch(err => console.error(err));
    }

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        

        let response = await createAccount(user);

        if (response.status !== 200) {
            alert("User account could not be created");
        }

        console.log(response.status);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder={"Name"} onChange={handleChange} name="name" required maxLength={30}/>
            <input placeholder={"Email"} onChange={handleChange} name="email" required maxLength={40}/>
            <input placeholder={"Password"} onChange={handleChange} name="password" type="password" required maxLength={20}/>
            <button type="submit">Create Account</button>
        </form>
    )
}