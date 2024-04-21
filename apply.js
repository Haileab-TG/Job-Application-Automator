import {personalInfo, additionalInfo} from './information.js';
import puppeteer from "puppeteer";

const nextButton = 'button[data-automation-id="bottom-navigation-next-button"]';

apply();

async function apply() {
    var page = await getPage();
    await page.goto(
         "https://lowes.wd5.myworkdayjobs.com/LWS_External_CS/login?redirect=%2FLWS_External_CS%2Fjob%2FLowes-Charlotte-Technology-Hub-3505%2FSr-Software-Engineer--Pyspark--Springboot_JR-01703017%2Fapply%3Fsource%3D617LinkedInPaidSlots"
    );

    await createAccount(page);

    if (await selectorExists(page, 'div[data-automation-id="errorMessage"]')) {
        await signIn(page);
    }

    await page.locator('a[data-automation-id="applyManually"]').click();

    await fillBasicInfo(page);

    await page.waitForSelector('div[data-automation-id="myExperiencePage"]', { timeout: 0 });

    await fillExperience(page);

    await page.waitForSelector('div[data-automation-id="voluntaryDisclosuresPage"]', { timeout: 0 });

    await fillVoluntaryDisclosures(page);

    await page.waitForSelector('div[data-automation-id="selfIdentificationPage"]', { timeout: 0 });

    await fillSelfIdentify(page);
}

async function getPage() {
    console.log("Getting page");

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false,
    });
    const page = await browser.newPage();
    return page;
}

async function createAccount(page) {
    console.log("Creating account");
    const {email, password} = personalInfo;
    // await page.locator('a[data-automation-id="adventureButton"]').click();

    // await page.locator('a[data-automation-id="applyManually"]').click();

    await page.locator('button[data-automation-id="createAccountLink"]').click();


    await page.locator('input[data-automation-id="email"]').fill(email);

    await page.locator('input[data-automation-id="password"]').fill(password);
    await page.locator('input[data-automation-id="verifyPassword"]').fill(password);

    const createAccountCheckbox = 'input[data-automation-id="createAccountCheckbox"]';
    if (await selectorExists(page, createAccountCheckbox)) {
        await page.click(createAccountCheckbox);
    }

    await page.locator('button[data-automation-id="createAccountSubmitButton"]').click();
}

async function selectorExists(page, selector) {
    try {
        await page.waitForSelector(selector, { timeout: 1000 });
    } catch (error) {
        return false;
    }
    return true;
}

async function signIn(page) {
    console.log("Account already exists. Signing in");
    const {email, password} = personalInfo;
    await page.locator('button[data-automation-id="signInLink"]').click();

    await page.locator('input[data-automation-id="email"]').fill(email);

    await page.locator('input[data-automation-id="password"]').fill(password);

    await page.locator('button[data-automation-id="signInSubmitButton"]').click({ delay: 400 });
}

async function fillBasicInfo(page) {
    const {firstName, lastName} = personalInfo;
    const {street, city, state, postalCode} = personalInfo.address;
    const {phoneType, phoneNumber} = personalInfo.phone;
    console.log("Filling basic info");

    await page.locator('div[data-automation-id="previousWorker"] input[id="2"]').click();

    /* Name */
    await page.locator('input[data-automation-id="legalNameSection_firstName"]').fill(firstName);
    await page.locator('input[data-automation-id="legalNameSection_lastName"]').fill(lastName);
    const suffixDropdown = 'button[data-automation-id="legalNameSection_social"]';
    if (await selectorExists(page, suffixDropdown)) {
        await page.click(suffixDropdown);
        await page.keyboard.type(suffix);
        await page.keyboard.press('Enter');
    }

    /* Address */
    await page.locator('input[data-automation-id="addressSection_addressLine1"]').fill(street);
    await page.locator('input[data-automation-id="addressSection_city"]').fill(city);
    await page.locator('button[data-automation-id="addressSection_countryRegion"]').click();
    await page.keyboard.type(state, { delay: 100 });
    await page.keyboard.press('Enter');
    await page.locator('input[data-automation-id="addressSection_postalCode"]').fill(postalCode);

    /* Phone */
    await page.locator('button[data-automation-id="phone-device-type"]').click();
    await page.keyboard.type(phoneType, { delay: 100 });
    await page.keyboard.press('Enter');
    await page.locator('input[data-automation-id="phone-number"]').fill(phoneNumber);

    await page.locator(nextButton).click();
}


