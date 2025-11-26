import {useState, } from 'react'
import {useAuthContext} from './useAuthContext'
import {useNavigate} from 'react-router-dom';
import { getMe } from '../api';

export const useLogin = () => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/accounts/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            const user = await getMe(json.email);

            if (!user.verified) {
                setIsLoading(false);
                setError("Account not verified");
            }

            //save user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update auth context
            dispatch({type: 'LOGIN', payload: json})

            navigate('/home'); // redirect after successful login

            setIsLoading(false)
        }
    }

    return {login, isLoading, error}
}