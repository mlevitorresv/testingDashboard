class Room {
    name: string
    bookings: Booking[]
    rate: number
    discount: number
    constructor(name: string, bookings: Booking[], rate: number, discount: number) {
        this.name = name; //str
        this.bookings = bookings; //[bookings]
        this.rate = rate / 100; //int (cent)
        this.discount = discount; //int 10=>10%
    }

    centToEur(): number {
        const eur = this.rate.toFixed(2);
        return parseFloat(eur);
    }

    getFinalPrice(): number | false {
        if (typeof this.discount === 'number' && this.discount >= 0 && this.discount <= 100) {
            const discountedPrice = (this.rate - this.rate * (this.discount / 100)).toFixed(2);
            return parseFloat(discountedPrice)
        } else {
            return false;
        }

    }

    isOccupied(date: string): Boolean {
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

    occupancyPercentage(startDate: string, endDate: string): number {
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
            const overlapStart = Math.max(startDateFormated.getTime(), checkInDate.getTime());
            const overlapEnd = Math.min(endDateFormated.getTime(), checkOutDate.getTime());
            const daysOccupied = Math.ceil((overlapEnd - overlapStart) / (1000 * 60 * 60 * 24))
            occupiedDays += daysOccupied;
        }

        totalDaysInRange = Math.ceil((endDateFormated.getTime() - startDateFormated.getTime()) / (1000 * 60 * 60 * 24))
        return (occupiedDays / totalDaysInRange) * 100;
    }

    totalOccupancyPercentage(rooms: Room[], startDate: string, endDate: string) {
        const startDateTime = new Date(startDate.split('/').reverse().join('-'));
        const endDateTime = new Date(endDate.split('/').reverse().join('-'));
    
        const reservationsInDateRange = rooms.flatMap(room =>
            room.bookings.filter(booking => {
                const checkInDate = new Date(booking.checkIn.split('/').reverse().join('-'));
                const checkOutDate = new Date(booking.checkOut.split('/').reverse().join('-'));
                return checkInDate <= endDateTime && checkOutDate >= startDateTime;
            })
        );
    
        const totalOccupiedDays = reservationsInDateRange.reduce((totalDays, booking) => {
            const checkInDate = new Date(booking.checkIn.split('/').reverse().join('-'));
            const checkOutDate = new Date(booking.checkOut.split('/').reverse().join('-'));
            const durationInDays = (checkOutDate.getTime() - checkInDate.getTime()) / (24 * 60 * 60 * 1000) + 1;
            return totalDays + durationInDays;
        }, 0);
    
        
        const totalDaysInRange = (endDateTime.getTime() - startDateTime.getTime()) / (24 * 60 * 60 * 1000) + 1;
    
        const occupancyPercentage = (totalOccupiedDays / totalDaysInRange) * 100;
    
        return occupancyPercentage;
    }

    availableRooms(rooms: Room[], startDate: string, endDate: string) {
        const currentDate = new Date(startDate.split('/').reverse().join('-'));
        const endDateTime = new Date(endDate.split('/').reverse().join('-'));
        let emptyRooms: Room[] = [];

        rooms.forEach(room => {
            room.bookings.forEach(booking=> {
                const checkInFormated = new Date(booking.checkIn.split('/').reverse().join('-'));
                const checkOutFormated = new Date(booking.checkOut.split('/').reverse().join('-'));
                if (checkInFormated >= endDateTime || checkOutFormated <= currentDate) {
                    emptyRooms.push(room);
                }
            })
        });

        console.log(emptyRooms)
        return emptyRooms.length;
    }
}


class Booking {
    name: string
    email: string
    checkIn: string
    checkOut: string
    discount: number
    room: Room[]

    constructor(name: string, email: string, checkIn: string, checkOut: string, discount: number, room: Room[]) {
        this.name = name; //str
        this.email = email; //str
        this.checkIn = checkIn; //date
        this.checkOut = checkOut; //date
        this.discount = discount; //int (%)
        this.room = room; //[room]
    }

    getFee(): number {
        const rateEuros: number = Number((this.room.rate / 100).toFixed(2));

        const roomPriceWithDiscount: number = Number((rateEuros - ((rateEuros * this.room.discount) / 100)).toFixed(2));

        const oneDayofBooking: number = Number((roomPriceWithDiscount - ((roomPriceWithDiscount * this.discount) / 100)).toFixed(2));

        const checkInFormated: Date = new Date(this.checkIn.split('/').reverse().join('-'));
        const checkOutFormated: Date = new Date(this.checkOut.split('/').reverse().join('-'));
        const timeDiff: number = checkOutFormated.getTime() - checkInFormated.getTime();

        const days: number = Number(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));

        const totalFee: number = Number(oneDayofBooking * days);

        return totalFee;
    }
}

module.exports = { Room, Booking };