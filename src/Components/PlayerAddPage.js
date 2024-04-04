import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function PlayerAddPage() {
    const [playerData, setPlayerData] = useState({
        name: '',
        birth_date: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayerData({
            ...playerData,
            [name]: name === 'world_ch_won' ? parseInt(value, 10) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/chess', playerData);
            navigate('/'); // Adjust the navigate path as necessary
        } catch (error) {
            console.error('Error adding new player:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h2>Add New Chess Player</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>Name:</label>
                    <input type='text' className='form-control' id='name' name='name' value={playerData.name} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='birth_date' className='form-label'>Birth Date:</label>
                    <input type='date' className='form-control' id='birth_date' name='birth_date' value={playerData.birth_date} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label htmlFor='world_ch_won' className='form-label'>World Championships Won:</label>
                    <input type='number' className='form-control' id='world_ch_won' name='world_ch_won' value={playerData.world_ch_won} onChange={handleChange} min='0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor='profile_url' className='form-label'>Profile URL:</label>
                    <input type='url' className='form-control' id='profile_url' name='profile_url' value={playerData.profile_url} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                    <label htmlFor='image_url' className='form-label'>Image URL:</label>
                    <input type='url' className='form-control' id='image_url' name='image_url' value={playerData.image_url} onChange={handleChange} />
                </div>
                <button type='submit' className='btn btn-primary'>Add Player</button>
            </form>
        </div>
    );
}

export default PlayerAddPage;
