//@ts-check

const servicesConfigurationEx = [
    {
        name: 'Posthog',
        url: 'https://posthog.com',
    },
    {
        name: 'Sentry',
        url: 'https://sentry.io',
    },
    // {
    //     name: 'Umami',
    //     url: 'https://umami.is',
    // },
    {
        name: 'Google Analytics',
        url: 'https://analytics.google.com/analytics/web/',
    }
]
/**
 * Type for the services configuration.
 * @typedef {Array<{name: string, url: string}>} ServicesConfiguration
 */



/**
 * @param {ServicesConfiguration} servicesConfiguration
 */
function registerAnalyticsWithPopup(servicesConfiguration = servicesConfigurationEx) {
    createPopupComponent(servicesConfiguration);
}

window.addEventListener('load', () => registerAnalyticsWithPopup());


function checkIfConsentedAlready(){

}

/**
 * @param {ServicesConfiguration} servicesConfiguration
 */
function createPopupComponent(servicesConfiguration) {

    console.log("loaded")

    const div = document.createElement('div');
    div.style.cssText = `
        position: fixed;
        bottom: 0rem;
        right: 0rem;
        margin: 1rem;
        padding-bottom: 1rem;
        padding-top: 1.5rem;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        max-width: 33rem;
        max-width: 39rem;

        border-radius: .3rem;
        // outline: 1px solid bl;
        box-shadow: 0 0 .2rem .1rem rgba(0,0,0,.2);
        
        
        
        
        background-color: #e6e6e6;
        color: black;

        
        
    `

    const h1 = document.createElement('h1');
    h1.innerText = 'Do you consent to being tracked?';
    h1.style.cssText = `
        margin: 0;
        margin-bottom: .75rem;
        font-size: 1.5rem;
    `

    div.appendChild(h1);

    const textSection = document.createElement('div')

    textSection.style.cssText = `
        padding-right: 4rem;
    `

    const pStyle = `
        font-size: 1.2rem
    
    `

    const p1 = document.createElement('p');
    p1.innerText = ` I use this to help me know how users are using my websites, and what things to focus on for improvement. Also to detect bugs. 
    `;
    p1.style.cssText = `
        margin: 0;
        margin-bottom: .5rem;
        ${pStyle}
    `
    textSection.appendChild(p1);
    const p2 = document.createElement('p');
    p2.innerText = `I respect your privacy and try not to include sensitive information in my tracking. However, many people might disagree with the amount of data that these tools collect, in that case just click 'No'`;
    p2.style.cssText = `
        margin: 0;
        margin-bottom: .5rem;
        ${pStyle}
    `

    textSection.appendChild(p2);

    const p3 = document.createElement('p');
    p3.innerText = `Clicking yes will enable the following analytics tools:
    `;
    p3.appendChild(getServicesText(servicesConfiguration))
    p3.style.cssText = `
        margin: 0;
        margin-bottom: .6rem;
        ${pStyle}
    `

    textSection.appendChild(p3);

    const breaker = document.createElement('div');
    breaker.innerText = '';
    // breaker.href = 'javascript:alert("Coming soon. For now, you can google the mentioned tools")';
    breaker.style.cssText = `
        font-size: 1.1rem;
        // // color: blue;
        // text-decoration: none;
        
        
        margin-top: 1rem;
        margin-bottom: 1.5rem;
        display: block;
    `
    textSection.appendChild(breaker);

    div.appendChild(textSection)

    const buttonsDiv = document.createElement('div');
    buttonsDiv.style.cssText = `
        display: flex;
        justify-content: flex-end;
        gap: .9rem;
    `

    const yes = document.createElement('button');
    const no = document.createElement('button');
    yes.innerText = 'Yes';
    no.innerText = 'No';

    const buttonStyle = `
        padding: .7rem;
        width: 7.5rem; 
        font-size: 1.4rem;
        border: none;
        border-radius: .3rem;
        color: white;
        background: linear-gradient(to right, rgb(120, 120, 120), rgb(107, 107, 107));
        background: rgb(80,80,80);
        cursor: pointer;
        outline: none;
    `
    yes.style.cssText = `
        ${buttonStyle}
        // background-color: #4CAF50;
    `;
    no.style.cssText = `
        ${buttonStyle}
        // background-color: #f44336;
    `


    buttonsDiv.appendChild(yes);
    buttonsDiv.appendChild(no);
    div.appendChild(buttonsDiv);


    const learnMore = document.createElement('a');
    learnMore.innerText = 'Learn More';
    learnMore.href = 'https://github.com/AdityaBhatnagar/privacy-notice';
    learnMore.target = '_blank';
    learnMore.style.cssText = `
        color: rgba(0, 0, 255, .85);
        font-size: 1.2rem;

        position: absolute;
        bottom: 1.25rem;
        let: 1rem;
    `
    div.appendChild(learnMore);

    document.body.appendChild(div);

}

/**
 * @param {ServicesConfiguration} config
 */
function getServicesText(config) {
    // const config = 
    const servicesSpan = document.createElement('span');
    servicesSpan.style.cssText = `
    `

    for (let i = 0; i < config.length; i++) {
        const service = config[i];
        const anchor = document.createElement('a');
        anchor.innerText = service.name;
        anchor.href = service.url;
        anchor.target = '_blank';
        anchor.style.cssText = `
            color: blue;
            
        `
        servicesSpan.appendChild(anchor);
        if (i < config.length - 1) {
            servicesSpan.appendChild(document.createTextNode(', '));
        }
    }

    return servicesSpan;
}
