import React from 'react';

const GuestComponent = () => {

    return (
        <div className="guest">
            <h2>Select Number Guests</h2>
            <select>
                <option value="1">1 Guests</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6 Guests</option>
            </select>
        </div>
    );
}

export default GuestComponent;