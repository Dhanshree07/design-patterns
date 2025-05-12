interface DriveStrategy{
    drive(): void;
}

class NormalStrategy implements DriveStrategy{
    drive(){
        console.log("Normal Strategy");
    }
}

class SportsStrategy implements DriveStrategy{
    drive(): void {
        console.log("Sports Strategy");
    }
}

class VehicleD{
    private obj : DriveStrategy;
    constructor( obj : DriveStrategy){
        this.obj = obj;
    }
    drive() : void {
        this.obj.drive();
    }
}

class SportVehicle extends VehicleD{
    constructor(){
        super(new SportsStrategy());
    }
}

class OffroadVehicle extends VehicleD{
    constructor(){
        super(new SportsStrategy());
    }
}

const sportCar = new SportVehicle();
sportCar.drive();