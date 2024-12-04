const Joi=require("joi");


const schema = Joi.object({
    email: Joi.string()
        .min(3)
        .max(30)
        .required(),

    username: Joi.string()
        .min(4).max(12).required(),


    textarea: Joi.string()
        .min(10).max(100),
})


 module.exports={schema};

