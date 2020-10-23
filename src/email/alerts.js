const sgMail = require('@sendgrid/mail')


const sendMail = (name, email, time) => {
    sgMail.setApiKey(process.env.TOKEN_SEND_GRID)
    
    const contentHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Correo</title>
        </head>
        <body>
            <ul>
                <li>Nombre: ${name}</li>
            </ul>
            <p>${time}</p>
        </body>
        </html>
    `

    const msg = {
        to: email,
        from: 'redbucal.info@gmail.com',
        subject: 'Pronta finalización - Red Bucal',
        text: 'texto de inicio',
        html: contentHTML
    }

    try {
       sgMail.send(msg) 
       console.log('email was sended to ' + email)
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendMail