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
    // Initialize state synchronously from localStorage so routes render correctly on refresh
    const initializer = () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("user"));
                return { user: storedUser || null };
            } catch (err) {
                return { user: null };
            }
        }

        const [state, dispatch] = useReducer(authReducer, undefined, initializer)

        // After synchronous init, attempt to refresh/validate the user from backend
        useEffect(() => {
            const storedUser = state.user;
            if (!storedUser){
                return;
            }

            async function refresh(){
                try{
                    const res = await getMe(storedUser.email);
                    // getMe returns the user object (api wrapper) or throws; handle both
                    if(!res){
                        console.log("AuthContext: refresh returned no user")
                        return;
                    }
                    // if getMe is an axios wrapper returning data, just use it
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