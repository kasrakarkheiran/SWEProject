import {AuthContext} from '../context/AuthContext'
import {useContext} from 'react'

/*
    Gets the context and makes sure it is used inside the document root.
    Use this function if you want to access or change the user
    Access user: const {user} = useAuthContext() // make sure it's imported first
*/
export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}