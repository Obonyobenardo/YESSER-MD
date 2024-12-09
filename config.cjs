// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUQ3dHQxWGY0T0hpQUhjSnl3ZlhBdFB4MWFaQVphMHowWi9YWWw0enExOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRytkQk9WMEt0Mkk5MmZCR1dtdlJqdlVxMW5BdlFFUUt3cXF2RnhaT0Fpbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpQWVHOFMzaDdRWG9vMU1XSHhpYkhYNm1YbFhXZHpDTHROclpZMEVRWDFrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1N3ZWQllXcFlmZVorN0Y5Snk4a2M3U0t3SXo0TmlpYmtCQVliUkFzOENnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1JRXVHb3Zhc1pNWld4c1l4MzhlS0tFcVpxWWNEWnk0TThxeHJ4MVVBRkE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjcrUHdBRXl5SVd6eEhhdkJvRCtPV05MVDFnN2l1c0NRcVl6dFVCdHJLbU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUljR2VTWkZ1OW13cWNMZ202MUJYOUUvVVFTWU40SnRUZjhTMG5rQjRFMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVU3VjVSeURiSmtsWWhTczEzSW4va0NXTC83UDlZTDlOaXlQdXlBREJIbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktMM3p5eWx5NDJxZHlpS1JXN1NrUThud2NIRWtzaDZEaHZla0RkaFg5L2x3QURVR3ROdE5ubUFKakoxVjlyNERYVDdjRXVkekxUTVFqTjFySVdBS0J3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjksImFkdlNlY3JldEtleSI6IjhjNWpTNzV3VnpWUEl4ajMrclpZci9RVHJXeE0wZkNuREt4akRpd0NWa0k9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ik1aTTdIY09xVE9TVmcwdXI5X1l1ZmciLCJwaG9uZUlkIjoiZDc3ZDk0ZDctZjY5MS00YWVlLWFlYzEtMjYxOGFlYzBiMjZhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1Kc2lUZ0NiSWNKcUpLcWEvNE9xUXhnSjNUaz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZN0ZnSFhSNWZ5Nk5VMU1xQkxYekxxVnloRkE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiU1IxNjFNTkYiLCJtZSI6eyJpZCI6IjI1NDc5OTQxNDI0Njo1NUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSksvb0hzUTBKWGF1Z1lZQVNBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiWHQzTGhSSTZRalVPcEt1SFhQb29nZGZpMWY1Sis3OVpjM0dPVjdJVWVFdz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWUNoWmZjS2VQUERINzNjdHV3R05oVWFYSmpKSTkwa3lMQ0RucGppREIvT2xjNG1aUGV5bGF3TGw1a0hSRXFQZzBxT3VWMW5YeDBQVmFUeFdBOTRmQlE9PSIsImRldmljZVNpZ25hdHVyZSI6IlNDc0NIdXVHL1RxZ1FrYXBnOStLUnR6N1YrN2Z2Q082YjFFazM1SnEzYnljRkI1M21CWlEyV3Bwd1VqdGZLVXR3YW5RQWZ0OGpmRzcwZUluaEN1U0JBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0Nzk5NDE0MjQ2OjU1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlY3ZHk0VVNPa0kxRHFTcmgxejZLSUhYNHRYK1NmdS9XWE54amxleUZIaE0ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzM3MjQ4OTV9",
  PREFIX: process.env.PREFIX || '.',
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "©yessertech",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "255621995482",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