async function fillExperience(page) {
    console.log("Filling Work Sections");
    await handleWorkSec(page);

    console.log("Filling Education sections");
    await handleEducationSec(page);

    console.log("Filling Language if applicaple");
    await handleLanguageSec(page);

    console.log("Filling Skills if applicaple");
    await handleSkills(page);
 
    // work
    // await page.locator('input[data-automation-id="jobTitle"]').fill(currentJobTitle);
    // await page.locator('input[data-automation-id="company"]').fill(currentCompany);
    // await page.locator('input[data-automation-id="currentlyWorkHere"]').click();

    /* Education */

   
//    educations.forEach(async (edu, index) => {
//         if (index == 0) await addFirstEduSec(page);
//         else await addAnotherEduSec(page);
//         await fillEducation(index + 1, edu);

//     });

    // await page.locator('input[data-automation-id="school"]').fill(school);

    // await page.locator('button[data-automation-id="degree"]').click();
    // await page.keyboard.type(degree, { delay: 100 });
    // await page.keyboard.press('Enter');

    // await page.locator('div[data-automation-id="formField-field-of-study"] input').fill(fieldOfStudy);
    // await page.keyboard.press('Enter');
    // await page.keyboard.press('Enter', { delay: 1000 });
    
    // await page.locator('input[data-automation-id="gpa"]').fill(gpa);


    // const startDateInput = 'div[data-automation-id="formField-startDate"] input';
    // if (await selectorExists(page, startDateInput)) {
    //     await page.locator(startDateInput).fill(startDate);
    //     await page.locator('div[data-automation-id="formField-endDate"] input').fill(endDate);
    // }

    /* Resume */
    const uploadElementHandle = await page.$('input[data-automation-id="file-upload-input-ref"]');
    await uploadElementHandle.uploadFile(resumeFilePath);

    /* Additional Websites - LinkedIn & GitHub */
    const linkedInInput = 'input[data-automation-id="linkedinQuestion"]';

    if (await selectorExists(page, linkedInInput)) {
        await page.locator(linkedInInput).fill(linkedInLink);
        await page.locator('div[data-automation-id="websiteSection"] button[data-automation-id="Add"]').click();
        await page.locator('div[data-automation-id="websitePanelSet-1"] input').fill(githubLink);
    } else {
        await page.locator('div[data-automation-id="websiteSection"] button[data-automation-id="Add"]').click();
        await page.locator('div[data-automation-id="websitePanelSet-1"] input').fill(linkedInLink);
        await page.locator('div[data-automation-id="websiteSection"] button[data-automation-id="Add Another"]').click()
        await page.locator('div[data-automation-id="websitePanelSet-2"] input').fill(githubLink);
    }


    await page.locator(nextButton).click();
}

async function fillVoluntaryDisclosures(page) {
    console.log("Filling voluntary disclosure info");

    /* Gender */
    await page.locator('button[data-automation-id="gender"]').click();
    await page.keyboard.type(gender, { delay: 100 });
    await page.keyboard.press('Enter');

    await new Promise(r => setTimeout(r, 200));

    /* Ethnicity */
    const hispanicLatinoDropdown = 'button[data-automation-id="hispanicOrLatino"]';
    if (await selectorExists(hispanicLatinoDropdown)) {
        await page.click(hispanicLatinoDropdown);
        await page.keyboard.type(hispanicOrLatino, { delay: 100 });
        await page.keyboard.type('Enter');
    }

    await page.locator('button[data-automation-id="ethnicityDropdown"]').click();
    await page.keyboard.type(ethnicity, { delay: 100 });
    await page.keyboard.press('Enter');

    await new Promise(r => setTimeout(r, 200));

    /* Veteran Status */
    await page.locator('button[data-automation-id="veteranStatus"]').click();
    await page.keyboard.type(veteranStatus, { delay: 100 });
    await page.keyboard.press('Enter');

    await page.locator('input[data-automation-id="agreementCheckbox"]').click();

    await page.locator(nextButton).click();
}

async function fillSelfIdentify(page) {
    console.log("Filling disability info");

    await page.locator('input[data-automation-id="name"]').fill(fullName);

    await page.locator('div[data-automation-id="dateIcon"]').click();
    await page.locator('button[data-automation-id="datePickerSelectedToday"]').click();

    await page.locator('input[id="64cbff5f364f10000ae7a421cf210000"]').click();

    await page.locator(nextButton).click();
}

async function fillStartEndDate(topSelector, startMonth, startYear, endMonth, endYear, page){
    const start = 'div[data-automation-id="formField-startDate"]';
    const end = 'div[data-automation-id="formField-endDate"]';
    const startYearInput = `${topSelector} ${start} input[data-automation-id="dateSectionYear-input"]`;
    const startMonthInput = `${topSelector} ${start} input[data-automation-id="dateSectionMonth-input"]`;
    const endYearInput = `${topSelector} ${end} input[data-automation-id="dateSectionYear-input"]`;
    const endMonthInput = `${topSelector} ${end} input[data-automation-id="dateSectionMonth-input"]`;
    if (await selectorExists(page, startYearInput)) {
        await page.locator(startYearInput).fill(startYear);
        await page.locator(startMonthInput).fill(startMonth);
        if(endYear){
            await page.locator(endYearInput).fill(endYear);
            await page.locator(endMonthInput).fill(endMonth);
        }
    }
}

