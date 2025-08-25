import { createContext , useEffect, useReducer} from "react";

export const ThemeContext = createContext()

const themeReducer = (state, action)=>{
    switch (action.type) {
        case 'CHANGE_MODE':
            return { ...state,  mode : action.payload }
        default:
            return state
    }
}

export function ThemeProvider({ children }) {
    const [state, dispatch] = useReducer(themeReducer, {
        mode : 'light'
    })

    const changeMode = (mode) => {
        dispatch({type: 'CHANGE_MODE', payload: mode})
    }

    useEffect(() => {
        document.body.className = state.mode
    }, [state.mode])

    return (
        <ThemeContext.Provider value={{ ...state, changeMode}}>
            {children}
        </ThemeContext.Provider>
    )
}