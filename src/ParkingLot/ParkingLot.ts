class Vehicle{
    constructor(public licensePlate: string) {}
}

class ParkingSpot{   
    public isEmpty : boolean;
    public vehicle : Vehicle | null;
    public price : number;

    constructor(public id: number){
        this.isEmpty = true;
        this.vehicle = null;
        this.price = 5;
    }
    parkVehicle(vehicle : Vehicle){
        this.vehicle = vehicle;
        this.isEmpty = false;
    }

    unparkVehicle(vehicle : Vehicle){
        this.vehicle = null;
        this.isEmpty = true;
    }
}

class TWParkingSpot extends ParkingSpot{
   constructor(id: number){
    super(id);
    this.price = 10;
   }
}

class FWParkingSpot extends ParkingSpot{
    constructor(id: number){
     super(id);
     this.price = 10;
    }
}

class ParkingSpotManager{
    private parkingSpots : ParkingSpot[] = [];
    private activeTickets: Map<Vehicle, Ticket> = new Map();

    addSpot(spot :  ParkingSpot){
        this.parkingSpots.push(spot);
    }

    removeSpot(spot : ParkingSpot){
        this.parkingSpots =  this.parkingSpots.filter(s => s!== spot)
    }

    getAvailableSpot(){
        return this.parkingSpots.find(spot => spot.isEmpty) || null;
    }

    parkVehicle(vehicle : Vehicle){ 
        const availableSpot =  this.getAvailableSpot();
        if(!availableSpot){
            console.log("No Available Spot");
            return null;
        }
        availableSpot.parkVehicle(vehicle);
        console.log(`Vehicle ${vehicle.licensePlate} parked at ${availableSpot.id}`);
        
        const ticket = new Ticket(availableSpot,vehicle);
        this.activeTickets.set(vehicle,ticket);
        return ticket;
    }

    unparkVehicle(vehicle : Vehicle){
        const spot = this.parkingSpots.find(spot => spot.vehicle === vehicle);
        const ticket =  this.activeTickets.get(vehicle);
        if (!spot || !ticket) {
            console.log("Vehicle not found or ticket missing.");
            return null;
        }
        spot.unparkVehicle(vehicle);
        console.log(`Vehicle ${vehicle.licensePlate} unparked from spot ${spot.id}`);

        this.activeTickets.delete(vehicle);
        const fare = ticket.calculateFare();
        console.log(`Fare for ${vehicle.licensePlate} is ${fare}`)
        return fare;
    }
}

class Ticket{
    public entryTime : Date;
    public spotId: number;
    public licensePlate: string;
    public price : number;
    public exitTime : Date | null = null;
    
    constructor(spot: ParkingSpot, vehicle: Vehicle ){
        this.spotId = spot.id;
        this.licensePlate = vehicle.licensePlate;
        this.entryTime = new Date();
        this.price =  spot.price;
    }

    calculateFare() : number{
        this.exitTime = new Date();
        const durationMs =  this.exitTime.getTime() - this.entryTime.getTime();
        const durationHours = Math.ceil(durationMs / (1000*60*60));
        return durationHours*(this.price);
    }
}

const manager = new ParkingSpotManager();
manager.addSpot(new TWParkingSpot(1));
manager.addSpot(new TWParkingSpot(2));
manager.addSpot(new FWParkingSpot(3));

const bike = new Vehicle("RJ14AB1234");
const ticket = manager.parkVehicle(bike);
const fare = manager.unparkVehicle(bike);



