SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getSingleProduct] (@title VARCHAR(255))
AS
BEGIN
  SELECT title, author, bookDescription, imageURL, price, category FROM Products
  WHERE title= @title
END
GO
