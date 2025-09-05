import './app/css/App.css'
import {Header} from "./widgets/Header.jsx";
import {Home} from "./pages/Home.jsx";

function App() {
    return (
        <div className="App">
            <Header/>
            <Home/>
        </div>
    );
}

export default App
