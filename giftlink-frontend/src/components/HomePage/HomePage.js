import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./HomePage.css";
// import {urlConfig} from '../../config';

function HomePage() {
    // const [gifts, setGifts] = useState([])
    const navigate = useNavigate();

    const goToMainPage = ()=>{
        const authenticationToken = sessionStorage.getItem('auth-token');
        if (!authenticationToken) {
            navigate('/app/login');
        }else{
            navigate('/app');
        }
    }

    return (
        <div className="container mt-5">
            <div className="row">
            <div className="text-center">
                <h1 className="display-4 mb-3"> GiftLink</h1>

                <h2 className="mb-4">Share Gifts and Joy!</h2>    
                        
                <p className="lead">"Sharing is the essence of community. It is through giving that we enrich and perpetuate both our lives and the lives of others."</p>
                
                <button onClick={goToMainPage} className="btn btn-primary w-100">
                    Get Started
                </button>
            </div>
            </div>
        </div>
    );
}
export default HomePage;