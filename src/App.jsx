import './ui/css/App.css'
import {Header} from "./ui/widgets/Header.jsx";
import {Home} from "./ui/pages/home/Home.tsx";

function App() {
    return (
        <div className="App">
            <Header/>
            <Home/>
        </div>
    );
}

export default App
