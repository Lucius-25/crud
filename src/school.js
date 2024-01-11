import listeners from "./core/listener";
import renders from "./core/renders";

class School {
    init(){
        console.log("starts");
        renders()
        listeners()
    }
}

export default School;