dynamicPricingTable()
function dynamicPricingTable() {
    let pricingComponents = document.querySelectorAll('[pricing-component]');
    if (pricingComponents.length < 1) return
    pricingComponents.forEach(component => {
        let currencySwitchBtns = component.querySelectorAll('[currency-switch]')
        let pricingSwitchBtns = component.querySelectorAll('[pricing-switch]')
        let pricingObjectName = component.getAttribute('pricing-data')
        let pricingObject = eval(pricingObjectName)
        const plans = Object.keys(pricingObject.monthly);
        const updatePrices = (type) => {
            const activeCurrency = component.querySelector('[currency-switch].active');
            const currencyValue = activeCurrency ? activeCurrency.getAttribute('currency-switch') : 'gbp';
            updatePricingText(type);
            plans.forEach(plan => {
                component.querySelector(`[plan-price = "${plan}"]`).innerText = getPrice(plan, currencyValue, type);
            });
        };
        const getPrice = (plan, currency, type) => {
            const price = pricingObject[type][plan][currency];
            return `${pricingObject.currency[currency]}${price}`;
        };
        const updatePricingText = (type) => {
            component.querySelectorAll(`[per-period-text]`).forEach(text => {
                text.innerHTML = document.querySelector(`[text-${type}]`).getAttribute(`text-${type}`)
            })

        };
        pricingSwitchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                pricingSwitchBtns.forEach(btn => btn.classList.remove('active'))
                btn.classList.add('active')
                let selectedPlanType = btn.getAttribute('pricing-switch')
                updatePrices(selectedPlanType)
            })
        })
        currencySwitchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currencySwitchBtns.forEach(btn => btn.classList.remove('active'))
                btn.classList.add('active')
                updatePrices(component.querySelector('[pricing-switch].active').getAttribute('pricing-switch'))
            })
        })
        updatePrices(component.querySelector('[pricing-switch].active').getAttribute('pricing-switch'));
    })
}
