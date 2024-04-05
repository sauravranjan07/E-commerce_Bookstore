import * as bcrypt from "bcrypt";
async function generatePassword(password:string,salt:number=10):Promise<string>{
    const hashPassword=bcrypt.hashSync(password, 10);
    return hashPassword
}
async function comparePassword(password:string,hashPassword:string):Promise<boolean>{
   const isMatched= bcrypt.compareSync(password,hashPassword)
   return isMatched
}
export{generatePassword,comparePassword}