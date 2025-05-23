import { test, expect } from '@playwright/test';
const { loginpage } = require('../../pages/Basic_Smoke/LOGIN')
const { FeedAndDiscussion } = require('../../pages/Generic_Smoke/F&D')
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
/*
const url = [Office_Endpoints.Projects_main_page]//, Office_Endpoints.officetask, Office_Endpoints.vesseltask, Office_Endpoints.moc]
const locators = [xpath.xpath_Project_main_page]//, Locators.officetask, Locators.vesseltask, Locators.moc]
const module_name = ['Incident and Near Misses']//, 'Office Task','Vessel Task','MOC']

let i=0;
module_name.forEach((x, i) => {
test(`Office_Feed_and_Discussion ${x} (${i}),${locators[i]}, ${url[i]}`, async ({ page }) => {
 try { 
    const BS = new FeedAndDiscussion(page);
    console.log(i)
    console.log(url[i])
    await page.waitForTimeout(7000);
    await BS.Navigate_to_FeedAndDiscussion(process.env.j3url+ url[i] , locators[i])
 }
  catch (error) {
    console.error(`Test failed for module:(${i})`);
    throw new Error('Error:', error.message);
}
}
)
});
test("Office_Feed_and_Discussion" async ({ page }) => {

    const BS = new FeedAndDiscussion(page);
    console.log(i)
    console.log(url[i])
    await page.waitForTimeout(7000);
    await BS.Navigate_to_FeedAndDiscussion(process.env.j3url + url[i], locators[i])

});*/
test('Dry Dock Basic Smoke', async ({ page }) => {

    const BS = new FeedAndDiscussion(page);
    // await page.waitForTimeout(7000);
    const CurrentDate = generateDate(0)
    //    const expectedFields = [ process.env.Office_User,"Re-synced the record from office",CurrentDate];
    const expectedFields = [process.env.Office_User, "Marked as Closed", "fy", CurrentDate];
    await BS.Navigate_to_FeedAndDiscussion(process.env.j3url + Office_Endpoints.Master_Review_EP, Locators.master_review, "office", expectedFields)

    // await BS.Navigate_to_FeedAndDiscussion(process.env.Vessel_j3url + Office_Endpoints.j3_portage_bill, xpath.OfficeNVessel_PortageBill,"vessel")

}); 