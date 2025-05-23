import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../../pages/Basic_Smoke/Login';
import { Basic_Smoke } from '../../../pages/Basic_Smoke/BasicSmoke';
import { Locators, xpath } from '../../../utils/BasicSmoke_locators.json';
import { Vessel_EndPoints, Office_Endpoints } from '../../../utils/EndPoints.json';

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const vessel_log = new LoginPage(page);
    await vessel_log.Vessel_login();});

test.afterEach('After Each', async ({ page }: { page: Page }) => {
    await page.close();
});

// Onboard prc
test('@Vessel_BasicSmoke_Office Procurement main page', async ({ page }) => {
    await page.waitForTimeout(3500)    
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_J3url+Office_Endpoints.onboard_Procurement_Main, "(//a[contains(@href, 'procurement/requisition-single-page')])[1]")
    await Navigation_Page.validatePagnination_vessel("Procurement onborad page ")
    
});
 
// Item page
test('@Vessel_BasicSmoke_Office Item main page', async ({ page }) => {
    await page.waitForTimeout(3500)    
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_J3url+Office_Endpoints.onboard_Item, "(//a[contains(@href, 'prc-catalog/item-single-page')])[1]")
    await Navigation_Page.validatePagnination_vessel("Procurement onborad page ")
});
 
// Catlogue
test('@Vessel_BasicSmoke_Office Catalogue main page', async ({ page }) => {
    await page.waitForTimeout(3500)   
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_J3url+Office_Endpoints.onboard_Catlalog_List,"(//span[@class='name-wrapper'])[1]")
    await Navigation_Page.validatePagnination_vessel("Procurement onborad page ")
 
});
 
// Onboard List
test('@Vessel_BasicSmoke_Office List main page', async ({ page }) => {
    await page.waitForTimeout(3500)  
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_J3url+Office_Endpoints.Onboard_List, "(//a[contains(@href, 'procurement/item-list-single-page')])[1]")
    await Navigation_Page.validatePagnination_vessel("Procurement onborad page ")
 });