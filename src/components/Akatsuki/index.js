import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar'
import './index.css'

const apiConstraints = {
    initial: 'initial',
    loading: 'loading',
    success: 'success',
    failed: 'failed'
};

const Akatsuki=()=>{
    const [apiStatus, setStatus] = useState({
        status: apiConstraints.initial,
        data: null,
        error: null
    });

    useEffect(()=>{
        const fetchAkatsukiData=async()=>{
            setStatus((prevState) => ({ ...prevState, status: apiConstraints.loading, data: null, error: null }));
            let url = 'https://narutodb.xyz/api/akatsuki';
            const options = {
                method: 'GET'
            };

            try {
                const fetchResult = await fetch(url, options);
                const data = await fetchResult.json();
                console.log(data)

                if (Array.isArray(data.akatsuki)) {
                    setStatus((prevState) => ({ ...prevState, status: apiConstraints.success, data: data.akatsuki, error: null }));
                } else if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
                    setStatus((prevState) => ({ ...prevState, status: apiConstraints.success, data: [data], error: null }));
                } 

            } catch (error) {
                console.error('Error fetching characters:', error);
                setStatus((prevState) => ({ ...prevState, status: apiConstraints.failed, data: null, error: error.message }));
            }

        }
        fetchAkatsukiData()
    },[])


    const renderSuccess = () => {
        const { data } = apiStatus;

        return (
            
            <div className="character-grid">
                {data.map(character => (
                    <Link to={`/akatsuki/${character.id}`} className='link'>
                        <div className="character-card-item">
                            <img
                                src={character.images[0] || 'https://placeholder.com/200x200?text=No+Image'}
                                alt={character.name}
                                className="character-item-image"
                            />
                            <div className="character-item-info">
                                <h3 className="character-item-name">{character.name}</h3>
                            </div>
                        </div>
                        </Link>
                ))}
            </div>
        );
    };

    const renderLoading = () => (
        <div className="loading">
            <img src='https://media4.giphy.com/media/JRlqKEzTDKci5JPcaL/100.webp?cid=790b76114o4tkpk8cph5rcv4t9bnycg67k9v0vi6m0493xlj&ep=v1_gifs_search&rid=100.webp&ct=g' alt="loading" />
        </div>
    );

    const renderFailure = () => (
        <div className="error">
            <h1>Failed to load characters</h1>
            <p>{apiStatus.error}</p>
        </div>
    );

    const renderAkatsuki = () => {
        const { status } = apiStatus;
        switch (status) {
            case apiConstraints.success:
                return renderSuccess();
            case apiConstraints.loading:
                return renderLoading();
            case apiConstraints.failed:
                return renderFailure();
            default:
                return null;
        }
    };

    return(
    <>
        <Navbar/>
        <div className='akatsuki-section'>
            {renderAkatsuki()}
        </div>
    </>
)
}
export default Akatsuki