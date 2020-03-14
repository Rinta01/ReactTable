// const baseUrl = 'http://www.filltext.com/?';
const smallUrl =
    'http://www.filltext.com/?rows=32&id={number|1000}&firstname={firstName}&lastname={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
const bigUrl =
    'http://www.filltext.com/?rows=1000&id={number|1000}&firstname={firstName}&delay=3&lastname={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
const sampleData = [
    {
        id: 0,
        firstname: 'Ivan',
        lastname: 'Ivanov',
        email: 'iivanov@gmail.com',
        phone: '8(800)555-4545',
        address: {
            streetAddress: '1363 Nullam Ct',
            city: 'Big Bear',
            state: 'IN',
            zip: '38025',
        },
        description: 'Sample data',
    },
];
export async function fetchSmallData() {
    let smallData = await fetch(smallUrl).catch(error => console.log(error));
    return (await smallData.json()) || sampleData;
}

export async function fetchBigData() {
    let bigData = await fetch(bigUrl).catch(error => console.log(error));
    return (await bigData.json()) || sampleData;
}
