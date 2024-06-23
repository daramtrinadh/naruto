import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import './index.css';  

const apiConstraints = {
    initial: 'initial',
    loading: 'loading',
    success: 'success',
    failed: 'failed'
};

const TailedBeastDetails = () => {
    const { id } = useParams();
    const [apiStatus, setStatus] = useState({
        status: apiConstraints.initial,
        data: null,
        error: null
    });

    useEffect(() => {
        const fetchCharacterDetails = async () => {
            setStatus((prevState) => ({ ...prevState, status: apiConstraints.loading, data: null, error: null }));

            const url = `https://narutodb.xyz/api/character/${id}`;
            const options = {
                method: 'GET'
            };

            try {
                const fetchResult = await fetch(url, options);
                const data = await fetchResult.json();
                console.log(data)
                setStatus((prevState) => ({ ...prevState, status: apiConstraints.success, data, error: null }));
            } catch (error) {
                console.error('Error fetching character details:', error);
                setStatus((prevState) => ({ ...prevState, status: apiConstraints.failed, data: null, error: error.message }));
            }
        };

        fetchCharacterDetails();
    }, [id]);

    const renderSuccess = () => {
        const { data } = apiStatus;

        return (
            <div className="character-details">
                <div className="character-header">
                    <img
                        src={data.images[0] || 'https://placeholder.com/200x200?text=No+Image'}
                        alt={data.name}
                        className="character-detail-image"
                    />
                    <h1 className="character-detail-name">{data.name}</h1>
                </div>
                <div className="character-info">
                    {data.debut && (
                        <>
                            <h2>Debut</h2>
                            {data.debut.manga && <p><strong>Manga:</strong> {data.debut.manga}</p>}
                            {data.debut.anime && <p><strong>Anime:</strong> {data.debut.anime}</p>}
                            {data.debut.novel && <p><strong>Novel:</strong> {data.debut.novel}</p>}
                            {data.debut.movie && <p><strong>Movie:</strong> {data.debut.movie}</p>}
                            {data.debut.game && <p><strong>Game:</strong> {data.debut.game}</p>}
                            {data.debut.ova && <p><strong>OVA:</strong> {data.debut.ova}</p>}
                            {data.debut.appearsIn && <p><strong>Appears In:</strong> {data.debut.appearsIn}</p>}
                        </>
                    )}

                    {data.family && (
                        <>
                            <h2>Family</h2>
                            {data.family.father && <p><strong>Father:</strong> {data.family.father}</p>}
                            {data.family.mother && <p><strong>Mother:</strong> {data.family.mother}</p>}
                            {data.family.son && <p><strong>Son:</strong> {data.family.son}</p>}
                            {data.family.daughter && <p><strong>Daughter:</strong> {data.family.daughter}</p>}
                            {data.family.wife && <p><strong>Wife:</strong> {data.family.wife}</p>}
                            {data.family.adoptiveSon && <p><strong>Adoptive Son:</strong> {data.family.adoptiveSon}</p>}
                            {data.family.godfather && <p><strong>Godfather:</strong> {data.family.godfather}</p>}
                        </>
                    )}

                    {data.jutsu && data.jutsu.length > 0 && (
                        <>
                            <h2>Jutsu</h2>
                            <ul>
                                {data.jutsu.map(jutsu => (
                                    <li key={jutsu}>{jutsu}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    {data.natureType && data.natureType.length > 0 && (
                        <>
                            <h2>Nature Types</h2>
                            <ul>
                                {data.natureType.map(type => (
                                    <li key={type}>{type}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    {data.personal && (
                        <>
                            <h2>Personal Info</h2>
                            {data.personal.birthdate && <p><strong>Birthdate:</strong> {data.personal.birthdate}</p>}
                            {data.personal.sex && <p><strong>Sex:</strong> {data.personal.sex}</p>}
                            {data.personal.status && <p><strong>Status:</strong> {data.personal.status}</p>}
                            {data.personal.age && (
                                <>
                                    <p><strong>Age:</strong> {data.personal.age['Part I'] && `Part I: ${data.personal.age['Part I']}`}, {data.personal.age['Part II'] && `Part II: ${data.personal.age['Part II']}`}, {data.personal.age['Academy Graduate'] && `Academy Graduate: ${data.personal.age['Academy Graduate']}`}</p>
                                </>
                            )}
                            {data.personal.height && (
                                <p><strong>Height:</strong> {data.personal.height['Part I'] && `Part I: ${data.personal.height['Part I']}`}, {data.personal.height['Part II'] && `Part II: ${data.personal.height['Part II']}`}, {data.personal.height['Blank Period'] && `Blank Period: ${data.personal.height['Blank Period']}`}</p>
                            )}
                            {data.personal.weight && (
                                <p><strong>Weight:</strong> {data.personal.weight['Part I'] && `Part I: ${data.personal.weight['Part I']}`}, {data.personal.weight['Part II'] && `Part II: ${data.personal.weight['Part II']}`}</p>
                            )}
                            {data.personal.bloodType && <p><strong>Blood Type:</strong> {data.personal.bloodType}</p>}

                            {/* {data.personal.kekkeiGenkai && Array.isArray(data.personal.kekkeiGenkai) && data.personal.kekkeiGenkai.length > 1 && (
                                <>
                                    <h2>Kekkei Genkai</h2>
                                    <ul>
                                        {data.personal.kekkeiGenkai.map(genkai => (
                                            <li key={genkai}>{genkai}</li>
                                        ))}
                                    </ul>
                                </>
                            )} */}

                            {/* {data.personal.classification  && data.personal.classification.length > 0 && (
                                <>
                                    <h2>Classification</h2>
                                    <ul>
                                        {data.personal.classification.map(classification => (
                                            <li key={classification}>{classification}</li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {data.personal.tailedBeast && (
                                <>
                                    <h2>Tailed Beasts</h2>
                                    <p>{data.personal.tailedBeast}</p>
                                </>
                            )}

                            {data.personal.occupation && Array.isArray(data.personal.occupation) && data.personal.occupation.length > 0 && (
                                    <>
                                        <h2>Occupation</h2>
                                        <ul>
                                            {data.personal.occupation.map((occupation, index) => (
                                            <li key={index}>{occupation}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                            {data.personal.affiliation && Array.isArray(data.personal.affiliation) && data.personal.affiliation.length > 0 && (
                                <>
                                    <h2>Affiliation</h2>
                                    <ul>
                                        {data.personal.affiliation.map(affiliation => (
                                            <li key={affiliation}>{affiliation}</li>
                                        ))}
                                    </ul>
                                </>
                            )} */}

                            {/* {data.personal.team && Array.isArray(data.personal.team) && data.personal.team.length > 0 && (
                                <>
                                    <h2>Teams</h2>
                                    <ul>
                                        {data.personal.team.map(team => (
                                            <li key={team}>{team}</li>
                                        ))}
                                    </ul>
                                </>
                            )} */}
                        </>
                    )}

                    {data.clan && (
                        <>
                            <h2>Clan</h2>
                            <p>{data.clan}</p>
                        </>
                    )}

                    {data.personal && data.personal.titles && data.personal.titles.length > 0 && (
                        <>
                            <h2>Titles</h2>
                            <ul>
                                {data.personal.titles.map(title => (
                                    <li key={title}>{title}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    {data.rank && (
                        <>
                            <h2>Rank</h2>
                            {data.rank.ninjaRank && (
                                <p><strong>Ninja Rank:</strong> {data.rank.ninjaRank['Part I'] && `Part I: ${data.rank.ninjaRank['Part I']}`}, {data.rank.ninjaRank.Gaiden && `Gaiden: ${data.rank.ninjaRank.Gaiden}`}</p>
                            )}
                            {data.rank.ninjaRegistration && <p><strong>Ninja Registration:</strong> {data.rank.ninjaRegistration}</p>}
                        </>
                    )}

                    {data.tools && data.tools.length > 0 && (
                        <>
                            <h2>Tools</h2>
                            <ul>
                                {data.tools.map(tool => (
                                    <li key={tool}>{tool}</li>
                                ))}
                            </ul>
                        </>
                    )}

                {data.voiceActors && (
                    <>
                        <h2>Voice Actors</h2>
                        {typeof data.voiceActors.japanese === 'string' && <p><strong>Japanese:</strong> {data.voiceActors.japanese}</p>}
                        {typeof data.voiceActors.english === 'string' && <p><strong>English:</strong> {data.voiceActors.english}</p>}
                    </>
                )}

                </div>
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
            <h1>Failed to load character details</h1>
            <p>{apiStatus.error}</p>
        </div>
    );

    const renderTailedBeastData = () => {
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
            <div className="character-details-section">
                {renderTailedBeastData()}
            </div>
        </>
    );
};

export default TailedBeastDetails;
