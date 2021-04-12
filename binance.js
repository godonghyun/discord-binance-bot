const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: 'P8ofVDgdvwdxCUtfeugksJ7m3y3Ylocy1FCg95qY2gQCgiN72MpZNU4rE3rU8C7H',
    APISECRET: 'ScSmj5tNOpYM7ZPIiGPwSf02K2NSHBXlmLk5SZNMXBPUGuNgCnlJeA5CgzX6HknO',
    useServerTime: true,
});

/* VARIABLES */
let listClose = [];
let changeUp = 0;
let changeDown = 0;
let last_closeHigh = 0;
let last_closeLow = 0;
let current_time = Date.now();
let period = 14;

async function calculateRSI() {
    const rsiLength = 14;

    const data = await binance.futuresCandles("BTCUSDT", "1m");

    let gain = 0
    let loss = 0;
    let avgGain = 0
    let avgLoss = 0;

    for (i = 1; i <= rsiLength; i++){
        let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = data[data.length - i];
        
        open = parseFloat(open);
        close = parseFloat(close);

        if (open <= close) {
            gain += close - open;
        } else {
            loss += open - close;
        }
    }

    let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = data[data.length - 1];
    
    lastGain = open <= close ? close - open : 0;
    lastLoss = open > close ? open - close : 0;

    avgGain = gain / (rsiLength - 1) + lastGain / rsiLength;
    avgLoss = loss / (rsiLength - 1) + lastLoss / rsiLength;

    const RS = avgGain / avgLoss;
    const RSI = (100 - (100 / (1 + RS)));

    return RSI;
};

module.exports = {
    rsi: calculateRSI
};