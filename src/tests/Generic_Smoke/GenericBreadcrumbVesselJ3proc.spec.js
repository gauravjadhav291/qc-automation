import { test, expect } from '@playwright/test';
const { loginpage } = require('../../pages/Basic_Smoke/LOGIN')
const { Basic_Smoke } = require('../../pages/Basic_Smoke/BasicSmoke')
const { Office_Endpoints } = require("../../utils/EndPoints.json")
const { Locators, xpath } = require('../../utils/BasicSmoke_locators.json')
const {validateBreadcrum_Vessel} = require('../../pages/Generic_Smoke/ValidateBreadcrumb')
const {Vessel_breadcrum} = require('../../utils/Breadcrumb.json')
const {getBreadcrumbText_Vessel} = require('../../utils/Breadcrumb.json')

test.beforeEach('Before Each', async ({ page }) => {
    const Vessel_log = new loginpage(page);
    await Vessel_log.Vessel_login(process.env.Vessel_user_id, process.env.Vessel_password);
})

test.afterEach('After Each', async ({ page }) => {
    await page.close();
})

// Onboard prc
test('Procurement main page', async ({ page }) => {
    await page.waitForTimeout(3500)    
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click_vessel(process.env.Vessel_J3url+Office_Endpoints.onboard_Procurement_Main, "(//a[contains(@href, 'procurement/requisition-single-page')])[1]")
    await BS.validatePagnination_vessel("Procurement onborad page ")

    const expectedBreadcrumb = Vessel_breadcrum.Procurement_main_page;
    await validateBreadcrum_Vessel(expectedBreadcrumb,page,getBreadcrumbText_Vessel);

});

// Item page
test('Item main page', async ({ page }) => {
    await page.waitForTimeout(3500)    
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click_vessel(process.env.Vessel_J3url+Office_Endpoints.onboard_Item, "(//a[contains(@href, 'prc-catalog/item-single-page')])[1]")
    await BS.validatePagnination_vessel("Procurement onborad page ")

    const expectedBreadcrumb = Vessel_breadcrum.Item_list_page;
    await validateBreadcrum_Vessel(expectedBreadcrumb,page,getBreadcrumbText_Vessel);
});

// Catlogue
test('Catalogue main page', async ({ page }) => {
    await page.waitForTimeout(3500)   
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click_vessel(process.env.Vessel_J3url+Office_Endpoints.onboard_Catlalog_List,"(//span[@class='name-wrapper'])[1]")
    await BS.validatePagnination_vessel("Procurement onborad page ")

    const expectedBreadcrumb = Vessel_breadcrum.Catalogue_List_Page;
    await validateBreadcrum_Vessel(expectedBreadcrumb,page,getBreadcrumbText_Vessel);

});

// Onboard List
test('List main page', async ({ page }) => {
    await page.waitForTimeout(3500)  
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click_vessel(process.env.Vessel_J3url+Office_Endpoints.Onboard_List, "(//a[contains(@href, 'procurement/item-list-single-page')])[1]")
    await BS.validatePagnination_vessel("Procurement onborad page ")

    const expectedBreadcrumb = Vessel_breadcrum.List_Page;
    await validateBreadcrum_Vessel(expectedBreadcrumb,page,getBreadcrumbText_Vessel);

});