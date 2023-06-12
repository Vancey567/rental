const Joi = require('joi');

const validateBooking = (req, res, next) => {
    const schema = Joi.object({
        productId: Joi.string().required(),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

module.exports = {
    validateBooking,
};
