import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchRides = () => {
    const [searchData, setSearchData] = useState({ date: '', time: '', from: '', to: '' });
    const [rides, setRides] = useState([]);
    const [noRides, setNoRides] = useState(false);
    const navigate = useNavigate(); // For navigation

    const handleChange = (e) => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchData.date) return alert("Please select a date");

        try {
            const response = await fetch(
                `http://localhost:8080/api/rides/search?date=${searchData.date}&time=${searchData.time}&from=${searchData.from}&to=${searchData.to}`,
                {
                    headers: { 'Authorization': localStorage.getItem('token') }
                }
            );
            const result = await response.json();
            if (result.success && result.rides.length > 0) {
                setRides(result.rides);
                setNoRides(false);
            } else {
                setRides([]);
                setNoRides(true);
            }
        } catch (error) {
            console.error(error);
            alert("Error fetching rides");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token
        navigate('/login'); // Redirect to login page
    };

    const handleAddRide = () => {
        navigate('/Add_ride', { state: searchData }); // Navigate to add ride page with search data
    };

    return (
        <div>
            <h2>Search for a Ride</h2>
            <button onClick={handleLogout} style={{ float: 'right', background: 'red', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer' }}>
                Logout
            </button>
            <form onSubmit={handleSearch}>
                <input type="date" name="date" value={searchData.date} onChange={handleChange} required />
                <input type="time" name="time" value={searchData.time} onChange={handleChange} />

                <select name="from" value={searchData.from} onChange={handleChange} required>
                    <option value="">From</option>
                    <option value="NITK">NITK</option>
                    <option value="Mangalore Airport">Mangalore Airport</option>
                    <option value="Mangalore Railway Station">Mangalore Railway Station</option>
                </select>

                <select name="to" value={searchData.to} onChange={handleChange} required>
                    <option value="">To</option>
                    <option value="NITK">NITK</option>
                    <option value="Mangalore Airport">Mangalore Airport</option>
                    <option value="Mangalore Railway Station">Mangalore Railway Station</option>
                </select>

                <button type="submit">Search</button>
            </form>

            <h3>Available Rides</h3>
            {rides.length > 0 ? (
                <ul>
                    {rides.map((ride, index) => (
                       <li key={index} className="ride-item">
                       <strong>{ride.from} → {ride.to}</strong>  
                       <p><strong>Date:</strong> {ride.date}</p>
                       <p><strong>Time:</strong> {ride.time}</p>
                       <p><strong>Name:</strong> {ride.userName}</p>
                       <p><strong>Phone:</strong> {ride.phoneNumber}</p>
                       <p><strong>Email:</strong> {ride.email}</p>
                       <p><strong>Gender:</strong> {ride.gender}</p>
                   </li>
                   
                    ))}
                </ul>
            ) : (
                <>
                    <p>No rides found</p>
                    {noRides && <button onClick={handleAddRide}>Add this ride</button>}
                </>
            )}
        </div>
    );
};

export default SearchRides;
