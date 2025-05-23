import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../../pages/Basic_Smoke/Login';
import { Basic_Smoke } from '../../../pages/Basic_Smoke/BasicSmoke';
import { Locators, xpath } from '../../../utils/BasicSmoke_locators.json';
import { Office_Endpoints } from '../../../utils/EndPoints.json';

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const vessel_log = new LoginPage(page);
    await vessel_log.Vessel_login();
});

test.afterEach('After Each', async ({ page }: { page: Page }) => {
    await page.close();
});

test('@Vessel_BasicSmoke_Office Vessel_Drills_and_Trainings_main Basic Smoke', async ({ page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_j3url + Office_Endpoints.Drills_and_Trainings_main, "VDT-")
    await Navigation_Page.validatePagnination_vessel("Vessel_Drills_and_Trainings_main Page")


});

test('@Vessel_BasicSmoke_Office Vessel J3 Portage Bill Basic Smoke', async ({ page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_j3url + Office_Endpoints.j3_portage_bill, xpath.OfficeNVessel_PortageBill);//, Xpath.Office_PortageBill)
    await Navigation_Page.validatePagnination_vessel("J3_Portage_Bill page")

});

test('@Vessel_BasicSmoke_Office Vessel_j3_crew_account_tasks Basic Smoke', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_j3url + Office_Endpoints.j3_crew_account_tasks, "SOFF - ")
    await Navigation_Page.validatePagnination_vessel("j3_crew_account_tasks Page")

});

test('@Vessel_BasicSmoke_Office Vessel_J3_Onboard_Account Basic Smoke', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_j3url + Office_Endpoints.j3_onboard_accounts,"-")
    await Navigation_Page.validatePagnination_vessel("J3_Onboard_Account Page");

});