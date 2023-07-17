
import ReducUser from "../Models/reducUser_model.js";
import User from "../Models/user.js";


export async function addReducUser(req,res){
     var code = generateRandomString(8);
     const user = await User.findOne({_id: req.body.id_user})

    try {
        const reduc = await ReducUser.create({
            id_user: req.body.id_user,
            id_evenement: req.body.id_evenement,
            code: code,
            consome: false
        })
        res.status(200).json({
            result: true,
          });
       try {
        const html = fs.readFileSync('../Backend/utils/content_codeReduction.html', 'utf-8');
        const template = handlebars.compile(html);
      
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: 'Bozyacine1@gmail.com',
            pass: process.env.pass,
          },
        });
      
        const replacements = {
          name: ``,
          action_url: "http://localhost:3000/reset-password",
          code: code
        };
        const htmlToSend = template(replacements);
      
        transporter.sendMail({
          from: 'devtestmailer101@gmail.com',
          to: user.mail,
          subject: 'Participation événement',
          html: htmlToSend,
        }, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send email' });
          } else {
            console.log('Email sent:', info.response);
            res.json({ message: 'Email sent successfully' });
          }
        });
       } catch (error) {
        res.status(500).json({
            result: false,
            message: "erreur transfert email"
          });
       }

    } catch (error) {
        res.status(500).json({
            result: false,
          });
    }

}

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }