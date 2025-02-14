import "./style.css";
let btn = document.querySelector("button")
let div = document.querySelector(".data")
let bo = document.querySelector(".con")
let fe = document.querySelector(".fe")
btn.addEventListener('click', () => {
    let input = document.querySelector("input").value
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?key=XPZVZZ7CSC7VZENWXY7YK3NHY`
    f(url)
})
async function f(url) {
    div.textContent = ""
    bo.textContent = ""
    fe.textContent = ""
    let a = await fetch(url, { mode: 'cors' })
    let r = await a.json()
    console.log(r)
    let b1 = document.createElement("div")
    b1.textContent = `Description : ${await r.description}`
    bo.appendChild(b1)
    let b2 = document.createElement("div")
    b2.textContent = `Address : ${await r.resolvedAddress}`
    bo.appendChild(b2)
    let b3 = document.createElement("div")
    b3.textContent = `Timezone : ${await r.timezone}`
    bo.appendChild(b3)
    let b4 = document.createElement("div")
    b4.textContent = `Latitude : ${await r.latitude}`
    bo.appendChild(b4)
    let b5 = document.createElement("div")
    b5.textContent = `Longitude : ${await r.longitude}`
    bo.appendChild(b5)
    let c = r.currentConditions
    for (let key in c) {
        let b = document.createElement("div")
        if (key == "temp" || key == "feelslike") {
            c[key] = await toC(c[key])
        }
        b.textContent = `${key}: ${c[key]}`
        bo.appendChild(b)
    }
    for (let i = 0; i < 15; i++) {
        let d = document.createElement("div")
        let s1 = document.createElement("span")
        s1.textContent = "Date: " + r.days[i].datetime
        d.appendChild(s1)
        let s2 = document.createElement("span")
        let t = await toC(r.days[i].temp)
        s2.textContent = "Temp: " + t
        d.appendChild(s2)
        let s3 = document.createElement("span")
        let dayOfWeek = new Date(r.days[i].datetime).toLocaleDateString('en-US', { weekday: 'long' });
        s3.textContent = dayOfWeek
        d.appendChild(s3)
        div.appendChild(d)
    }
}
async function toC(temp) {
    return parseFloat(((temp - 32) * 5 / 9).toFixed(2));
}