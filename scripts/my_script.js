const common = require('../assets/common');  
const apiKey = process.env.API_KEY; 
if (!apiKey) { 
    throw new Error("API Key is not defined. Please check your GitHub Actions secrets."); 
} 
console.log(`API Key: ${apiKey}`); 
console.log(`Common: ${common}`);