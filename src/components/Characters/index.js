import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import Navbar from "../Navbar";
import './index.css'

const apiConstraints = {
    initial: 'initial',
    loading: 'loading',
    success: 'success',
    failed: 'failed'
};

const Characters = () => {
    const [search, setSearch] = useState('');
    const [apiStatus, setStatus] = useState({
        status: apiConstraints.initial,
        data: null,
        error: null
    });

    useEffect(() => {
        const fetchCharacters = async () => {
            setStatus((prevState) => ({ ...prevState, status: apiConstraints.loading, data: null, error: null }));

            let url = 'https://narutodb.xyz/api/character';
            if (search.trim() !== '') {
                url = `https://narutodb.xyz/api/character/search?name=${encodeURIComponent(search.trim())}`;
            }

            const options = {
                method: 'GET'
            };

            try {
                const fetchResult = await fetch(url, options);
                const data = await fetchResult.json();

                if (Array.isArray(data.characters)) {
                    setStatus((prevState) => ({ ...prevState, status: apiConstraints.success, data: data.characters, error: null }));
                } else if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
                    setStatus((prevState) => ({ ...prevState, status: apiConstraints.success, data: [data], error: null }));
                } 
                // else {
                //     setStatus((prevState) => ({ ...prevState, status: apiConstraints.success, data: [], error: null }));
                // }
            } catch (error) {
                console.error('Error fetching characters:', error);
                setStatus((prevState) => ({ ...prevState, status: apiConstraints.failed, data: null, error: error.message }));
            }
        };

        fetchCharacters();
    }, [search]);

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const renderSuccess = () => {
        const { data } = apiStatus;

        return (
            <div className="character-grid">
                {data.map(character => (
                    <Link to={`/character/${character.id}`} className="link" key={character.id}>
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

    const renderCharacters = () => {
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

    return (
        <>
            <Navbar />
            <div className="characters-section">
                <div className="input-section">
                    <div className="group">
                        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
                            <g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path></g>
                        </svg>
                        <input placeholder="Search" type="search" className="input" value={search} onChange={onSearchChange} />
                    </div>
                </div>
                {renderCharacters()}
            </div>
        </>
    );
};

export default Characters;