async function handleSkills(page){
    const skills = personalInfo.skills;
    
    for(const [skill] of skills.entries()){
        await page.locator(`div[data-automation-id="formField-skillsPrompt"] input`).fill(skill);
        await page.keyboard.press('Enter');
    }
}

async function handleLanguageSec(page){
    const languages = personalInfo.languages;
    const languageSec = 'div[data-automation-id="languageSection"]';
    if(await selectorExists(page, languageSec)){
        for (const [index, lang] of languages.entries()) {
            if (index === 0) {
                await addFirstSection('languageSection', page);
            } else {
                await addAnotherSection('languageSection', page);
            }
            await fillLanguage(index + 1, lang, page);
        }
    }
}

async function handleWorkSec(page){
    const works = personalInfo.work;
    for (const [index, edu] of works.entries()) {
        if (index === 0) {
            await addFirstSection('workExperienceSection', page);
        } else {
            await addAnotherSection('workExperienceSection', page);
        }
        await fillWork(index + 1, edu, page);
    }
}

async function handleEducationSec(page){
    const educations = personalInfo.education;
    for (const [index, edu] of educations.entries()) {
        if (index === 0) {
            await addFirstSection('educationSection', page);
        } else {
            await addAnotherSection('educationSection', page);
            
        }
        await fillEducation(index + 1, edu, page);
    }
    
}

async function fillEducation(eduNum, edu, page ){
    const {school, degree, fieldOfStudy, gpa, startMonth, startYear, endMonth, endYear} = edu;
    const eduSelector = `div[data-automation-id="education-${eduNum}"]`;

    await page.locator(`${eduSelector} input[data-automation-id="school"]`).fill(school);

    await page.locator(`${eduSelector} button[data-automation-id="degree"]`).click();
    await page.keyboard.type(degree, { delay: 100 });
    await page.keyboard.press('Enter');

    await page.locator(`${eduSelector} div[data-automation-id="formField-field-of-study"] input`).fill(fieldOfStudy);
    await page.keyboard.press('Enter');
    // await page.keyboard.press('Enter', { delay: 1000 });
    
    await page.locator(`${eduSelector} input[data-automation-id="gpa"]`).fill(gpa);
    await fillStartEndDate(eduSelector, startMonth, startYear, endMonth, endYear, page);
}

async function fillLanguage(langNum, lang, page){
    const {name, fluent, proficiencies} = lang;
    const langSelector = `div[data-automation-id="language-${langNum}"]`;

    await page.locator(`${langSelector} button[data-automation-id="language"]`).click();
    await page.keyboard.type(name, { delay: 100 });
    await page.keyboard.press('Enter');

    if(fluent){
        await page.locator(`${langSelector} input[data-automation-id="nativeLanguage"]`).click();
    }

    proficiencyIndex = 0;
    for(const proficiency in proficiencies){
        await fillProficiencyLevel(proficiencies[proficiency], proficiencyIndex, page);
        proficiencyIndex++;
    }
    
}

async function fillWork(workNum, work, page){
    const {jobTitle, company, location, currentJob, startMonth, startYear, endMonth, endYear} = work;
    const workSelector = `div[data-automation-id="workExperience-${workNum}"]`;

    await page.locator(`${workSelector} input[data-automation-id="jobTitle"]`).fill(jobTitle);
    await page.locator(`${workSelector} input[data-automation-id="company"]`).fill(company);
    await page.locator(`${workSelector} input[data-automation-id="location"]`).fill(location);
    if(currentJob){
        await page.locator(`${workSelector} input[data-automation-id="currentlyWorkHere"]`).click;
    }
    await fillStartEndDate(workSelector, startMonth, startYear, endMonth, endYear, page);
    await page.locator(`${workSelector} textarea[data-automation-id="description"]`).fill(roleDesc);
    
}

async function fillProficiencyLevel(proficiencyLevel, proficiencyNum, page){
    for(const level in proficiencyLevel){
        if(proficiencyLevel[level]){
            await page.locator(`${langSelector} button[data-automation-id="languageProficiency-${proficiencyNum}"]`).click();
            await page.keyboard.type(level, { delay: 100 });
            await page.keyboard.press('Enter');
        }
    }
}

async function addFirstSection(sectionId, page){
    const addFirstSection = `div[data-automation-id="${sectionId}"] button[data-automation-id="Add"]`;
    if (await selectorExists(page, addFirstSection)) {
        await page.click(addFirstSection);
    }
}

async function addAnotherSection(sectionId, page){
    const addAnotherSection = `div[data-automation-id="${sectionId}"] button[data-automation-id="Add Another"]`;
    await page.click(addAnotherSection);
}
