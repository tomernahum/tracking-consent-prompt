//@ts-check

const servicesConfiguration = [
    {
        name: 'Posthog',
        url: 'https://posthog.com',
        scriptTag: `
            <script>
                !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
                posthog.init('phc_DRljMkwhh9JiwqRSiUpAgfg0oamh3hsDP4voKNHMIcF',{api_host:'https://us.i.posthog.com', person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
                    })
            </script>
        `
    },
    // {
    //     name: 'Sentry',
    //     url: 'https://sentry.io',
    //     scriptTag: ``
    // },
    {
        name: 'Umami',
        url: 'https://umami.is',
        scriptTag: `<script defer src="https://umami.ttools.io/script.js" data-website-id="41bc8821-4a0b-4aa9-9bf2-84868492508b"></script>`
    },
    {
        name: 'Google Analytics',
        url: 'https://developers.google.com/analytics',
        scriptTag: `<>`
    },
]

/**
 * @typedef {Array<{name: string, url: string, scriptTag: string}>} ServicesConfiguration
 */



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
        // max-width: 50rem;
        max-width: 32rem;
        

        border-radius: .3rem;
        // outline: 1px solid bl;
        box-shadow: 0 0 .2rem .1rem rgba(0,0,0,.2);
        background-color: #e6e6e6;
        color: black;
    }

    #consent-popup > h1 {
        margin: 0;
        margin-bottom: .5rem;
        font-size: 1.4rem;

    }

    #consent-popup > .textSection {
        // padding-right: 4rem;
        // max-width: 35rem;
        
    }

    #consent-popup > .textSection > p {
        font-size: 1.1rem;
        margin: 0;
        // max-width: 0rem;
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
        
        margin-top: 1rem;

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
        padding: .5rem;
        width: 7.5rem; 
        height: 2.7rem;
        font-size: 1.2rem;
        border: none;
        border-radius: .3rem;
        color: white;
        background: linear-gradient(to right, rgb(120, 120, 120), rgb(107, 107, 107));
        background: rgb(80,80,80);
        cursor: pointer;
        outline: none;
    }

    #consent-popup .buttonSection > button:hover {
        // background: rgb(100, 100, 100);
    }

    #consent-popup .buttonSection > button:active {
        // background: rgb(70, 70, 70);
    }

    #consent-popup > .learnMore {
        // margin: 0;
        // color: rgba(0, 0, 255, 0.7);
        // font-size: 1.2rem;

        // position: absolute;
        // bottom: 1.5rem;
        // left: 1.5rem;
    }

    
    #consent-popup #yesButton {
        background: hsl(206, 100%, 50%);
        
        border: 0px solid black;
    }

    #consent-popup #noButton {
        // background-color: #eeeeee;
        // color: black;
        // border: 2px solid black;
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

    const saved = checkForSavedConsentSetting();
    if (saved.saved) {
        if (saved.consents) {
            console.log("detected previous consent to tracking")
            onConsent();
            return
        }
        else {
            console.log("detected previous rejection of tracking")
            return;
        }
    }

    const bannerDiv = document.createElement('div');
    bannerDiv.innerHTML = htmlTemplate;
    
    const servicesSpan = /** @type {HTMLElement} */ (bannerDiv.querySelector('#servicesSpan'));
    servicesSpan.appendChild(getServicesText(servicesConfiguration));

    const yesButton = /** @type {HTMLElement} */ (bannerDiv.querySelector('#yesButton'));
    const noButton = /** @type {HTMLElement} */ (bannerDiv.querySelector('#noButton'));

    yesButton.addEventListener('click', () => {
        saveConsentSetting(true);
        document.body.removeChild(bannerDiv);
        onConsent();
    })
    noButton.addEventListener('click', () => {
        saveConsentSetting(false);
        document.body.removeChild(bannerDiv);
    })

    document.body.appendChild(bannerDiv);
})

/**
 * Injects a script tag into the document from a string.
 * @param {string} scriptText - The text of the script tag, including the opening and closing tags You are allowed to put in multiple script tags as well.
 * @param {string} scriptName - The name of the script tag, only used for debugging
 */
function injectScriptFromText(scriptText, scriptName = 'script') {
    // get attributes
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = scriptText;

    const originalScripts = tempDiv.querySelectorAll('script'); // can't use directly for whatever reason

    if (originalScripts.length == 0) {
        console.error('No <script> tag found in the provided string', scriptName, scriptText);
    }

    originalScripts.forEach(originalScript => {
        const scriptToAppend = document.createElement('script');

        for (const attr of originalScript.attributes) {
            originalScript.setAttribute(attr.name, attr.value);
        }

        
        scriptToAppend.innerHTML = originalScript.innerHTML;
        // scriptToAppend.textContent = originalScript.textContent;

        document.head.appendChild(scriptToAppend);
    })
}

function onConsent(){
    console.log("attempting to load scripts")


    servicesConfiguration.forEach(service => {
        injectScriptFromText(service.scriptTag, service.name);
    });



}

function checkForSavedConsentSetting() {
    const choice = localStorage.getItem('ttoolsTrackingConsent');
    
    if (choice == null) {
        console.log("no consent setting found")
        return {
            saved: false
        }
    }

    console.log(choice)

    if (choice == 'true') {
        return {
            saved: true,
            consents: true
        }
    }

    return {
        saved: true,
        consents: false
    }
}
/**
 * @param {boolean} consents
 */
function saveConsentSetting(consents) {
    localStorage.setItem('ttoolsTrackingConsent', JSON.stringify(consents));
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