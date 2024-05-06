dynamicPricingTable()
function dynamicPricingTable() {
    let pricingComponents = document.querySelectorAll('[w-pricingComponent]');
    if(pricingComponents.length<1) return
    pricingComponents.forEach(component => {
        let currencyBtns = component.querySelectorAll('[w-currencyOption]')
        let planPeriodBtns = component.querySelectorAll('[w-planPeriod]')
        let pricingObjectName = component.getAttribute('w-pricingData')
        let pricingObject = eval(pricingObjectName)
        const plans = Object.keys(pricingObject.monthly);
        const updatePrices = (type) => {
            const activeCurrency = component.querySelector('[w-currencyOption].active');
            const currencyValue = activeCurrency ? activeCurrency.getAttribute('w-currencyOption') : 'gbp';
            plans.forEach(plan => {
                component.querySelector(`[w-planPrice = "${plan}"]`).innerText = getPrice(plan, currencyValue, type);
                updatePricingText(type);
            });
        };
        const getPrice = (plan, currency, type) => {
            const price = pricingObject[type][plan][currency];
            return currency === 'inr' ? `${pricingObject.currency[currency]}${price.toLocaleString('en-IN')}` : `${pricingObject.currency[currency]}${price}`;
        };
        const updatePricingText = (type) => {
            let planPeriodTexts = Array.from(component.querySelectorAll('[w-planPeriodText]'))
            planPeriodTexts.forEach(text => text.style.display = 'none')
            let selectedPeriod = planPeriodTexts.filter(item => {
                return item.getAttribute('w-planPeriodText') == type
            })
            selectedPeriod.forEach(item => item.style.display = 'block')
        };
        planPeriodBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                planPeriodBtns.forEach(btn => btn.classList.remove('active'))
                btn.classList.add('active')
                let selectedPlanType = btn.getAttribute('w-planPeriod')
                updatePrices(selectedPlanType)
            })
        })
        currencyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                currencyBtns.forEach(btn => btn.classList.remove('active'))
                btn.classList.add('active')
                updatePrices(component.querySelector('[w-planPeriod].active').getAttribute('w-planPeriod'))
            })
        })
        // Initial update
        updatePrices(component.querySelector('[w-planPeriod].active').getAttribute('w-planPeriod'));
    })    
}
