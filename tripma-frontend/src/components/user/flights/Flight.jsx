import React from 'react'

function Flight({ flight }) {
    const {
        flightId,
        airline,
        flightNumber,
        departureAirport,
        arrivalAirport,
        departureCity,
        arrivalCity,
        departureTime,
        arrivalTime,
        duration,
        status,
        availableSeats,
        totalSeats,
        aircraftType,
        terminal,
        gate,
        wifiAvailable,
        bookings,
        bio,
        fee,
        thumbnail,
        gallary,
        cover,
        unique,
        classTypes: {
            economy: { seats: economySeats, price: economyPrice },
            business: { seats: businessSeats, price: businessPrice },
            first: { seats: firstSeats, price: firstPrice }
        }
    } = flight;

    const renderCard1 = () => {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            {renderCard1()}
        </div>
    )
}

export default Flight