
function addId (data){
    data._id = `${Date.now()}`;
    return data;
}

function completeId (id,data){
    data._id = id;
    return data;
}

export {addId,completeId}