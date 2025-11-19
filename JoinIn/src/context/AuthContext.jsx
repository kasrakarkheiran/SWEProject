import {createContext, useReducer, useEffect} from 'react'

export const AuthContext = createContext()


export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
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

    // fire this when the component first renders; makes sure React updates user context when page is refreshed
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])
    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}

        </AuthContext.Provider>
    )
}