import { test, expect } from '@playwright/test';
const { loginpage } = require('../../pages/Basic_Smoke/LOGIN')
const { FeedAndDiscussion } = require('../../pages/Generic_Smoke/F&D')
const { GlobalSetup, MainPageMainFrame, DetailPageMainFrame } = require('../../pages/Generic_Smoke/GlobalSetup')
const { Locators, xpath, Feed_Discussion } = require('../../utils/BasicSmoke_locators.json')
const { Office_Endpoints } = require("../../utils/EndPoints.json")
const { generateRandomString, generateDate } = require('../../pages/Generic_Smoke/GenerateRandomValue')

test.beforeEach('Before Each', async ({ page }) => {
    const office_log = new loginpage(page);
    await office_log.login(process.env.userid, process.env.password);
    await page.waitForTimeout(10000);
})
/*
test.beforeEach('Before Each', async ({ page }) => {
    const Vessel_log = new loginpage(page);
    await Vessel_log.Vessel_login(process.env.Vessel_user_id, process.env.Vessel_password);
})
*/
test.afterEach('After Each', async ({ page }) => {
    await page.close();
})

test('Dry Dock Basic Smoke', async ({ page }) => {

    const BS = new FeedAndDiscussion(page);
    await BS.EnvironmentSettingUp("office");
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.Findings)
    const { page1, detailPageMainFrame } = await BS.DetailPageNavigation(Locators.Findings_Main, "clickingOnFirstRecord", "office",1)
    await BS.Navigate_to_FeedAndDiscussion(page1, detailPageMainFrame, "office")

}); 