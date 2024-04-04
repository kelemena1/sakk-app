import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function ChessListPage() {
    const [chesslist, setChessList] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setFetchPending(true);
        axios.get('http://localhost:3001/chess')
            .then((response) => {
                setChessList(response.data); 
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setFetchPending(false);
            });
    }, [count]);
    const handleRemoveFromMenu = async (chessId) => {
        const confirmation = window.confirm('Biztosan kitörlöd a bejegyzést?');
    
        if (confirmation) {
            try {
                const response = await axios.delete(`http://localhost:3001/chess/${chessId}`);
                setChessList((prevChess) => prevChess.filter((chess) => chess.id !== chessId));
            } catch (error) {
                console.error('Törlési hiba:', error);
            } finally {
                setCount((prevCount) => prevCount + 1);
                navigate('/');
            }
        }
    };
    

    const handleModifyPlayer = (chessId , chess) => {
        console.log(chessId);
        navigate(`/player-modify/${chessId}`);
    };

    return (
        <div className='p-5 m-auto text-center content bg-ivory'>
            {isFetchPending ? (<div className='spinner-border'></div>) : (
                <div>
                    <h2>Sakk Nagymesterek</h2>
                    {chesslist.map((player) => (
                        <div key={player.id} className='card col-sm-3 d-inline-block m-1 p-2'>
                            <h6 className='text-muted'>{player.name}</h6>
                            <div>Született: {new Date(player.birth_date).toLocaleDateString('hu-HU')}</div>
                            <div>{player.world_ch_won > 0 ? `Világbajnoki címek: ${player.world_ch_won}` : 'Nem világbajnok'}</div>
                            <NavLink to={`/chessPlayer/${player.id}`}>
                                <div className='card-body'>
                                    <img
                                        className='img-fluid'
                                        style={{ maxHeight: 200 }}
                                        alt={`${player.name} képe`}
                                        src={player.image_url ? player.image_url : "https://via.placeholder.com/400x800"}
                                    />
                                </div>
                            </NavLink>
                            <div>
                                <button
                                    onClick={() => handleRemoveFromMenu(player.id)}
                                    className='btn btn-danger'
                                >
                                    Levétel a listáról
                                </button>
                                
                                <button
                                    onClick={() => handleModifyPlayer(player.id,player)}
                                    className='btn btn-primary'
                                >
                                    Módosítás
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
    
}

export default ChessListPage;
