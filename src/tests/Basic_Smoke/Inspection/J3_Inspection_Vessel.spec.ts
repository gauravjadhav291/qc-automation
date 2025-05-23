import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../../pages/Basic_Smoke/Login';
import { Basic_Smoke } from '../../../pages/Basic_Smoke/BasicSmoke';
import { Locators, xpath, ModuleClick } from '../../../utils/BasicSmoke_locators.json';
import { Vessel_EndPoints } from '../../../utils/EndPoints.json';

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const vessel_log = new LoginPage(page);
    await vessel_log.Vessel_login();});

test.afterEach('After Each', async ({ page }: { page: Page }) => {
    await page.close();
});

// Onboard Inspection
test.only('@Vessel_BasicSmoke_Office J3_Inspection', async ({ page }) => {
    await page.waitForTimeout(3500)
    const BS = new Basic_Smoke(page);
    await page.waitForTimeout(3500)
    await BS.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.Vj3inspection,"-")
    await BS.Vessel_Navigation(ModuleClick.InternalInspection, Locators.MainFirstClick, 1)
    await page.waitForTimeout(2000)
    await BS.validatePagnination_vessel("Internal Inspection Main Page")

    //Vessel Self Assessments
    await page.waitForTimeout(2000)
    await BS.Vessel_Navigation(ModuleClick.VesselSelfAssessments, Locators.MainFirstClick, 1)
    await page.waitForTimeout(2000)
    await BS.validatePagnination_vessel("Vessel Self Assessments Main Page")

    //Internal Audits
    await page.waitForTimeout(2000)
    await BS.Vessel_Navigation(ModuleClick.InternalAudits, Locators.MainFirstClick2, 1)
    await page.waitForTimeout(2000)
    await BS.validatePagnination_vessel("InternalAudits Main Page")

    //External Inspections
    await page.waitForTimeout(2000)
    await BS.Vessel_Navigation(ModuleClick.ExternalInspections, Locators.MainFirstClick, 1)
    await page.waitForTimeout(2000)
    await BS.validatePagnination_vessel("External Inspections Main Page")

    //Vetting Inspection
    await page.waitForTimeout(2000)
    await BS.Vessel_Navigation(ModuleClick.VettingInspections, Locators.MainFirstClick, 2)
    await page.waitForTimeout(2000)
    await BS.validatePagnination_vessel("Vetting Inspections Main Page")
});
test('@Vessel_BasicSmoke_Office Certificates Main Page', async ({ page }) => {
    await page.waitForTimeout(3500)
    const BS = new Basic_Smoke(page);
    await page.waitForTimeout(3500)
    await BS.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.Vcertificate, Locators.MainFirstClick2);
    await page.waitForTimeout(3000)
    await BS.validatePagnination_vessel('Certificates Main Page')
});
test('@Vessel_BasicSmoke_Office PSC & Deficiency Main Page', async ({ page }) => {
    await page.waitForTimeout(3500)
    const BS = new Basic_Smoke(page);
    await page.waitForTimeout(3500)
    await BS.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.Vpsc, Locators.MainFirstClick2);
    await page.waitForTimeout(3000)
    await BS.validatePagnination_vessel('PSC Main Page')
    //------------------------------------------Deficiency-----------------
    await page.waitForTimeout(3500)
    await BS.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.Vdeficiency, Locators.MainFirstClick2);
    await page.waitForTimeout(3000)
    await BS.validatePagnination_vessel('Deficiency Main Page')
});
test('@Vessel_BasicSmoke_Office Internal Audit Main Page', async ({ page }) => {
    await page.waitForTimeout(3500)
    const BS = new Basic_Smoke(page);
    await page.waitForTimeout(3500)
    await BS.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.VinternalAudit, Locators.MainFirstClick2);
    await page.waitForTimeout(2000)
    await BS.validatePagnination_vessel('Internal Audit Main Page')
});
test('@Vessel_BasicSmoke_Office Findings & Differed Findings Main Page', async ({ page }) => {
    // await page.waitForTimeout(3500)
    const BS = new Basic_Smoke(page);
    await page.waitForTimeout(3500)
    await BS.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.Vfindings, Locators.MainFirstClick2);
    await page.waitForTimeout(2000)
    await BS.validatePagnination_vessel('Findings Main Page')
    //--------------------Differed Findings------------------------
    await page.waitForTimeout(3500)
    await BS.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.Vdefferedfinding, Locators.MainFirstClick2);
    await page.waitForTimeout(2000)
    await BS.validatePagnination_vessel('Differed Findings Main Page')
});