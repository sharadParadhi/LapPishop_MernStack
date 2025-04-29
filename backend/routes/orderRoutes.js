import express from 'express'


import { param,check } from 'express-validator';
import { addOrderItems } from '../controllers/orderController.js';
import validationRequest from '../middleware/validator.js';
import { auth } from '../middleware/authMiddleware.js';


const router=express.Router()

const validator = {
    addOrderItems: [
      check('cartItems')
        .notEmpty().withMessage('Cart items are required'),
  
      check('shippingAddress')
        .notEmpty().withMessage('Shipping address is required'),
  
      check('paymentMethod')
        .notEmpty().withMessage('Payment method is required'),
  
      check('itemsPrice')
        .notEmpty().withMessage('Items price is required')
        .isNumeric().withMessage('Items price must be a number'),
  
      check('taxPrice')
        .notEmpty().withMessage('Tax price is required')
        .isNumeric().withMessage('Tax price must be a number'),
  
      check('shippingPrice')
        .notEmpty().withMessage('Shipping price is required')
        .isNumeric().withMessage('Shipping price must be a number'),
  
      check('totalPrice')
        .notEmpty().withMessage('Total price is required')
        .isNumeric().withMessage('Total price must be a number')
    ]
  };
  

router.route('/').post(validator.addOrderItems,validationRequest,auth,addOrderItems)

export default router