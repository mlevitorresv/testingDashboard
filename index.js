var Room = /** @class */ (function () {
    function Room(name, bookings, rate, discount) {
        this.name = name; //str
        this.bookings = bookings; //[bookings]
        this.rate = rate / 100; //int (cent)
        this.discount = discount; //int 10=>10%
    }
    Room.prototype.centToEur = function () {
        var eur = this.rate.toFixed(2);
        return parseFloat(eur);
    };
    Room.prototype.getFinalPrice = function () {
        if (typeof this.discount === 'number' && this.discount >= 0 && this.discount <= 100) {
            var discountedPrice = (this.rate - this.rate * (this.discount / 100)).toFixed(2);
            return parseFloat(discountedPrice);
        }
        else {
            return false;
        }
    };
    Room.prototype.isOccupied = function (date) {
        var dateFormated = new Date(date.split('/').reverse().join('-'));
        for (var _i = 0, _a = this.bookings; _i < _a.length; _i++) {
            var booking = _a[_i];
            var checkInDate = new Date(booking.checkIn.split('/').reverse().join('-'));
            var checkOutDate = new Date(booking.checkOut.split('/').reverse().join('-'));
            if (dateFormated >= checkInDate && dateFormated <= checkOutDate) {
                return true;
            }
        }
        return false;
    };
    Room.prototype.occupancyPercentage = function (startDate, endDate) {
        var startDateFormated = new Date(startDate.split('/').reverse().join('-'));
        var endDateFormated = new Date(endDate.split('/').reverse().join('-'));
        var totalDaysInRange = 0;
        var occupiedDays = 0;
        var checkInDate = new Date(this.bookings.checkIn.split('/').reverse().join('-'));
        var checkOutDate = new Date(this.bookings.checkOut.split('/').reverse().join('-'));
        if ((checkInDate >= startDateFormated && checkInDate <= endDateFormated) ||
            (checkOutDate >= startDateFormated && checkOutDate <= endDateFormated) ||
            (checkInDate <= startDateFormated && checkOutDate >= endDateFormated)) {
            var overlapStart = Math.max(startDateFormated.getTime(), checkInDate.getTime());
            var overlapEnd = Math.min(endDateFormated.getTime(), checkOutDate.getTime());
            var daysOccupied = Math.ceil((overlapEnd - overlapStart) / (1000 * 60 * 60 * 24));
            occupiedDays += daysOccupied;
        }
        totalDaysInRange = Math.ceil((endDateFormated.getTime() - startDateFormated.getTime()) / (1000 * 60 * 60 * 24));
        return (occupiedDays / totalDaysInRange) * 100;
    };
    Room.prototype.totalOccupancyPercentage = function (rooms, startDate, endDate) {
        var startDateTime = new Date(startDate.split('/').reverse().join('-'));
        var endDateTime = new Date(endDate.split('/').reverse().join('-'));
        var reservationsInDateRange = rooms.flatMap(function (room) {
            return room.bookings.filter(function (booking) {
                var checkInDate = new Date(booking.checkIn.split('/').reverse().join('-'));
                var checkOutDate = new Date(booking.checkOut.split('/').reverse().join('-'));
                return checkInDate <= endDateTime && checkOutDate >= startDateTime;
            });
        });
        var totalOccupiedDays = reservationsInDateRange.reduce(function (totalDays, booking) {
            var checkInDate = new Date(booking.checkIn.split('/').reverse().join('-'));
            var checkOutDate = new Date(booking.checkOut.split('/').reverse().join('-'));
            var durationInDays = (checkOutDate.getTime() - checkInDate.getTime()) / (24 * 60 * 60 * 1000) + 1;
            return totalDays + durationInDays;
        }, 0);
        var totalDaysInRange = (endDateTime.getTime() - startDateTime.getTime()) / (24 * 60 * 60 * 1000) + 1;
        var occupancyPercentage = (totalOccupiedDays / totalDaysInRange) * 100;
        return occupancyPercentage;
    };
    Room.prototype.availableRooms = function (rooms, startDate, endDate) {
        var currentDate = new Date(startDate.split('/').reverse().join('-'));
        var endDateTime = new Date(endDate.split('/').reverse().join('-'));
        var emptyRooms = [];
        rooms.forEach(function (room) {
            room.bookings.forEach(function (booking) {
                var checkInFormated = new Date(booking.checkIn.split('/').reverse().join('-'));
                var checkOutFormated = new Date(booking.checkOut.split('/').reverse().join('-'));
                if (checkInFormated >= endDateTime || checkOutFormated <= currentDate) {
                    emptyRooms.push(room);
                }
            });
        });
        console.log(emptyRooms);
        return emptyRooms.length;
    };
    return Room;
}());
var Booking = /** @class */ (function () {
    function Booking(name, email, checkIn, checkOut, discount, room) {
        this.name = name; //str
        this.email = email; //str
        this.checkIn = checkIn; //date
        this.checkOut = checkOut; //date
        this.discount = discount; //int (%)
        this.room = room; //[room]
    }
    Booking.prototype.getFee = function () {
        var rateEuros = Number((this.room.rate / 100).toFixed(2));
        var roomPriceWithDiscount = Number((rateEuros - ((rateEuros * this.room.discount) / 100)).toFixed(2));
        var oneDayofBooking = Number((roomPriceWithDiscount - ((roomPriceWithDiscount * this.discount) / 100)).toFixed(2));
        var checkInFormated = new Date(this.checkIn.split('/').reverse().join('-'));
        var checkOutFormated = new Date(this.checkOut.split('/').reverse().join('-'));
        var timeDiff = checkOutFormated.getTime() - checkInFormated.getTime();
        var days = Number(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
        var totalFee = Number(oneDayofBooking * days);
        return totalFee;
    };
    return Booking;
}());
module.exports = { Room: Room, Booking: Booking };
