import {useAuthContext} from './useAuthContext'
import {useNavigate} from 'react-router-dom';

export const useLogout = () => {
    const navigate = useNavigate();
    const {dispatch} = useAuthContext()
    
    const logout = () => {
        // remove user/JWT from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type:'LOGOUT'})
        
        navigate('/home'); // redirect after successful signup
    }

    return {logout}
}