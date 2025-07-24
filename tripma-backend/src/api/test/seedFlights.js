import Flight from '../../models/Flight.js';
import Airport from '../../models/Airport.js';
import Aircraft from '../../models/Aircraft.js';

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Check if flights already exist for the given day (00:00–23:59)
 */
const flightsExistForDate = async (date) => {
    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const count = await Flight.countDocuments({
        'departure.time': { $gte: start, $lte: end }
    });

    return count > 0;
};

export const seedFlightsForYear = async () => {
    const airports = await Airport.find();
    const aircrafts = await Aircraft.find();

    if (airports.length < 2 || aircrafts.length === 0) {
        console.warn('⚠️ Not enough airports or aircrafts to seed flights.');
        return;
    }

    console.log('🛫 Starting flight seeding...');

    const today = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(today.getFullYear() + 1);

    let currentDate = new Date(today);

    while (currentDate < oneYearFromNow) {
        const dateOnlyStr = currentDate.toISOString().split('T')[0];

        const alreadyExists = await flightsExistForDate(currentDate);
        if (alreadyExists) {
            console.log(`🔁 Skipping ${dateOnlyStr} — flights already exist.`);
            currentDate.setDate(currentDate.getDate() + 1);
            continue;
        }

        const flights = [];

        for (let hour = 0; hour < 24; hour++) {
            for (let i = 0; i < 20; i++) {
                const departureAirport = getRandomItem(airports);
                let arrivalAirport;
                do {
                    arrivalAirport = getRandomItem(airports);
                } while (arrivalAirport._id.equals(departureAirport._id));

                const aircraft = getRandomItem(aircrafts);

                const departureTime = new Date(currentDate);
                departureTime.setHours(hour, randomRange(0, 59), 0, 0);

                const flightHours = randomRange(1, 10);
                const arrivalTime = new Date(departureTime.getTime() + flightHours * 60 * 60 * 1000);

                flights.push({
                    aircraftId: aircraft._id,
                    departure: {
                        airportId: departureAirport._id,
                        time: departureTime
                    },
                    arrival: {
                        airportId: arrivalAirport._id,
                        time: arrivalTime
                    },
                    gate: `G${randomRange(1, 30)}`,
                    flightHours,
                    flightDistance: `${randomRange(300, 10000)}km`,
                    availableSeats: aircraft.totalSeats,
                    ticketPrices: {
                        economy: { price: randomRange(50, 300) },
                        business: { price: randomRange(300, 800) },
                        first: { price: randomRange(800, 1500) }
                    },
                    status: true
                });
            }
        }

        await Flight.insertMany(flights);
        console.log(`✅ Seeded ${flights.length} flights for ${dateOnlyStr}`);

        currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log('🎉 Finished seeding flights for the year.');
};