SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getProductByCategory] (@category VARCHAR(255))
AS
BEGIN
  SELECT title, author, bookDescription, imageURL, price, category FROM Products
  WHERE category= @category
END
GO
