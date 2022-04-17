import { tempAndPrec } from "./tempAndPrec";

export class weatherData {
    constructor(
        public date: Array<any>,
        public accuData: tempAndPrec,
        public openWthData: tempAndPrec,
        public wthApiData: tempAndPrec,
        //public temperatures: Array<any>,
        //public precipitations: Array<any>
    ) {

    }
}