class Room {
    constructor(name, bookings, rate, discount) {
        this.name = name; //str
        this.bookings = bookings; //[bookings]
        this.rate = rate / 100; //int (cent)
        this.discount = discount; //int 10=>10%
    }

    centToEur() {
        const eur = this.rate.toFixed(2);
        return parseFloat(eur);
    }

    getFinalPrice() {
        if (typeof this.discount === 'number' && this.discount >= 0 && this.discount <= 100) {
            const discountedPrice = (this.rate - this.rate * (this.discount / 100)).toFixed(2);
            return parseFloat(discountedPrice)
        } else {
            return false;
        }

    }

    isOccupied(date) {
        const dateFormated = new Date(date.split('/').reverse().join('-'));
        for (const booking of this.bookings) {
            const checkInDate = new Date(booking.checkIn.split('/').reverse().join('-'));
            const checkOutDate = new Date(booking.checkOut.split('/').reverse().join('-'));

            if (dateFormated >= checkInDate && dateFormated <= checkOutDate) {
                return true;
            }
        }
        return false;
    }

    occupancyPercentage(startDate, endDate) {
        const startDateFormated = new Date(startDate.split('/').reverse().join('-'));
        const endDateFormated = new Date(endDate.split('/').reverse().join('-'));

        let totalDaysInRange = 0;
        let occupiedDays = 0;

        const checkInDate = new Date(this.bookings.checkIn.split('/').reverse().join('-'));
        const checkOutDate = new Date(this.bookings.checkOut.split('/').reverse().join('-'));

        if (
            (checkInDate >= startDateFormated && checkInDate <= endDateFormated) ||
            (checkOutDate >= startDateFormated && checkOutDate <= endDateFormated) ||
            (checkInDate <= startDateFormated && checkOutDate >= endDateFormated)
        ) {
            const overlapStart = Math.max(startDateFormated, checkInDate);
            const overlapEnd = Math.min(endDateFormated, checkOutDate);
            const daysOccupied = Math.ceil((overlapEnd - overlapStart) / (1000 * 60 * 60 * 24))
            occupiedDays += daysOccupied;
        }

        totalDaysInRange = Math.ceil((endDateFormated - startDateFormated) / (1000 * 60 * 60 * 24))
        return (occupiedDays / totalDaysInRange) * 100;
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

module.exports = { Room, Booking };