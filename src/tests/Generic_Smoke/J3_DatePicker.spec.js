import { test, expect } from '@playwright/test';
const { loginpage } = require('../../pages/Basic_Smoke/LOGIN')
const { Basic_Smoke } = require('../../pages/Basic_Smoke/BasicSmoke')
const { generic_Com, xpath } = require('../../utils/BasicSmoke_locators.json')
const { Office_Endpoints } = require("../../utils/EndPoints.json")
import { generatedDate,office_datepicker_J3calendar,vessel_datepicker_J3calendar } from '../../pages/Generic_Smoke/DatePicker';

test.beforeEach('Before Each', async ({ page }) => {
    const office_log = new loginpage(page);
    await office_log.login(process.env.userid, process.env.password);
})

test.afterEach('After Each', async ({ page }) => {
    await page.close();
})

test('Projects_Main_page Basic Smoke', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.Projects_main_page, xpath.xpath_Project_main_page);
    await generateDate(0); //date generate function
    await office_datepicker_J3calendar(generic_Com.Cal_dryDockGridFilter, generatedDate);

});
 

 