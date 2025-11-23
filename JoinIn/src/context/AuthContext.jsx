import {createContext, useReducer, useEffect} from 'react'

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

    // // fire this when the component first renders; makes sure React updates user context when page is refreshed
    // useEffect(() => {
    //     const user = JSON.parse(localStorage.getItem('user'))

    //     if (user) {
    //         dispatch({type: 'LOGIN', payload: user})
    //     }
    // }, [])
    // console.log('AuthContext state: ', state)

    //Sync on first page load
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser){
            dispatch({type: "LOGIN", payload: storedUser})
        }
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