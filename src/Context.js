import {useState, createContext} from 'react';

const AppContext = createContext();

const ContextAPI = ({children}) => {
    const [channelData, setChannelData] = useState();

    return (
        <AppContext.Provider value={{channelData, setChannelData}}>
            {children}
        </AppContext.Provider>
    )
}
export {AppContext, ContextAPI};