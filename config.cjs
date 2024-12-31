// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUZoc1NKKzlyRGZMWFNIeU9YQ2I1bzY3dVEvbnB5RzRncUk2T0p4d3UwOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWjRYTEJsdEIxMUtHUTd6SDVTdlhHUG1oRTE1MEV1enl5eXhyQUtPZ2QzWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIySmtucE55TXluUllOVW9YVjhnS0ZLcmZ6MitaSFR3M0xVOTdORjFxYW1vPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwRXRoUzlBOXRRZmZOL1dubGY4WGxIdVErNzNwSFJieC9CY01kUk4vN1FBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFMampqVFJDNlFiUUZZRE9jTFBGb2dpaVMxOGhKemVUWk5SOXhBMExSSE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVUaUpzL1NuUnNHVDdLdkZWK2RvRVNqQUhXY01KUmtJeEg1RWdXb1o5MUE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0JRYmQvZlBQZFIzd0QvZStmeGI3NVV6YmhuNGpTdVdhc24zNlJwZTdrZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRlMvb1Y3czBIVDE4RWZSbkxCNjZQTWozcU0wTVAzd0hWS0Q4dDhZNGpEUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNTVUtRVHpXQ0QxZm5nblN6MEtZWGtJMjY0aG5GcGplcVd3UnQ2d25CVC9VSEJTMXRjdzE3MWxGVmlyMEx1dy8wd01WWkhPYlUyNFlEKzFibTg5ZmdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU4LCJhZHZTZWNyZXRLZXkiOiJJa3MxZ3FVUmJuYmlNNHR2bnR4MXJ0MDNzWUZ1L2NHZWpzSW91TERDekR3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI5YkVXalJwclRINmc2cWdOLVhlaVdBIiwicGhvbmVJZCI6IjVjMWQ3NmY3LTc1NDAtNDQyYy05ZmQ0LWY1Mjk2Y2JmYmYzNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJmSnlucTF5UTZpNy9xTlB1OG44U0J1dDQ0aU09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQVF5eVBaTXBMUy9WR0lGN3ZEclBBL0hTTktRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlZBNERSREJNIiwibWUiOnsiaWQiOiIyNTQ3OTk0MTQyNDY6ODhAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0t5L29Ic1FrTW5RdXdZWUFTQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ilh0M0xoUkk2UWpVT3BLdUhYUG9vZ2RmaTFmNUorNzlaYzNHT1Y3SVVlRXc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjYzR3NZTUo5TzRMM2lkR1NDSWZHamFYcnBMTnZDUDBvUUV1akFqR1lhSDJLZGtGa2FvU0ZGS3N4WFRVTnA4Z3dLc2FhWWw0cXljZVFtTXNIYmxmeUNnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJhR001dWhzOVJPNjFETjVzeEFtNnQveFRCUmxCeTFta3pBZkZzS1hHa3ltbk55WkZ0dXp1cWxvQWlmQUNrVll4aE8rQW9kT1VVbUJVUXc1VkpqRGpqUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc5OTQxNDI0Njo4OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWN2R5NFVTT2tJMURxU3JoMXo2S0lIWDR0WCtTZnUvV1hOeGpsZXlGSGhNIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM1NjY0Nzk3fQ==",
  PREFIX: process.env.PREFIX || '.',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'false' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'false' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'false' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'false' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'false' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'false' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'false' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "©yessertech",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "254799414246",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'false' : false, 
};


module.exports = config;
