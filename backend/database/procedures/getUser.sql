SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getUser] (@id VARCHAR(100))
AS
BEGIN
  SELECT user_ID, first_name, last_name, email, user_role FROM Users
  WHERE user_ID= @id
END
GO
