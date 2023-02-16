SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getOrders]
AS
BEGIN
  SELECT orderID, user_ID, product_ID, quantity, totalPrice, orderDate, orderStatus FROM orders
END
GO
