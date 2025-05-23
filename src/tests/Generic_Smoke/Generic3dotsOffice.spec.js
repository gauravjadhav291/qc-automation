import { test, expect } from '@playwright/test';
const { loginpage } = require('../../pages/Basic_Smoke/LOGIN')
const { Generic_Smoke } = require('../../pages/Generic_Smoke/Search&3dots')
const { ModuleClick, Locators } = require("../../utils/BasicSmoke_locators.json")
const { Office_Endpoints } = require("../../utils/EndPoints.json")

test.beforeEach('Before Each', async ({ page }) => {
    const office_log = new loginpage(page);
    await office_log.login(process.env.userid, process.env.password);
    await page.pause();
})

test.afterEach('After Each', async ({ page }) => {
    await page.close();
})

const url = [Office_Endpoints.InternalAudit_Main, Office_Endpoints.J3_Inspection, Office_Endpoints.course_Manager, Office_Endpoints.VoyageManager, Office_Endpoints.company_registry, Office_Endpoints.PSC ,Office_Endpoints.Deficiency, Office_Endpoints.Findings, Office_Endpoints.Certificates]
const locators = [Locators.Internal_Audit, "", "", Locators.VoyageManager, "", "", "", "", ""]
const module_name = ["Internal Audit", "J3 Inspection", "Course Manager", "Voyage Manager", "Company Registry", "PSC", "Deficiency", "Findings", "Certificates"]
let i = 0;
module_name.forEach((x, i) => {
    test(`Office Three Dot Validation Main Page ${x} (${i}), ${locators[i]}, ${url[i]}`, async({ page }) => {
    try {
        const GS = new Generic_Smoke(page);
        console.log(i)
        console.log(url[i])
        await page.waitForTimeout(7000);
        await GS.Navigate_click(process.env.j3url + url[i], locators[i])
        await page.waitForTimeout(2000);
        await GS.ThreeDotValidation();
    }
    catch (error) {
        console.error(`Test failed for module:(${i})`);
        throw new Error('Error:', error.message);
    }
})
})