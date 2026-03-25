const XLSX = require('xlsx')
const book = XLSX.readFile("Software-Houses.xlsx")
const constants = require('./Constants')

let sheet = book.Sheets[book.SheetNames[0]]
let email
let companyAndEmails = []
let list = []

const srartRowNum = constants.startRowNum
const endRowNuM = constants.endRowNuM


for (let index = srartRowNum; index <= endRowNuM; index++) {
    let cell = sheet[`C${index}`];
    if (!cell || !cell.v) {
        console.log(`No email found in row ${index}`);
        continue; // skip this row
    }

    email = cell.v;

    if (email.includes(',')) {
        let arr2 = email.split(',');
        for (let i = 0; i < arr2.length; i++) {
            if (!arr2[i].includes('@')) {
                console.log(`Invalid email skipped: ${arr2[i]}`);
                continue;
            }
            arr2[i] = arr2[i].trimStart();
            list.push(arr2[i]);
        }
        companyAndEmails.push({
            companyName: sheet[`A${index}`] ? sheet[`A${index}`].v : 'Unknown',
            allEmails: arr2
        });
    } else {
        if (!email.includes('@')) {
            console.log(`Invalid email skipped: ${email}`);
            continue;
        }
        companyAndEmails.push({
            companyName: sheet[`A${index}`] ? sheet[`A${index}`].v : 'Unknown',
            allEmails: [email]
        });
        list.push(email);
    }
}

console.log("Num of Emails:" + companyAndEmails.length)


module.exports = companyAndEmails


