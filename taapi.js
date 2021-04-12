const taapi = require('taapi');
const client = taapi.client("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNjb21icmlkYWU3OEBnbWFpbC5jb20iLCJpYXQiOjE2MTgyMDUxNzAsImV4cCI6NzkyNTQwNTE3MH0.ZBb1UksSaUSCCm7gXP51uwH76fyrIIGIGDje-YaLcFE");

async function calculateRSI() {
    let rsi = 0;
    await client.getIndicator("rsi", "binance", "BTC/USDT", "5m").then(function (result) {
        rsi = result;
    });
    return rsi;
}
    
module.exports = {
    rsi: calculateRSI
};