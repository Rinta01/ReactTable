// const baseUrl = 'http://www.filltext.com/?';
const smallUrl =
    'http://www.filltext.com/?rows=32&id={number|1000}&firstname={firstName}&lastname={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
const bigUrl =
    'http://www.filltext.com/?rows=300&id={number|1000}&firstname={firstName}&delay=3&lastname={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

export async function fetchSmallData() {
    let smallData = await fetch(smallUrl).catch(error => console.log(error));
    return smallData ? smallData.json() : null;
}

export async function fetchBigData() {
    let bigData = await fetch(bigUrl).catch(error => console.log(error));
    return bigData ? bigData.json() : null;
}
