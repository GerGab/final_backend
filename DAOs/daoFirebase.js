import firebaseContainer from "../Containers/firebaseContainer.js";

class daoFirebase extends firebaseContainer {
    constructor(database,collection){
        super(database,collection)
    }
}

export default daoFirebase