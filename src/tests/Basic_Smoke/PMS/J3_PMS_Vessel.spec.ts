import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../../pages/Basic_Smoke/Login';
import { Basic_Smoke } from '../../../pages/Basic_Smoke/BasicSmoke';
import { Locators, xpath } from '../../../utils/BasicSmoke_locators.json';
import { Vessel_EndPoints } from '../../../utils/EndPoints.json';

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const vessel_log = new LoginPage(page);
    await vessel_log.Vessel_login();});

test.afterEach('After Each', async ({ page }: { page: Page }) => {
    await page.close();
});

// Onboard Machinery
test('@Vessel_BasicSmoke_Office Machinery', async ({ page }) => {
    await page.waitForTimeout(3500)  
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_J3url+Vessel_EndPoints.Machinery_page_onboard,"-")
    await page.waitForTimeout(40000)
    await Navigation_Page.validatePagnination_vessel("PMS Library Page :Machinery onborad page ")
});
 
// Onboard job list  
test('@Vessel_BasicSmoke_Office Job List page', async ({ page }) => {
    await page.waitForTimeout(3500)
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_J3url+Vessel_EndPoints.Job_onboard,"-")
    await page.waitForTimeout(40000)
    await Navigation_Page.validatePagnination_vessel("PMS Library Page :job list  onborad page ")
});
 
// Onboard Spare  
test('@Vessel_BasicSmoke_Office Spare page', async ({ page }) => {
    await page.waitForTimeout(3500)  
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_J3url+Vessel_EndPoints.Spare_onboard,"-")
    await page.waitForTimeout(40000)
    await Navigation_Page.validatePagnination_vessel("PMS Library Page :Sapre onborad page ")
});
// Onboard Job Status
test('@Vessel_BasicSmoke_Office jobStatusOnboard page', async ({ page }) => {
    await page.waitForTimeout(3500)  
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_J3url+Vessel_EndPoints.JobStatus_Onborad ,"-")
    await page.waitForTimeout(40000)
    await Navigation_Page.validatePagnination_vessel("PMS Library Page :jobStatusOnboard page ")
});
// Onboard RunningHour_Onborad
test.only('@Vessel_BasicSmoke_Office RunningHour_Onborad page', async ({ page }) => {
    await page.waitForTimeout(3500)   
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_J3url+Vessel_EndPoints.RunningHour_Onborad ,"-")
    await page.waitForTimeout(40000)
    await Navigation_Page.validatePagnination_vessel("PMS Library Page :RunningHour_Onborad page ")
});
// Onboard RunningHour_Onborad
test('@Vessel_BasicSmoke_Office PMSNew_Onboard page', async ({ page }) => {
    await page.waitForTimeout(3500)  
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_J3url+Vessel_EndPoints.PMSNew_Onborad ,"-")
    await page.waitForTimeout(40000)
    await Navigation_Page.validatePagnination_vessel("PMS Library Page :SMP_Onborad page ")
});
//  SMP Page
test('@Vessel_BasicSmoke_Office SMP Page', async ({ page }) => {
    await page.waitForTimeout(1500)
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_J3url+Vessel_EndPoints.SMP_Onborad,"-")
    await page.waitForTimeout(40000);
    await Navigation_Page.validateRecords_onboard_smp("PMS Library Page :PMSNew_Onborad page ")
});