import express from 'express';
import validationRequest from '../middleware/validator.js';
import {body,check} from 'express-validator'
import { auth } from '../middleware/authMiddleware.js';
import { config, order } from '../controllers/paymentController.js';



const router=express.Router();

const validator={
    order:[
        body().custom(body=>{
            if(Object.keys(body).length===0){
                throw new Error("Request Body is empty!")
            }
            return true
        })
    ]
}

router.get('/razorpay/config',config)

router.route('/razorpay/order').post(validator.order,validationRequest,order)

export default router;