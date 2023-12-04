class Room {
    constructor(name, bookings, rate, discount) {
        this.name = name; //str
        this.bookings = bookings; //[bookings]
        this.rate = rate; //int (cent)
        this.discount = discount; //int 10=>10%
    }

    validName(){
        return typeof this.name === 'string' && this.name.length > 0;
    }

    validPrice(){
        return typeof this.rate === 'number' && this.rate > 0
    }
}


class Booking {
    constructor(name, email, checkIn, checkOut, discount, room) {
        this.name = name; //str
        this.email = email; //str
        this.checkIn = checkIn; //date
        this.checkOut = checkOut; //date
        this.discount = discount; //int (%)
        this.room = room; //[room]
    }

}

module.exports = {Room, Booking};