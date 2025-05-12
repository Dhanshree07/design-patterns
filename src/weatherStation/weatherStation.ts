

interface DisplayObserver{
    update(temp: number): void;
}

interface WeatherStationObservable{
    add(observer : DisplayObserver): void;
    remove(observer : DisplayObserver) : void;
    notify(): void;
    setTemp(temp: number): void;
}

class MobileDisplayServer implements DisplayObserver{
    update(temp: number): void {
        console.log(`Mobile ${temp} degree Celsius`)
    }
}

class TvDisplayServer implements DisplayObserver{
    update(temp: number): void {
        console.log(`TV ${temp} degree Celsius`)
    }
}

class WeatherStation implements WeatherStationObservable{
    private observer: DisplayObserver[] = [];
    private temperature : number = 0;

    add(observer : DisplayObserver){
        this.observer.push(observer);
    }

    remove(observer: DisplayObserver): void {
        this.observer = this.observer.filter(obj => obj != observer);
    }

    notify(): void {
        for(const obs of this.observer){
            obs.update(this.temperature)
        }
    }

    setTemp(temp: number): void {
        this.temperature = temp;
        this.notify();
    }


}

const weatherStation = new WeatherStation();
const mobileDisplay =  new MobileDisplayServer();
const tvDisplay =  new TvDisplayServer();

weatherStation.add(mobileDisplay);
weatherStation.add(tvDisplay);

weatherStation.setTemp(25.3)

