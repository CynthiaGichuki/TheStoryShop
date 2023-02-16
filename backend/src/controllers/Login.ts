import { Request, Response, NextFunction, RequestHandler } from 'express'
import pool from '../config/config'
import bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'

const saltRounds = 10

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'samuelnderitu495@gmail.com',
    pass: 'vlnanwdotnasiywb'
  }
})

export const createUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_ID, first_name, last_name, email, user_password, user_role } = req.body
    // const hash = await bcrypt.hash(password, saltRounds); 
    const query = 'INSERT INTO Users (user_ID, first_name, last_name, email, user_password, user_role) VALUES ($1, $2, $3, $4, $5, $6)'
    const values = [user_ID, first_name, last_name, email, user_password, user_role]
    await pool.query(query, values)

    const mailOptions = {
      from: 'samuelnderitu495@gmail.com',
      to: email,
      subject: 'Successful Registration',
      text: 'You have successfully registered'
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`Email sent: ${info.response}`)
      }
    })

    res.json({ message: 'User successfully inserted' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const loginUser: RequestHandler =async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const query = `SELECT * FROM Users WHERE email = '${email}' AND user_password = '${password}'`;
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      res.status(401).send('Invalid email or password');
    } else {
      const user = result.rows[0];

      const token = jwt.sign({ user_ID: user.user_ID }, 'your_secret_key', { expiresIn: '1h' }); 

      res.send({ token: token,email:email });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('An error occurred while logging in');
  }
};

    export const updateUser: RequestHandler = async (req: Request, res: Response, _next: NextFunction) => {
        try {
          const { user_ID, first_name, last_name, email, password, user_role } = req.body as {
            user_ID: string,
            first_name: string,
            last_name: string,
            email: string,
            password: string,
            user_role: string
          }
      
          const hash = await bcrypt.hash(password, saltRounds)
      
          await pool.query(
            `UPDATE Users
            SET first_name='${first_name}', last_name='${last_name}', email='${email}', password='${hash}', user_role='${user_role}'
            WHERE user_ID='${user_ID}'`
          )
      
          res.json({ message: 'User successfully updated' })
        } catch (error: any) {
          console.log(error)
          res.status(500).json({ message: 'An error occurred, please try again later' })
        }
      }

      

      export const deleteUser: RequestHandler = async (req: Request, res: Response, _next: NextFunction) => {
        try {
          const { user_ID } = req.body as {
            user_ID: string
          }
      
          await pool.query(
            `DELETE FROM Users WHERE user_ID='${user_ID}'`
          )
      
          res.json({ message: 'User successfully deleted' })
        } catch (error: any) {
          console.log(error)
          res.status(500).json({ message: 'An error occurred, please try again later' })
        }
      }

      
     
      
      export const getAUser: RequestHandler = async (req: Request, res: Response, _next: NextFunction) => {
        try {
          const { user_ID } = req.params as { user_ID: string };
          const { email, password } = req.body as { email: string; password: string };
      
          const user = await pool.query(`SELECT * FROM Users WHERE user_ID = '${user_ID}' AND email = '${email}' AND user_password = '${password}'`);
      
          if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found or invalid email/password' });
          }
      
          const token = jwt.sign({ user_ID }, 'secret_key', { expiresIn: '1h' });
      
          res.json({ user: user.rows[0], token });
        } catch (error: any) {
          console.log(error);
          res.status(500).json({ message: 'An error occurred, please try again later' });
        }
      }}
      

      
      export const getUsers: RequestHandler = async (req: Request, res: Response, _next: NextFunction) => {
        try {
          const users = await pool.query(`SELECT * FROM Users`)
      
          if (users.rows.length === 0) {
            return res.status(404).json({ message: 'No users found' })
          }
      
          res.json({ users: users.rows })
        } catch (error: any) {
            console.log(error)
            res.status(500).json({ message: 'An error occurred, please try again later' })
          }
        }