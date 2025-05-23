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

//Vessel 

test.beforeEach('Before Each', async ({ page }) => {
    const Vessel_log = new loginpage(page);
    await Vessel_log.Vessel_login(process.env.Vessel_user_id, process.env.Vessel_password);
})

test('Vessel J3 Portage Bill Basic Smoke', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    const page1Promise = page.waitForEvent('popup');
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_j3url + Office_Endpoints.j3_portage_bill, xpath.OfficeNVessel_PortageBill);//, Xpath.Office_PortageBill)
    await generateDate(0); //called date generate function
    await vessel_datepicker_J3calendar(generic_Com.portagebill, generatedDate);
    await validatePagnination_vessel("J3_Portage_Bill page")
});
 
 

 