const express = require('express');
const cloudmessage = require('../messaging/cloudmessage');
const router = express.Router();
const Tokens =require('../models/Tokens') 
const {tokenParse} =require('../parse/parse')


/**
 * GET :  /
 * DESC : to test server
 */
router.get('/', (req, res) => {
    res.send({ message: "Api is working" });
})




/**
 * POST : /
 * DESC : the main  route to deliver message
 */

router.post('/',(req, res)=> {
    const updation = req.body;
   
  
    updation.coordinates.forEach(
        (value) => {
            value = tokenParse(value);
            Tokens.find(
                {
                    latitude:{
                        $gte: parseFloat( value.latitude) -0.0003,
                        $lte:   parseFloat(  value.latitude)+0.0003
                    },
                    longitude:{
                        $gte: parseFloat( value.longitude) -0.0003,
                        $lte:   parseFloat(  value.longitude)+0.0003
                    }

                }).then(
                    (current) => {
                        console.log(current);
                        current.forEach((currenttoken)=>{
                    currenttoken.token.forEach(
                        (hash) => {
                            console.log({
                                ambulanceno: updation.ambulaceno,
                                from: updation.from,
                                to: updation.to,
                                mobileno: updation.mobileno,
                                duration: parseInt( value.duration),
                            });
                            console.log(hash);
                            cloudmessage(hash,
                                {
                                    ambulanceno: updation.ambulaceno,
                                    from: updation.from,
                                    to: updation.to,
                                    mobileno: updation.mobileno,
                                    duration:  parseInt( value.duration),
                                });
                         }
                     ) 
           
                     })
                    }
              
            ).catch(err => {
                res.status(400).send({message:"Token found error"})
            });
 

        }
    )
     

    res.send("sucess")
})

/**
 * POST :  /register
 * DESC :   register for updates
 */
router.post('/register',async (req, res)=> {
   req.body =await tokenParse(req.body);
    if (! await Tokens.exists({ longitude: req.body.longitude, latitude: req.body.latitude })) {
        const newToken = new Tokens({
            longitude: req.body.longitude, latitude: req.body.latitude,
            token:[]           
        })
      await  newToken.save()
    }
 
    Tokens.findOne({ longitude: req.body.longitude, latitude: req.body.latitude }).then( async(tokens) => {        
        if (tokens.token.includes(req.body.token)) {
            res.status(400).send({ message: "already registered" })

        } else {
             tokens.token.push(req.body.token)
            await tokens.save()

            res.send({ message: "Success fully registered" });
        }
    }).catch((err) => {
        res.status(400).send({message:"registration error"});
    })  
})






/**
 * DELETE :  /register
 * DESC :   de-register for updates
 */
router.delete('/register', async (req, res) => {
     req.body =await tokenParse(req.body);
        Tokens.findOne({ longitude: req.body.longitude, latitude: req.body.latitude }).then( async(tokens) => {        
        if (await tokens.token.includes(req.body.token)) {
          await  tokens.token.remove(req.body.token);
          await  tokens.save()
           res.send({message:"unregistered"})
        } else {
           res.status(400).send({message:"Not registered"})
        }
    }).catch((err) => {
        res.status(400).send(err);
    })
})









module.exports = router;