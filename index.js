const companyAndEmails = require('./excelReader')
const { sendMail, loadEmails } = require('./email')
const fs = require('fs')
const path = './unsent.json'

///For Node Mailer
const sendUnsentEmails = async () => {

    const dataBuffer = fs.readFileSync('currentUnsent.json')
    const dataJSON = dataBuffer.toString()
    const a = JSON.parse(dataJSON)

    let count = 0
    let check

    for (let i = 0; i < companyAndEmails.length; i++) {
        check = a.find((company) => company.name == companyAndEmails[i].companyName)

        if (companyAndEmails[i].allEmails.length > 1 && check != undefined) {
            // console.log(check.name)
            count = count + 1
            const email = companyAndEmails[i].allEmails.shift()
            await sendMail(companyAndEmails[i].companyName, email, companyAndEmails[i].allEmails)

        }
        else if (companyAndEmails[i].allEmails.length == 1 && check != undefined) {
            count = count + 1
            await sendMail(companyAndEmails[i].companyName, companyAndEmails[i].allEmails)
        }

    }


}
const sendAllEmails = async () => {
    let count = 0
    let check

    for (let i = 0; i < companyAndEmails.length; i++) {
        if (companyAndEmails[i].allEmails.length > 1) {

            const email = companyAndEmails[i].allEmails.shift()
            await sendMail(companyAndEmails[i].companyName, email, companyAndEmails[i].allEmails)
            console.log(companyAndEmails[i].companyName)
        }
        else if (companyAndEmails[i].allEmails.length == 1) {
            await sendMail(companyAndEmails[i].companyName, companyAndEmails[i].allEmails)
            console.log(companyAndEmails[i].companyName)
        }

    }


}



//To see the the list of faied sent emails
// a=loadEmails()
// console.log(a.length)
// bcc=[]


if (fs.existsSync(path)) {
    fs.rename('unsent.json', 'currentUnsent.json', (err) => { })
    sendUnsentEmails().then((data) => {
        console.log("deleted")
        fs.unlinkSync('currentUnsent.json')
    })
}
else {
    sendAllEmails()
}