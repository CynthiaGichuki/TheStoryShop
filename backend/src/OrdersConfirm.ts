const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Middleware to check if user is authenticated
const checkAuth = require('../middleware/check-auth');

// Database models
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// POST request to create a new order
router.post('/', checkAuth, async (req, res) => {
  try {
    const user = await User.findOne({ user_ID: req.user.user_ID });
    const product = await Product.findOne({ product_ID: req.body.product_ID });

    if (!user || !product) {
      return res.status(404).json({ message: 'User or Product not found' });
    }

    const order = new Order({
      user_ID: req.user.user_ID,
      product_ID: req.body.product_ID,
      quantity: req.body.quantity,
      totalPrice: product.price * req.body.quantity,
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: 'Order created', order: savedOrder });

    // Send confirmation email using Node Mailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your email',
        pass: 'your password',
      },
    });

    const mailOptions = {
      from: 'sender email',
      to: user.email,
      subject: 'Order Confirmation',
      html: `
        <h2>Thank you for your order!</h2>
        <p>Your order has been processed and will be shipped soon.</p>
        <p>Order details:</p>
        <p>Order ID: ${savedOrder.orderID}</p>
        <p>Product: ${product.name}</p>
        <p>Quantity: ${savedOrder.quantity}</p>
        <p>Total Price: ${savedOrder.totalPrice}</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Order creation failed', error: error });
  }
});

// PUT request to update an order
router.put('/:orderID', checkAuth, async (req, res) => {
  try {
    const order = await Order.findOne({ orderID: req.params.orderID });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user_ID !== req.user.user_ID) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }const product = await Product.findOne({ product_ID: order.product_ID });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    order.quantity = req.body.quantity || order.quantity;
    order.totalPrice = product.price * order.quantity;
    
    const updatedOrder = await order.save();
    res.status(200).json({ message: 'Order updated', order: updatedOrder });
} catch (error) {
    res.status(500).json({ message: 'Order update failed', error: error });
    }
    });
    
    // DELETE request to cancel an order
    router.delete('/:orderID', checkAuth, async (req, res) => {
    try {
    const order = await Order.findOne({ orderID: req.params.orderID });if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      if (order.user_ID !== req.user.user_ID) {
        return res.status(401).json({ message: 'Unauthorized access' });
      }
      
      await order.delete();
      res.status(200).json({ message: 'Order canceled' });
    } catch (error) {
        res.status(500).json({ message: 'Order cancel failed', error: error });
        }
        });
        
        module.exports = router;          
