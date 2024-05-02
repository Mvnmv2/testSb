import {encoded, translations} from './data.js'

// console.log("Let's rock")
// console.log(encoded, translations)

let decoded = []
let uniqueID = []

function decodedF() {

    for (let obj of encoded) {

        let newObj = {}

        for (let [key, value] of Object.entries(obj)) {


            if (key === 'groupId' || key === 'service' || key === 'formatSize' || key === 'ca') {
                newObj[key] = value
                continue;
            }

            for (let [keyTranslations, valueTranslations] of Object.entries(translations)) {

                if (value === null) {
                    newObj[key] = value
                }

                if (keyTranslations === value) {
                    newObj[key] = valueTranslations
                    break;
                } else {
                    newObj[key] = value
                }
            }
        }
        decoded.push(newObj)
    }
    console.log(decoded)
}

function findUniqueId() {

    for (let obj of encoded) {

        for (let [key, value] of Object.entries(obj)) {

            if(value === null || key === 'groupId' || !key.includes('Id')) continue;

            let isIn = Object.entries(translations).find(item => item[0] === value);

            if (!isIn) {
                uniqueID.push( { [key]: value } );
            }
        }
    }
    console.log('список уникальных id :' , uniqueID)
}


decodedF()

findUniqueId()


