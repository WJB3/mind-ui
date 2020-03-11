/**
 * 加法
 * @param fa //float A number
 * @param fb //float B number
 */

function floatAdd(fa,fb){
    let num1=Number(fa);
    let num2=Number(fb);
    let dec1,dec2,times;
    try{dec1=countDecimals(num1)}catch(e){dec1=0;}
    try{dec2=countDecimals(num2)}catch(e){dec2=0;}
    times=Math.pow(10,Math.max(dec1,dec2));//倍数
    return (num1*times +num2*times)/times;
}

/**
 * 计算小数位的长度
 * @param num 
 */
function countDecimals(num){
    return String(num).split('.')[1].length;
}

 