'use strict'; n();
function n() {
    let g = document.querySelectorAll("[w-pricingComponent]"); 1 > g.length || g.forEach(d => {
        let h = d.querySelectorAll("[w-currencyOption]"), k = d.querySelectorAll("[w-planPeriod]"), p = d.getAttribute("w-pricingData"), e = eval(p); const q = Object.keys(e.g), f = b => {
            const c = d.querySelector("[w-currencyOption].active"), a = c ? c.getAttribute("w-currencyOption") : "gbp"; q.forEach(l => {
                const m = e[b][l][a]; d.querySelector(`[${l}price]`).innerText = "inr" === a ? `${e.currency[a]}${m.toLocaleString("en-IN")}` : `${e.currency[a]}${m}`;
                r(b)
            })
        }, r = b => { let c = Array.from(d.querySelectorAll("[w-planPeriodText]")); c.forEach(a => a.style.display = "none"); c.filter(a => a.getAttribute("w-planPeriodText") == b).forEach(a => a.style.display = "block") }; k.forEach(b => { b.addEventListener("click", () => { k.forEach(a => a.classList.remove("active")); b.classList.add("active"); let c = b.getAttribute("w-planPeriod"); f(c) }) }); h.forEach(b => { b.addEventListener("click", () => { h.forEach(c => c.classList.remove("active")); b.classList.add("active"); f(d.querySelector("[w-planPeriod].active").getAttribute("w-planPeriod")) }) });
        f(d.querySelector("[w-planPeriod].active").getAttribute("w-planPeriod"))
    })
};
