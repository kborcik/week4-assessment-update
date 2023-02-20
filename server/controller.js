let secrets = []

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req,res) => {
        const fortunes = [`Believe it can be done.`,
            `Better ask twice than lose yourself once.`,
            `Bide your time, for success is near.`,
            `Chance favors those in motion.`,
            `Carve your name on your heart and not on marble.`]

            let randomIndex = Math.floor(Math.random() * fortunes.length)
            let randomFortune = fortunes[randomIndex]

            res.status(200).send(randomFortune)


    },
    secretPost: (req,res) => {
        let {secret} = req.body
        console.log(secret)
        secrets.push(secret)
        console.log(secrets)

        res.status(200).send(secrets)
    },
    getSecrets:(req,res) => {
        res.status(200).send(secrets)
    },
    deleteSecret: (req,res) => {
        let { index } = req.params
        secrets.splice(+index,1)
        res.status(200).send(secrets)
    },
    codeSecret: (req,res) => {
        let oldSecret  = req.params.secret
        let codedSecret = req.body.secret
        for (let i = 0; i < secrets.length; i++) {
          if (secrets[i] === oldSecret) {
            secrets[i] = codedSecret
            res.status(200).send(secrets)
            return
          }
        }
    },
    deCodeSecret: (req,res) => {
        let codedSecret  = req.params.secret
        let deCodedSecret = req.body.secret
        for (let i = 0; i < secrets.length; i++) {
          if (secrets[i] === codedSecret) {
            secrets[i] = deCodedSecret
            res.status(200).send(secrets)
            return
          }
        }
    }
       
      
}