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

test('@QHSE_BasicSmoke_Office Office_Drills_and_Trainings_main Basic Smoke', async ({ page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.Drills_and_Trainings_main, "VDT-")
    await Navigation_Page.validateRecords("Office_Drills_and_Trainings_main")
})
 
test('@QHSE_BasicSmoke_Office Drills_and_Trainings_Calendar_View Basic Smoke', async ({ page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.Drills_and_Trainings_Calendar_View,"-");
})
 
test('@QHSE_BasicSmoke_Office Offfice_Training_Program Basic Smoke', async ({ page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j2url + Office_Endpoints.Training_Program,"-")
})
 
test('@QHSE_BasicSmoke_Office Office_Drill_Questionnaire Basic Smoke', async ({ page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j2url + Office_Endpoints.Drill_Questionnaire,"-")
})
 
test('@QHSE_BasicSmoke_Office @QHSE_BasicSmoke_Office Office_Item_List Basic Smoke', async ({ page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j2url + Office_Endpoints.Item_List_lib,"-")
});