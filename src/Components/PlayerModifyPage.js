import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';

export function PlayerModifyPage() {
    const { playerId } = useParams();
    const navigate = useNavigate();
    const [player, setPlayer] = useState({
        name: '',
        birth_date: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
    });

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/chess/${playerId}`);
                setPlayer(response.data);
            } catch (error) {
                console.error('Hiba történt a játékos adatok lekérésekor:', error);
            }
        };

        fetchPlayer();
    }, [playerId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedPlayer = {
                name: e.target.elements.name.value,
                birth_date: e.target.elements.birth_date.value,
                world_ch_won: parseInt(e.target.elements.world_ch_won.value, 10),
                profile_url: e.target.elements.profile_url.value,
                image_url: e.target.elements.image_url.value,
            };

            await axios.put(`http://localhost:3001/chess/${playerId}`, updatedPlayer);

            navigate('/ChessList');
        } catch (error) {
            console.error('Hiba történt a PUT kérés során:', error);
        }
    };

    return (
        <div className='p-5 content bg-whitesmoke text-center'>
            <h2>Játékos frissítése</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group row pb-3'>
                    <label htmlFor='name' className='col-sm-3 col-form-label'>
                        Név:
                    </label>
                    <div>
                        <input type='text' id='name' name='name' className='form-control' autoComplete='name' defaultValue={player.name} />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor='birth_date' className='col-sm-3 col-form-label'>
                        Születési dátum:
                    </label>
                    <div>
                        <input type='date' id='birth_date' name='birth_date' className='form-control' defaultValue={player.birth_date} />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor='world_ch_won' className='col-sm-3 col-form-label'>
                        Világbajnoki címek száma:
                    </label>
                    <div>
                    <input type='number' id='world_ch_won' name='world_ch_won' className='form-control' defaultValue={player.world_ch_won} min="0" />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor='profile_url' className='col-sm-3 col-form-label'>
                        Profil URL:
                    </label>
                    <div>
                        <input type='text' id='profile_url' name='profile_url' className='form-control' autoComplete='profile_url' defaultValue={player.profile_url} />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor='image_url' className='col-sm-3 col-form-label'>
                        Kép URL:
                    </label>
                    <div>
                        <input type='text' id='image_url' name='image_url' className='form-control' autoComplete='image_url' defaultValue={player.image_url} />
                    </div>
                </div>
                <button type='submit' className='btn btn-success'>
                    Frissítés
                </button>
            </form>
        </div>
    );
}

export default PlayerModifyPage;
