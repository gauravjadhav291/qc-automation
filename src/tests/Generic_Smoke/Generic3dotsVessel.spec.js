import { test, expect } from '@playwright/test';
const { loginpage } = require('../../pages/Basic_Smoke/LOGIN')
const { Generic_Smoke } = require('../../pages/Generic_Smoke/Search&3dots')
const { ModuleClick, Locators } = require("../../utils/BasicSmoke_locators.json")
const { Office_Endpoints } = require("../../utils/EndPoints.json")
const { Vessel_EndPoints } = require("../../utils/EndPoints.json")

test.beforeEach('Before Each', async ({ page }) => {
    const Vessel_log = new loginpage(page);
    await Vessel_log.Vessel_login(process.env.Vessel_user_id, process.env.Vessel_password);
    await page.waitForTimeout(3000);
    await page.pause();
    if(page.getByRole('alert').isVisible)
    {
        await page.getByRole('alert').locator('a').click();
    }
    await page.waitForTimeout(2000);
    await page.pause();
})

test.afterEach('After Each', async ({ page }) => {
    await page.close();
})

const url = [Office_Endpoints.VinternalAudit, Office_Endpoints.Vj3inspection, Office_Endpoints.Vfindings, Office_Endpoints.Vcertificate, Office_Endpoints.Vpsc, Office_Endpoints.Vdeficiency, Office_Endpoints.Vdefferedfinding, Office_Endpoints.Vmoc]
const locators = ["", "", "", "", "","","",""]
const module_name = ["Internal Audit", "J3 Inspection", "Findings", "Certificates", "PSC", "Defeciency", "Deffered Findings", "MOC"]
let i = 0;
module_name.forEach((x, i) => {
test(`Vessel Search Validation Main Page ${x} (${i}), ${locators[i]}, ${url[i]}` , async ({ page }) => {
    try {
    const GS = new Generic_Smoke(page);
    await GS.Navigate_click_vessel(process.env.Vessel_J3url + url[i], locators[i])   
    await page.pause();
    await page.waitForTimeout(2000);
    await GS.Vessel_SearchValidation();
    }
    catch (error) {
        console.error(`Test failed for module:(${i})`);
        throw new Error('Error:', error.message);
    }
})
})