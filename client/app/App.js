import { Provider } from "react-redux"
import { store } from "../redux/store"
import { AuthProvider } from './AuthContext';

export const App = ({children})=>{
    <AuthProvider>
        <Provider store={store} >
            {children}
        </Provider>
    </AuthProvider>
}