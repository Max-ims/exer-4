import {v4 as uuidv4} from 'uuid';
import validator from 'validator';
import { openSync, closeSync, appendFileSync} from 'node:fs';

let fd;

function generateUniqueID(fname, lname){
    var generated = uuidv4();
    generated = generated.substring(0,8)
    generated = fname[0].concat(lname,generated).toLowerCase();

    return generated
}


function addAccount(arr){
    //check if all fields present
    if(arr.length == 4 &&
        (validator.isEmpty(arr[0],{ignore_whitespace: true}) && 
        validator.isEmpty(arr[1],{ignore_whitespace: true}) && 
        validator.isEmpty(arr[2],{ignore_whitespace: true})) == false
        && validator.contains(arr[2], "@")
        && arr[3] >= 18)
        {
            var fname = arr[0]
            var lname = arr[1]
            var email = validator.normalizeEmail(arr[2])
            var age = arr[3] 
            
            try {
                fd = openSync('users.txt', 'a');
                appendFileSync(fd, fname.concat(",",lname,",",email,",",age, generateUniqueID(fname,lname),"\n"), 'utf8');
              } catch (err) {
                /* Handle the error */
              } finally {
                if (fd !== undefined)
                  closeSync(fd);
              } 

        }
    
    
}

console.log(addAccount(["Alan", "Turing", "aturing@w3c.com", 58]))
export default {generateUniqueID, addAccount}