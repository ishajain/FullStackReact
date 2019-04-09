const requireLogin = require("../middlewares/requireLogin")
const mongoose = require('mongoose');

const requireCredits = require("../middlewares/requireCredits")
const Mailer = require("../services/Mailer")
const surveyTemplate = require("../services/emailTemplates/surveyTemplate")
const Survey = mongoose.model("surveys"); // Fetching of schema

module.exports = app => {
 
    app.get("/api/surveys/thanks",   (req,res) => {
        res.send("Thanks for voting!!")
    })
    //Create a new survey and send out email to all the recipients
    app.post("/api/surveys", requireLogin , requireCredits, async (req,res) => {

        const { title, subject, body, recipients} = req.body

        const survey = await new Survey({
            title,
            subject,
            body,
            recipients: recipients.split(",").map(email => ({email: email.trim()})),
            _user: req.user.id,
            dateSent :  Date.now(),
             

          })

          const mailer = new Mailer(survey,surveyTemplate(survey))

          try {

            await mailer.send();

            await survey.save()
  
            req.user.credits -=1
  
            const user = await req.user.save()
  
            res.send(user)
              
          } catch (error) {
              res.status(422).send(error)
          }

         


       
    })

}