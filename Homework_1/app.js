function myMathCall(file1,file2){
    const fs = require('fs');
    const myMath = require("./math");

    const a =Number(fs.readFileSync(file1,{encoding:'utf8', flag:'r'}));
    const b =Number(fs.readFileSync(file2,{encoding:'utf8', flag:'r'}));
    
    let resoultsToFile = "Dodawanie liczb " + a +" i " +b+" daje w wyniku " + myMath.add(a,b) +
                         "\nOdejmownie liczb " + a +" i " +b+" daje w wyniku " + myMath.sub(a,b) +
                         "\nMnożenie liczb " + a +" i " +b+" daje w wyniku " + myMath.multiplication(a,b)+
                         "\nDzielenie liczb " + a +" i " +b+" daje w wyniku " + myMath.division(a,b);

    fs.writeFileSync("./wynik.txt", resoultsToFile);

}

function main(){
    console.log("hello world");


    const user = require("./user");
    console.log("hello "+  user.firstname+ " " +user.surname);


    const myMath = require("./math");
    console.log(
        "adding " + myMath.add(4,5)+
        "\n substract" + myMath.sub(4,5)+
        "\n multiplication " + myMath.multiplication(4,5)+
        "\n division " + myMath.division(4,5)
    )

    console.log(
        " Pi value "+ myMath.piValue
    )
    const fs = require('fs');
    
    fs.writeFileSync("./Pi.txt", myMath.piValue.toString());


    //07
    const os = require('os');
    fs.writeFileSync("./WindowsUserName.txt", os.userInfo().username.toString());

    //08
    myMathCall("a.txt","b.txt");

    
    //zadanie 9
    const proc = require("process");
    let args = proc.argv[2];
    let str =  (args)?"hello "  +args :"hello world";
    console.log(str);

    //zadanei 10 i zadanie 11
    args = proc.argv[2];
    let args2 = proc.argv[3];
    if(!args || !args2){
        console.log("zbyt mało parametrów!");
    }
    else if(proc.argv.length <4){
        console.log("zbyt dużo parametrów!");
    }
    else
        myMathCall(args.toString(),args2.toString());


    
    //zadanie 12
    args = proc.argv[2];
    console.log("args "+ proc.argv.length)
    if(!args){
        console.log("zbyt mało parametrów!");
    }else if(proc.argv.length < 3){
        console.log("zbyt dużo parametrów!");
    }
    else{
        let files = fs.readdirSync(args);
        console.log("\n\n\nAll files and folders");

        files.forEach(
            elem => console.log(elem)
        )
    }

}
main();