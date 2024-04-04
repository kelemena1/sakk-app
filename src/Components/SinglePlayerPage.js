import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, NavLink } from "react-router-dom";

export function SinglePlayerPage() {
    const { playerId } = useParams(); 
    const [player, setPlayer] = useState({});
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        axios.get(`http://localhost:3001/chess/${playerId}`)
            .then(res => {
                setPlayer(res.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setPending(false);
            });
    }, [playerId]); 

    return (
        <div className='p-5 m-auto text-center content bg-lavender'>
            {isPending || !player.id ? (<div className='spinner-border'></div>) : (
                <div className='card p-3'>
                    <div className='card-body'>
                        <h4>{player.name}</h4>
                        <NavLink to={"/"}>
                            <img className='img-fluid rounded'
                                style={{ maxHeight: "500px" }}
                                alt="A játékos képe"
                                src={player.image_url ? player.image_url : "https://via.placeholder.com/400x800"} />
                        </NavLink>
                        <p>Név: {player.name}</p>
                        <p>Születési dátum: {player.birth_date}</p>
                        <p>Világbajnoki címek száma: {player.world_ch_won}</p>
                        <p>Profil URL: <a href={player.profile_url}>Profil</a></p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SinglePlayerPage;
