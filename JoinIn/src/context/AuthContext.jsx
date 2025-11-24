import {createContext, useReducer, useEffect} from 'react'
import { getMe } from '../api'
export const AuthContext = createContext()


export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        case 'UPDATE_USER':
            return {user: action.payload}
        default:
            return state
    }
}

/*
Global state for user variable; all components can change "user" if you import useAuthContext
To login/logout user, use dispatch function
*/
export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    //syncing local storage with backend storage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser){
            return;
        }
        dispatch({type: "LOGIN", payload: storedUser})

        async function refresh(){
            try{
                const res = await getMe(storedUser.email);
                console.log("this is res: ", res);
                const fresh = res;
                dispatch({type:"LOGIN", payload:fresh})
                localStorage.setItem("user", JSON.stringify(fresh))
            }catch(error){
                console.error("Failed to refresh user: ", error);
            }
        }
        refresh();
    },[]);
    //keeping local storage synced with context whenever user changes
    useEffect(() => {
        if(state.user){
            localStorage.setItem("user", JSON.stringify(state.user));
        }
        else{
            localStorage.removeItem("user");
        }
    },[state.user]);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}

        </AuthContext.Provider>
    )
}