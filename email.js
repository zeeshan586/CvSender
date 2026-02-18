const nodemailer = require('nodemailer')
const fs =require('fs')
const constants = require('./Constants')
const getEmailBody = require('./EmailBody')


pathToAttachment = `${__dirname}/${constants.fileName}`
attachment = fs.readFileSync(pathToAttachment).toString("base64")


const transporter = nodemailer.createTransport({
    host: constants.host,
    service: constants.service,
    auth:{
        user:constants.senderEmail,
        pass:constants.password      
    }
})
const sendMail = async(companyName,email,bccE)=>{
    const body = getEmailBody(constants.senderName, companyName);    
    const options = {
        from: {
            name: constants.senderName,
            address: constants.senderEmail
        },
        to: email,
        bcc:bccE,
        subject: constants.subject,
        text:body,
        attachments :[
            {
              content: attachment,
              filename: constants.filename,
              contentType: constants.contentType,
              path: constants.filePath
            }
        ]
    }

    //****************Code for sending email synchronously*********************
    
    try{
    result = await transporter.sendMail(options);
    console.log(result.response)
    }
    catch(e){
        addEmail(companyName,email,bccE,e)
        console.log(e.response)
    } 
    //******************************END************************************ */

    //****************Code for sending email asynchronously*********************
//     transporter.sendMail(options,  function(error, info){
//         if(error){
//            console.log(error.response)
//            addEmail(companyName,email,bccE,error)
//            return
//         }
//         console.log(info.response)
//    })
   //********************************END************************************** */

   transporter.close()
   
}
const loadEmails= ()=>{
    try{
        const dataBuffer = fs.readFileSync(constants.unsentEmails)
        const dataJSON= dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch(e){
          return [];
    }

}
const addEmail=(name,email,bccE,error)=>{
    const emails=loadEmails()
    emails.push({
          name:name,
          allEmails:email,
          bcc:bccE,
          error:error
        })
    const dataJSON=JSON.stringify(emails)
    fs.writeFileSync(constants.unsentEmails,dataJSON)
}


module.exports={sendMail,loadEmails}

