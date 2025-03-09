import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AddRide = () => {
    // Retrieve the searchData passed via navigate
    const location = useLocation();
    const searchData = location.state;  // Get the passed data (searchData)
    const navigate = useNavigate();

    const [rideDetails, setRideDetails] = useState({
        from: searchData?.from || '',
        to: searchData?.to || '',
        date: searchData?.date || '',
        time: searchData?.time || '',
    });

    const handleChange = (e) => {
        setRideDetails({ ...rideDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/rides/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
                body: JSON.stringify(rideDetails),
            });

            const result = await response.json();

            if (result.success) {
                alert('Ride added successfully');
                // Optionally, navigate back to the search page or somewhere else
                navigate('/Home'); // Redirect to search rides page
            } else {
                alert('Failed to add ride');
            }
        } catch (error) {
            console.error('Error adding ride:', error);
            alert('Error adding ride');
        }
    };

    return (
        <div>
            <h2>Add Ride</h2>
            <form onSubmit={handleSubmit}>
                <label>From:</label>
                <input type="text" name="from" value={rideDetails.from} onChange={handleChange} required />

                <label>To:</label>
                <input type="text" name="to" value={rideDetails.to} onChange={handleChange} required />

                <label>Date:</label>
                <input type="date" name="date" value={rideDetails.date} onChange={handleChange} required />

                <label>Time:</label>
                <input type="time" name="time" value={rideDetails.time} onChange={handleChange} required />

                <button type="submit">Add Ride</button>
            </form>
        </div>
    );
};

export default AddRide;
