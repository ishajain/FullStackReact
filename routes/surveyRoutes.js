const _ = require("lodash");
const Path = require("path-parser").default;
const { URL } = require("url");
const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");

const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");
const Survey = mongoose.model("surveys"); // Fetching of schema

module.exports = app => {
  const pattern = new Path("/api/surveys/:surveyId/:choice");

  app.post("/api/surveys/webhooks", (req, res) => {
    const uniqEvents = _.chain(req.body)
      .map(({ email, url }) => {
        const match = pattern.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    console.log(uniqEvents);

    res.send({});
  });

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!!");
  });
  //Create a new survey and send out email to all the recipients
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = await new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();

      await survey.save();

      req.user.credits -= 1;

      const user = await req.user.save();

      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  });

  //Get all the list of the survey for the user
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveyList = await Survey.find({ _user: req.user.id }).select({
      _user: 0,
      recipients: 0
    });
    res.send({ surveyList });
  });
};
