// const baseUrl = 'http://www.filltext.com/?';
const smallUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstname={firstName}&lastname={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
const bigUrl = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstname={firstName}&delay=3&lastname={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

export async function fetchSmallData() {
    let smallData = await fetch(smallUrl)
        .catch(error => console.log(error));
    let data = await smallData.json();
    // console.log(data);
    return data;
}

export async function fetchBigData() {
    let bigData = await fetch(bigUrl)
        .catch(error => console.log(error));
    return await bigData.json();
}