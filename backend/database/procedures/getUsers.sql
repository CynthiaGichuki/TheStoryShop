SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getUsers]
AS
BEGIN
  SELECT user_ID, first_name, last_name, email, user_role FROM Users
  WHERE user_role = 'customer'
END
GO
