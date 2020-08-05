import * as CryptoJS from 'crypto-js';

//  Interface 

// interface Human {
//     name:string,
//     age:number, 
//     gender:string
// };

// const person = {
//     name:'Santos', 
//     age: 24, 
//     gender :"male"
// };


// Class

// class Human {
//     public name:string;
//     public age:number;
//     public gender:string;

//     constructor(name:string, age:number, gender:string){
//         this.name= name;
//         this.age= age;
//         this.gender= gender;
//     }
// }

// const santos = new Human('Santos',24, 'Male');

// const sayHi = ({name, age, gender}:Human) : void => {
//     console.log(`Hello ${name}, you are ${age}, you are a ${gender}`)
// }

// sayHi(santos);


// 응용
class Block {
    static calculateBlockHash = (index:number, previosHash:string,timeStamp:number, data:string,):string => CryptoJS.SHA256(index+previosHash+timeStamp+data).toString(); 
    static validateStructure = (aBlock:Block):boolean =>
        typeof aBlock.index ==='number'&&
        typeof aBlock.hash ==='string'&&
        typeof aBlock.previosHash ==='string'&&
        typeof aBlock.data ==='string'&&
        typeof aBlock.timeStamp ==='number';

    public index:number;
    public hash:string;
    public previosHash:string;
    public data:string;
    public timeStamp:number;

    constructor(
        index:number,
        hash:string,
        previosHash:string,
        data:string,
        timeStamp:number,
    ){
        this.index = index;
        this.hash = hash;
        this.previosHash = previosHash;
        this.data = data;
        this.timeStamp = timeStamp;
    }
}

const genesisBlock:Block = new Block(0,"2020", "", "Hello", 123456);

let blackchain:Block[] =[genesisBlock];

const getBlockchain = (): Block[] => blackchain;
const getLatestBlock = (): Block => blackchain[blackchain.length-1];
const getNewTimeStamp = ():number => Math.round(new Date().getTime()/1000);

const createNewBlock = (data:string): Block => {
    const previousBlock:Block = getLatestBlock();
    const newIndex:number = previousBlock.index + 1;
    const newTimeStamp:number = getNewTimeStamp();
    const newHash:string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        newTimeStamp,
        data,
    ); 
    const newBlock:Block = new Block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimeStamp
    );

    addBlock(newBlock);
    return newBlock;
}

const getHashforBlock = (aBlock:Block): string =>
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.previosHash,
        aBlock.timeStamp,
        aBlock.data
    )


const isBlockValid = (candidateBlock:Block, previousBlock:Block):boolean => {
    if(!Block.validateStructure(candidateBlock)){
        return false;
    }else if(previousBlock.index + 1 !== candidateBlock.index){
        return false;
    }else if(previousBlock.hash !== candidateBlock.previosHash){
        return false;
    }else if(getHashforBlock(candidateBlock) !== candidateBlock.hash){
        return false;
    }else{
        return true;
    }
}

const addBlock = (candidateBlock:Block):void => {
    if(isBlockValid(candidateBlock, getLatestBlock())){
        blackchain.push(candidateBlock);
    }
}

createNewBlock('first block');
createNewBlock('second block');
createNewBlock('third block');
createNewBlock('fourth block');

console.log(blackchain)

export {}