import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../../pages/Basic_Smoke/Login';
import { Basic_Smoke } from '../../../pages/Basic_Smoke/BasicSmoke';
import { Locators, xpath, ModuleClick } from '../../../utils/BasicSmoke_locators.json';
import { Office_Endpoints } from '../../../utils/EndPoints.json';

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const office_log = new LoginPage(page);
    await office_log.login(process.env.userid!, process.env.password!);
});

test.afterEach('After Each', async ({ page }: { page: Page }) => {
    await page.close();
});

test('@TaskManager&Operation_BasicSmoke_Office Inspection Main Page', async ({ page }) => {

    //Inspection
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.J3_Inspection, "-")
    await BS.NavigateWithModule(ModuleClick.InternalInspection, Locators.Internal_Inspection, 1)
    // await page.pause();
    console.log("Internal Inspection Page Close")
    await page.waitForTimeout(3000);
    await BS.validateRecords('Internal Inspection_Main_Page')

    await BS.NavigateWithModule(ModuleClick.VesselSelfAssessments, Locators.Vessel_Self_Assessment, 1)
    console.log("Vessel_Self_Assessment Page Close")
    await page.waitForTimeout(3000)
    await BS.validateRecords('Vessel_Self_Assessment_Main_Page')

    await BS.NavigateWithModule(ModuleClick.InternalAudits, Locators.Internal_Audit, 1)
    console.log("Internal Audit Page Close")
    await page.waitForTimeout(3000)
    await BS.validateRecords('Internal Audit Main Page')

    await BS.NavigateWithModule(ModuleClick.ExternalInspections, Locators.External_Inspection, 1)
    console.log("External Inspections Page Close")
    await page.waitForTimeout(3000)
    await BS.validateRecords('External Inspections Main Page')

    await BS.NavigateWithModule(ModuleClick.PSC, Locators.PSC, 1)
    console.log("PSC Inspections Page Close")
    await page.waitForTimeout(3000)
    await BS.validateRecords('PSC Inspections Main Page')

    await BS.NavigateWithModule(ModuleClick.VettingInspections, Locators.Vetting_Inspection, 2)
    console.log("Vetting Inspections Page Close")
    await page.waitForTimeout(3000)
    await BS.validateRecords('Vetting Inspections Main Page')
})
test('@TaskManager&Operation_BasicSmoke_Office Internal Audit Main Page Basic Smoke', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.InternalAudit_Main, Locators.Internal_Audit);
    await page.waitForTimeout(3000)
    await BS.validateRecords('InternalAudit Main Page')
})
test('@TaskManager&Operation_BasicSmoke_Office Internal Audit Planner Main Page Basic Smoke', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await page.waitForTimeout(3000)
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.InternalAudit_Planner, "-");
    console.log("Internal Audit Planner")
    await BS.validateRecords('InternalAudit Planner Main Page')
})
test('@TaskManager&Operation_BasicSmoke_Office PSC & Deficiency Basic Smoke', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await page.waitForTimeout(3000)
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.PSC, Locators.PSC);
    console.log("PSC Inspections Child Page Close")
    await page.waitForTimeout(3000)
    await BS.validateRecords('PSC Inspections Main Page')

    await page.waitForTimeout(3000)
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.Deficiency, Locators.PSC_Deficiency);
    console.log("PSC Deficiency Child Page Close")
    await page.waitForTimeout(3000)
    await BS.validateRecords('PSC Deficiency Main Page')

})
test('@TaskManager&Operation_BasicSmoke_Office Findings Main Page Basic Smoke', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await page.waitForTimeout(3000)
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.Findings, Locators.Findings_Main);
    console.log("Findings Main Child Page Close")
    await page.waitForTimeout(3000)
    await BS.validateRecords('Findings Main Page')
})
test('@TaskManager&Operation_BasicSmoke_Office Differed Findings Main Page Basic Smoke', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await page.waitForTimeout(3000)
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.Deferred_Findings, '#grid-cell-value > span');
    console.log("Differed Findings Main Child Page Close")
    await page.waitForTimeout(3000)
    await BS.validateRecords('Differed Findings Main Page')

})
test('@TaskManager&Operation_BasicSmoke_Office J2 Main Page Basic Smoke', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await page.waitForTimeout(3000)
    await BS.Navigate_click(process.env.j2url + Office_Endpoints.Inspection_Main, "-");
    await BS.J2validateRecords('J2 Inspection Main Page')

    await page.waitForTimeout(3000)
    await BS.Navigate_click(process.env.j2url + Office_Endpoints.Vetting, "-");
    console.log("J2 Vetting Inspection Page")
    await BS.J2validateRecords('J2 Inspection Main Page')

})