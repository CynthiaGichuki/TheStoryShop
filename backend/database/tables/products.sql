SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Products](
	[product_ID] [varchar](255) NOT NULL,
	[title] [varchar](255) NOT NULL,
	[author] [varchar](255) NOT NULL,
	[bookDescription] [varchar](255) NOT NULL,
	[imageURL] [varchar](255) NOT NULL,
	[price] [varchar](255) NOT NULL,
	[category] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[product_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
