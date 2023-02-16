SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getProduct]
AS
BEGIN
  SELECT title, author, bookDescription, imageURL, price, category FROM Products
END
GO
