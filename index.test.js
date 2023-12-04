const {Room} = require('./index.js')
const bookings = require('./data/bookins.json')
const rooms = require('./data/rooms.json')

describe('comprobación datos de rooms', () => {

    test('el nombre de la room es un string, devolviendo true', () => {
        const room = new Room(rooms[0].name, bookings, rooms[0].rate, rooms[0].discount)
        expect(room.validName()).toBeTruthy()
    })

    test('el nombre de la room no es un string, devolviendo false', () => {
        const room = new Room(rooms[0].rate, bookings, rooms[0].rate, rooms[0].discount)
        expect(room.validName()).toBeFalsy()
    })

    test('el nombre de la room es una cadena de texto vacía, devolviendo false', () => {
        const room = new Room('', bookings, rooms[0].rate, rooms[0].discount)
        expect(room.validName()).toBeFalsy()
    })
    //
    test('el precio de la room es un number, devolviendo true', () => {
        const room = new Room(rooms[1].name, bookings, rooms[1].rate, rooms[1].discount)
        expect(room.validPrice()).toBeTruthy()
    })

    test('el precio de la room no es un number, devolviendo false', () => {
        const room = new Room(rooms[1].name, bookings, rooms[1].name, rooms[1].discount)
        expect(room.validPrice()).toBeFalsy()
    })

    test('el precio de la room es una cadena de texto vacía, devolviendo false', () => {
        const room = new Room(rooms[1].name, bookings, '', rooms[1].discount)
        expect(room.validPrice()).toBeFalsy()
    })

    test('el precio de la room es mayor de 0, devolviendo true', () => {
        const room = new Room(rooms[1].name, bookings, rooms[1].rate, rooms[0].discount)
        expect(room.validPrice()).toBeTruthy()
    })

    test('el precio de la room es menor de 0, devolviendo false', () => {
        const room = new Room(rooms[1].name, bookings, rooms[2].rate, rooms[0].discount)
        expect(room.validPrice()).toBeFalsy()
    })

})