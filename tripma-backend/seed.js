// seedWithFaker.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

// Load environment variables
dotenv.config();

// Import your Mongoose models
import Tag from './src/models/Tag.js';
import Airport from './src/models/Airport.js';
import Aircraft from './src/models/Aircraft.js';
import Place from './src/models/Place.js';
import Flight from './src/models/Flight.js';
import FeaturedPlace from './src/models/FeaturedPlace.js';
import UserAccount from './src/models/UserAccount.js';
import User from './src/models/User.js';
import UserRelation from './src/models/UserRelation.js';
import DirectBooking from './src/models/DirectBooking.js';
import TripBooking from './src/models/TripBooking.js';
import UserTrip from './src/models/UserTrip.js';
import UserFeedback from './src/models/UserFeedback.js';
import Trip from './src/models/Trip.js';

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
}

async function clearCollections() {
    await Promise.all([
        Tag.deleteMany(), Airport.deleteMany(), Aircraft.deleteMany(), Place.deleteMany(),
        Flight.deleteMany(), FeaturedPlace.deleteMany(), UserFeedback.deleteMany(),
        DirectBooking.deleteMany(), TripBooking.deleteMany(), UserTrip.deleteMany(),
        UserRelation.deleteMany(), User.deleteMany(), UserAccount.deleteMany(), Trip.deleteMany()
    ]);
    console.log('🗑️  Cleared existing collections');
}

