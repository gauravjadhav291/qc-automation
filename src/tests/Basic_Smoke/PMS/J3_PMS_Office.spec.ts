import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../../pages/Basic_Smoke/Login';
import { Basic_Smoke } from '../../../pages/Basic_Smoke/BasicSmoke';
import { Locators, xpath } from '../../../utils/BasicSmoke_locators.json';
import { Office_Endpoints } from '../../../utils/EndPoints.json';

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const office_log = new LoginPage(page);
    await office_log.login(process.env.userid!, process.env.password!);
});

test.afterEach('After Each', async ({ page }: { page: Page }) => {
    await page.close();
});

// Tags
test('@PMS_BasicSmoke_Office Tags Page', async ({ page }) => {
     
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.Tag, "-")
    await BS.validateRecords("PMS Library Page : Tags ")
})
// Function
test('@PMS_BasicSmoke_Office Function Page', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.Function, "-")
    await BS.validateRecords("PMS Library Page :Function")
})
// Machinery type
test('@PMS_BasicSmoke_Office Machinery type Page', async ({ page }) => {  
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.MachineryType, "-")
    await BS.validateRecords("PMS Library Page : Machinery Type")
})
// Model
test('@PMS_BasicSmoke_Office Model Page', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.Model, "-")
    await BS.validateRecords("PMS Library Page : Model")
})
// E-Forms
test('@PMS_BasicSmoke_Office E- forms', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.Eform, "-")
    await BS.validateRecords("PMS Library Page E-Forms")
})
// Safetyinstruction
test('@PMS_BasicSmoke_Office  Safetyinstruction', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.Safetyinstruction, "-")
    await BS.validateRecords("PMS Library Page : Safety Instructions")
})
// Jobmain
test('@PMS_BasicSmoke_Office  Jobmain', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.Jobmain, "-")
    await BS.validateRecords("PMS Library Page : Job List")
})
// Sparemain
test('@PMS_BasicSmoke_Office  Sparemain', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.Sparemain, "-")
    await BS.validateRecords("PMS Library Page :Sparemain")
})
// Job Status
test('@PMS_BasicSmoke_Office  Jobstatus', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.Jobstatus, "-")
    await BS.validateRecords("PMS Library Page :Jobstatus")
})
// Machinery Index
test('@PMS_BasicSmoke_Office  Machinery', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.Machinery, "-")
    await BS.validateRecords("PMS Library Page :Machinery Index ")
})

// SMP
test('@PMS_BasicSmoke_Office  System Management Page', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.SMP, "-")
    await BS.validateRecordsmp("PMS Library Page : System Management Page")
   
})
 
// RunningHours
test('@PMS_BasicSmoke_Office  RunningHours', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.RunningHours, "-")
    await BS.validateRecords("PMS Library Page :RunningHours ")
})