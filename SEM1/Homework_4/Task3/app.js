const sub = (a, b) => {
    return new Promise((resolve,reject)=>{
        if(a-b>0)
            resolve(a-b);
        else
            reject('error');
    })
}

sub(4,3)
    .then(result => {
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    });