import express from 'express'


import { param,check } from 'express-validator';
import { addOrderItems, getOrderById, updateOrderToDeliver, updateOrderToPaid } from '../controllers/orderController.js';
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
    ],
    getOrderById:[
      param('id').notEmpty().withMessage('Id is required').isMongoId().withMessage('Invalid id Format')
    ],
    updateOrderToPaid:[
      param('id').notEmpty().withMessage("ID is required").isMongoId().withMessage("Invalid ID fromate")
    ],
    updateOrderToDeliver:[
      param('id').notEmpty().withMessage('Id is required').isMongoId().withMessage('Invalid id Format')
    ]
  };
  

router.route('/').post(validator.addOrderItems,validationRequest,addOrderItems)
router.route('/:id').get(validator.getOrderById,validationRequest,getOrderById)
router.put('/:id/pay',validator.updateOrderToPaid, validationRequest,updateOrderToPaid)
router.put('/:id/deliver',validator.updateOrderToDeliver,validationRequest,updateOrderToDeliver)

export default router