const { Room, Booking } = require('./index.js')
const bookings = require('./data/bookings.json')
const rooms = require('./data/rooms.json')

describe('comprobaciones de rooms', () => {


    //
    test('pasamos el precio de centimos a euros', () => {
        const room = new Room(rooms[0].name, bookings, rooms[0].rate, rooms[0].name);
        expect(room.centToEur(room.rate)).toBe(0.90)
    })
    //
    test('el descuento aplicado es 0', () => {
        const room = new Room(rooms[7].name, bookings, rooms[7].rate, rooms[7].discount)
        expect(room.getFinalPrice()).toBe(1.40)
    })

    test('el descuento aplicado es un número mayor que cero y menor de cien', () => {
        const room = new Room(rooms[1].name, bookings, rooms[1].rate, rooms[1].discount);
        expect(room.getFinalPrice()).toBe(1.47);
    })

    test('el descuento aplicado es igual a cien', () => {
        const room = new Room(rooms[6].name, bookings, rooms[6].rate, rooms[6].discount);
        expect(room.getFinalPrice()).toBe(0);
    })

    //
    test('comprobamos que la habitación no esta ocupada', () => {
        const room = new Room(rooms[0].name, bookings, rooms[0].rate, rooms[0].name);
        expect(room.isOccupied('04/12/2023')).toBeFalsy();
    })

    test('comprobamos que la habitación esta ocupada', () => {
        const room = new Room(rooms[0].name, bookings, rooms[0].rate, rooms[0].name);
        expect(room.isOccupied('19/12/2023')).toBeTruthy();
    })

    //
    test('obtenemos el porcentaje de ocupación dentro del 04/12/2023 al 08/12/2023 (0%), habitación 1',
        () => {
            const room = new Room(rooms[0].name, bookings[1], rooms[0].rate, rooms[0].name);
            expect(room.occupancyPercentage('04/12/2023', '08/12/2023')).toBe(0)
        }
    )

    test('obtenemos el porcentaje de ocupación dentro del 12/12/2023 al 18/12/2023 (100%), habitación 1',
        () => {
            const room = new Room(rooms[0].name, bookings[1], rooms[0].rate, rooms[0].name);
            expect(room.occupancyPercentage('12/12/2023', '18/12/2023')).toBe(100)
        }
    )

    test('obtenemos el porcentaje de ocupación dentro del 10/12/2023 al 20/12/2023 (50%), habitación 1',
        () => {
            const room = new Room(rooms[0].name, bookings[0], rooms[0].rate, rooms[0].name);
            expect(room.occupancyPercentage('10/12/2023', '20/12/2023')).toBe(50)
        }
    )

    // test('obtenemos el porcentaje de ocupación de x habitaciones del 10/12/2023 al 20/12/2023, (%) ',
    //     () => {
    //         const room = new Room();
    //         const arrayRooms = [
    //             new Room(rooms[0].name, bookings, rooms[0].rate, rooms[0].name),
    //             new Room(rooms[1].name, bookings, rooms[1].rate, rooms[1].name),
    //             new Room(rooms[2].name, bookings, rooms[2].rate, rooms[2].name),
    //         ]
    //         expect(room.totalOccupancyPercentage(arrayRooms, '10/12/2023', '20/12/2023')).toBe(50)
    //     }
    // )

    test('obtener un array vacío ya que las habitaciones que le pasamos están ocupadas del 12/12/2023, 18/12/2023',
        () => {
            const room = new Room();
            const arrayRooms = [
                new Room(rooms[0].name, [bookings[0], bookings[2]], rooms[0].rate, rooms[0].name),
                new Room(rooms[1].name, [bookings[0], bookings[2]], rooms[1].rate, rooms[1].name),
                new Room(rooms[2].name, [bookings[0], bookings[2]], rooms[2].rate, rooms[2].name)
            ]

            expect(room.availableRooms(arrayRooms, '10/12/2023', '18/04/204')).toStrictEqual([]);
        }

    )

})


describe('comprobaciones de Booking', () => {

    test('compruebo que el precio final de room[0] en booking[0] es: 4', () => {
        const booking = new Booking(
            bookings[0].name,
            bookings[0].email,
            bookings[0].checkIn,
            bookings[0].checkOut,
            bookings[0].discount,
            rooms[0]
        )

        expect(booking.getFee()).toBe(4.0)
    })

    test('compruebo que el precio final de room[1] en booking[1] es: 7.5', () => {
        const booking = new Booking(
            bookings[1].name,
            bookings[1].email,
            bookings[1].checkIn,
            bookings[1].checkOut,
            bookings[1].discount,
            rooms[1]
        )

        expect(booking.getFee()).toBe(7.5)
    })
})