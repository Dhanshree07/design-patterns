abstract class Pizza{
    abstract cost(): number;
}

class Margherita extends Pizza{
    cost(): number {
        return 100;
    }
}

abstract class Toppings extends Pizza{
    protected pizza : Pizza; 
    constructor(pizza : Pizza){
        super();
        this.pizza =  pizza
    }
}