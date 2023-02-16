import { Request, Response, NextFunction, RequestHandler } from 'express'
import pool from '../config/config'

export const createProduct: RequestHandler = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const prod  = Math.floor(Math.random() * 100000)
    const { title, author, bookDescription, imageURL, price, category } = req.body as {
      // product_ID:string,
      title: string,
      author: string,
      bookDescription: string,
      imageURL: string,
      price: string,
      category: string
    }
    
    await pool.query(
      `INSERT INTO Products (product_ID, title, author, bookDescription, imageURL, price, category)
      VALUES('${prod}' , '${title}' , '${author}' , '${bookDescription}' , '${imageURL}' , '${price}' , '${category}')`
    )

    res.json({ message: 'Product successfully Inserted' })
  } catch (error: any) {
    console.log(error)
  }
}

export const getProduct: RequestHandler = async (req, res) => {
  try {
    const allProducts = await pool.query(
      ` SELECT * FROM Products`
    )

    res.json(allProducts.rows)
  } catch (error: any) {
    console.log(error.message)
  }
}

export const getProductByID: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id
    const product = await pool.query(`SELECT * FROM Products WHERE product_ID = '${id}'`)

    res.json(product.rows)
  } catch (error: any) {
    console.log(error.message)
  }
}

export const deleteProduct: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id
    await pool.query(` DELETE FROM Products WHERE product_ID = '${id}'`)

    res.status(201).json({ message: 'Product Deleted Successfully' })
  } catch (error: any) {
    console.log(error.message)
  }
}

export const updateProduct: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id
    const { title, author, bookDescription, imageURL, price, category } = req.body as {
      title: string,
      author: string,
      bookDescription: string,
      imageURL: string,
      price: string,
      category: string
    }
    await pool.query(
      `UPDATE Products SET title='${title}', author='${author}', bookDescription='${bookDescription}', imageURL='${imageURL}', price='${price}', category='${category}'  WHERE product_ID='${id}' `
    )

    res.status(201).json({ message: 'Product Updated Successfully' })


    } catch (error:any) {
        console.log(error.message);
        
    }
}