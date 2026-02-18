const companyAndEmails = require('./excelReader')
const { sendMail, loadEmails } = require('./email')
const fs = require('fs')

const PROGRESS_FILE = 'progress.json'
const UNSENT_FILE = 'unsent.json'

// Load last progress
let lastIndex = 0
if (fs.existsSync(PROGRESS_FILE)) {
    lastIndex = JSON.parse(fs.readFileSync(PROGRESS_FILE)).lastIndex
}

// Helper to save progress
const saveProgress = (index) => {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ lastIndex: index }))
}

// Send emails with resume functionality
const sendEmails = async () => {
    for (let i = lastIndex; i < companyAndEmails.length; i++) {
        const company = companyAndEmails[i]

        try {
            if (company.allEmails.length > 1) {
                const email = company.allEmails.shift()
                await sendMail(company.companyName, email, company.allEmails)
            } else {
                await sendMail(company.companyName, company.allEmails)
            }

            console.log(`Sent: ${company.companyName}`)
            saveProgress(i + 1) // Save after each successful company

        } catch (err) {
            console.log(`Error sending to ${company.companyName}:`, err)
            console.log('Stopping to respect Gmail limit or failure.')

            // Save remaining unsent emails
            const unsent = companyAndEmails.slice(i)
            fs.writeFileSync(UNSENT_FILE, JSON.stringify(unsent, null, 2))
            break // stop sending
        }
    }

    console.log('Email sending done for today.')
}

sendEmails()
