import './styles/land.css'
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom/dist';
import LandingPage from './LandingPage';
import App from './App';

const Main = () => {

    const { loginWithRedirect, isAuthenticated, isLoading , logout} = useAuth0();


    const launchApp = () => {
        console.log(isAuthenticated)
    }

    return <>
    
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/app" element={<App />} />
            </Routes>
        </Router>

    
    </>
}

export default Main