async function generateData() {
    const tags = Array.from({ length: 15 }, () => ({
        name: faker.word.adjective(),
        slug: faker.helpers.slugify(faker.word.adjective()),
        type: faker.helpers.arrayElement(['theme', 'interest', 'destination'])
    }));
    const createdTags = await Tag.insertMany(tags);

    const airports = Array.from({ length: 10 }, () => ({
        airportCode: faker.string.alpha({ length: 3 }).toUpperCase(),
        cityCode: faker.string.alpha({ length: 3 }).toUpperCase(),
        countryCode: faker.location.countryCode(),
        name: `${faker.location.city()} Intl`,
        coordinate: {
            latitude: faker.location.latitude(),
            longitude: faker.location.longitude()
        }
    }));
    const createdAirports = await Airport.insertMany(airports);

    const aircrafts = Array.from({ length: 10 }, (_, i) => ({
        airline: faker.company.name(),
        flightNumber: `FL${faker.number.int({ min: 100, max: 999 })}`,
        aircraftType: `Type-${i + 1}`,
        totalSeats: 200,
        classTypes: {
            economy: { seatMap: Array.from({ length: 120 }, (_, s) => `E${s + 1}`) },
            business: { seatMap: Array.from({ length: 50 }, (_, s) => `B${s + 1}`) },
            first: { seatMap: Array.from({ length: 30 }, (_, s) => `F${s + 1}`) }
        }
    }));
    const createdAircrafts = await Aircraft.insertMany(aircrafts);

    const places = createdAirports.map((airport, i) => ({
        airportId: airport._id,
        name: faker.location.city(),
        bio: faker.lorem.paragraph(),
        city: airport.cityCode,
        country: airport.countryCode,
        thumbnail: faker.image.urlPicsumPhotos({ width: 200, height: 200 }),
        gallery: Array.from({ length: 3 }, () => faker.image.urlPicsumPhotos({ width: 400, height: 400 })),
        cover: faker.image.urlPicsumPhotos({ width: 800, height: 600 }),
        tags: faker.helpers.arrayElements(createdTags.map(t => t._id), 3)
    }));
    const createdPlaces = await Place.insertMany(places);

    const flights = createdAircrafts.map((ac, i) => {
        const dep = createdAirports[i];
        const arr = createdAirports[(i + 1) % createdAirports.length];
        const departure = faker.date.soon();
        const duration = faker.number.int({ min: 1, max: 8 }) * 3600000;
        const arrival = new Date(departure.getTime() + duration);

        return {
            aircraftId: ac._id,
            departure: { airportId: dep._id, time: departure },
            arrival: { airportId: arr._id, time: arrival },
            gate: `G${faker.string.alphanumeric(2).toUpperCase()}`,
            flightHours: duration / 3600000,
            flightDistance: `${faker.number.int({ min: 400, max: 2000 })} km`,
            availableSeats: ac.totalSeats,
            ticketPrices: {
                economy: { price: faker.number.int({ min: 100, max: 300 }) },
                business: { price: faker.number.int({ min: 400, max: 700 }) },
                first: { price: faker.number.int({ min: 800, max: 1500 }) }
            },
            status: true
        };
    });
    const createdFlights = await Flight.insertMany(flights);

    await FeaturedPlace.insertMany(
        createdFlights.map((f, i) => ({
            flightId: f._id,
            places: createdPlaces.slice(i, i + 3).map((pl, j) => ({ placeId: pl._id, main: j === 0 }))
        }))
    );

    const accounts = Array.from({ length: 15 }, () => ({
        email: faker.internet.email(),
        password: faker.internet.password()
    }));
    const createdAccounts = await UserAccount.insertMany(accounts);

    const createdUsers = await User.insertMany(
        createdAccounts.map(acc => ({
            userAccountId: acc._id,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            type: 'adult',
            dob: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
            email: acc.email,
            phoneNumber: faker.phone.number('+94 7# ### ####'),
            address: {
                house: faker.location.buildingNumber(),
                street: faker.location.street(),
                city: faker.location.city(),
                state: faker.location.state(),
                country: faker.location.country()
            },
            bagsCount: faker.number.int({ min: 0, max: 2 })
        }))
    );

    await UserRelation.insertMany(
        createdUsers.map((u, i) => ({
            userId: u._id,
            relations: [{ userId: createdUsers[(i + 1) % createdUsers.length]._id }]
        }))
    );

    const directBookings = await DirectBooking.insertMany(
        createdFlights.map((f, i) => ({
            flightId: f._id,
            travelers: [{
                userId: createdUsers[i % createdUsers.length]._id,
                bagsCount: 1,
                classType: 'economy',
                seat: `E${i + 1}`,
                fare: f.ticketPrices.economy.price
            }],
            flightTicketsTotal: f.ticketPrices.economy.price,
            taxes: 20, fees: 10,
            discounts: [{ code: 'SAVE10', amount: 10, type: 'percentage' }],
            total: f.ticketPrices.economy.price + 30 - 10,
            bookingTime: new Date(),
            paymentMethod: 'card',
            transactionId: faker.string.alphanumeric(10).toUpperCase(),
            status: 'confirmed'
        }))
    );

    const tripBookings = await TripBooking.insertMany(
        createdAccounts.map((acc, i) => ({
            bookedUserAccountId: acc._id,
            forSomeoneElse: false,
            bookings: [{ bookingId: directBookings[i % directBookings.length]._id }],
            createdAt: new Date(),
            totalAmount: directBookings[i % directBookings.length].total,
            tripNotes: faker.lorem.sentence(),
            status: 'completed'
        }))
    );

    await UserTrip.insertMany(
        createdUsers.map((u, i) => ({
            userId: u._id,
            tripId: tripBookings[i % tripBookings.length]._id,
            tripBookingId: tripBookings[i % tripBookings.length]._id
        }))
    );

    const feedbacks = createdUsers.map((u, i) => ({
        userId: u._id,
        tripBookingId: tripBookings[i % tripBookings.length]._id,
        feedback: faker.lorem.sentences(2),
        stars: faker.number.int({ min: 3, max: 5 })
    }));
    const createdFeedbacks = await UserFeedback.insertMany(feedbacks);

    await Trip.insertMany(
        createdPlaces.map((pl, i) => ({
            name: `${faker.word.adjective()} Trip to ${pl.name}`,
            description: faker.lorem.paragraph(),
            duration: faker.number.int({ min: 3, max: 10 }),
            price: faker.number.int({ min: 500, max: 3000 }),
            originalPrice: faker.number.int({ min: 600, max: 3500 }),
            rating: faker.number.float({ min: 3, max: 5, precision: 0.1 }),
            tags: [{ tagId: createdTags[i % createdTags.length]._id }],
            places: [{ placeId: pl._id }],
            reviews: [{ reviewId: createdFeedbacks[i % createdFeedbacks.length]._id }]
        }))
    );
}

async function main() {
    try {
        await connectDB();
        await clearCollections();
        await generateData();
        console.log('🎉 Seeded all collections with faker data successfully');
        process.exit(0);
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}

main();
