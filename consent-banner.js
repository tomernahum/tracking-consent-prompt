//@ts-check

const servicesConfiguration = [
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
        url: 'https://developers.google.com/analytics',
    }
]



const cssTemplate = `
    #consent-popup {
        position: fixed;
        bottom: 0rem;
        right: 0rem;
        margin: 1rem;
        padding-bottom: 1rem;
        padding-top: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
        max-width: 35rem;
        // max-width: 39rem;
        

        border-radius: .3rem;
        // outline: 1px solid bl;
        box-shadow: 0 0 .2rem .1rem rgba(0,0,0,.2);
        background-color: #e6e6e6;
        color: black;
        font-size: .9rem;
    }

    #consent-popup > h1 {
        margin: 0;
        margin-bottom: .75rem;
        font-size: 1.2rem;

    }

    #consent-popup > .textSection {
        // padding-right: 4rem;
        max-width: 35rem;
        
    }

    #consent-popup > .textSection > p {
        font-size: 1.1rem;
        margin: 0;
    }

    #consent-popup .breaker {
        margin-bottom: .75rem;
    }

    #consent-popup .bottomSection {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        flex-wrap: wrap;
        gap: .5rem;
        
        margin-top: 2rem;

    }

    #consent-popup .bottomSection .learnMore {
        color: rgb(0, 0, 255, .75);
        margin-bottom: .25rem;
        font-size: 1.1rem;
    }

    #consent-popup .buttonSection {
        display: flex;
        justify-content: center;
        gap: .9rem;
        // flex-wrap: wrap;
    }   
    
@media (max-width: 420px) {
    #consent-popup .buttonSection {
        flex-grow: 1;
    }
}

    #consent-popup .buttonSection > button {
        padding: .7rem;
        width: 7.5rem; 
        font-size: 1.1rem;
        border: none;
        border-radius: .3rem;
        color: white;
        background: linear-gradient(to right, rgb(120, 120, 120), rgb(107, 107, 107));
        background: rgb(80,80,80);
        cursor: pointer;
        outline: none;
    }

    #consent-popup .buttonSection > button:hover {
        background: rgb(100, 100, 100);
    }

    #consent-popup .buttonSection > button:active {
        background: rgb(70, 70, 70);
    }

    #consent-popup > .learnMore {
        // margin: 0;
        // color: rgba(0, 0, 255, 0.7);
        // font-size: 1.2rem;

        // position: absolute;
        // bottom: 1.5rem;
        // left: 1.5rem;
    }

`
const htmlTemplate = `
    <div id="consent-popup">
        <h1> Do you consent to being tracked? </h1>

        <div class="textSection">
            <p> 
                I use this to help me know how users are using my websites, and what things to focus on for improvement. 
                Also to detect bugs. 
            </p>
            <div class="breaker"> </div>
            <p>
                I respect your privacy and try not to include sensitive information in my tracking. 
                However, many people might disagree with the amount of data that these tools collect, in that case just click 'No'. 
            </p>
            
            <div class="breaker"> </div>
            <p>
                Clicking yes will enable to following analytics tools:
                <p style="margin: 0;">
                    <span id="servicesSpan">
                    </span>
                </p>
            </p>
            

            <div class="breaker"> </div>
        </div>

        <div class="bottomSection">
            <a class="learnMore" href="javascript:alert('coming soon');">
                Learn More
            </a>
            <div class="buttonSection">
                <button id="yesButton">Yes</button>
                <button id="noButton">No</button>
            </div>
        </div>
    </div>
    <style>
        ${cssTemplate}
    </style>
`


window.addEventListener('load', () => {
    const div = document.createElement('div');
    div.innerHTML = htmlTemplate;
    
    const servicesSpan = /** @type {HTMLElement} */ (div.querySelector('#servicesSpan'));
    servicesSpan.appendChild(getServicesText(servicesConfiguration));

    const yesButton = /** @type {HTMLElement} */ (div.querySelector('#yesButton'));
    const noButton = /** @type {HTMLElement} */ (div.querySelector('#noButton'));

    yesButton.addEventListener('click', () => {
    })
    noButton.addEventListener('click', () => {
    })

    document.body.appendChild(div);
})


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