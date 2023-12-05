import { Provider } from "react-redux"
import { store } from "../redux/store"
export const App = ({children})=>{
    <Provider store={store} >
        {children}
    </Provider>
}