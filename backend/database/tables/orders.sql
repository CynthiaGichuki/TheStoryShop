SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[orders](
	[orderID] [varchar](255) NOT NULL,
	[user_ID] [varchar](100) NOT NULL,
	[product_ID] [varchar](255) NOT NULL,
	[quantity] [int] NOT NULL,
	[totalPrice] [varchar](255) NOT NULL,
	[orderDate] [datetime] NULL,
	[orderStatus] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[orderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[orders] ADD  DEFAULT (getdate()) FOR [orderDate]
GO
ALTER TABLE [dbo].[orders] ADD  DEFAULT ('pending') FOR [orderStatus]
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD FOREIGN KEY([product_ID])
REFERENCES [dbo].[Products] ([product_ID])
GO
ALTER TABLE [dbo].[orders]  WITH CHECK ADD FOREIGN KEY([user_ID])
REFERENCES [dbo].[Users] ([user_ID])
GO
