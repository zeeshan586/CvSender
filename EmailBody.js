const getEmailBody = (senderName,compnayName)=>{

const body = `Hi,

I hope this email finds you well. My name is ${senderName} and I am writing to express my interest in the position of Software Engineer working at an esteemed organization like ${compnayName}.

As an experienced software engineer with a solid background in Java, Spring Boot, SQL, Mongo, and Node.js, I am confident that I have the skills and expertise necessary to make a valuable contribution to your team. I have designed and implemented service-oriented architectures and RESTful web services using Spring Boot and Node.js.

I have attached my resume for your review, which includes a detailed summary of my skills and experience. I am excited about the opportunity to join your team and contribute to your mission.

Thank you for considering my application. I look forward to hearing from you soon.

Best regards,
${senderName}`;

return body;
}

module.exports= getEmailBody;