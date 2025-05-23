import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../pages/Basic_Smoke/Login';
import { FeedAndDiscussion } from '../../pages/Generic_Smoke/F&D';
import { GlobalSetup } from '../../pages/Generic_Smoke/GlobalSetup';
import { Locators, xpath } from '../../utils/BasicSmoke_locators.json';
import { Office_Endpoints } from '../../utils/EndPoints.json';
/*
test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const office_log = new LoginPage(page);
    await office_log.login(process.env.userid as string, process.env.password as string);
    await page.waitForTimeout(10000);
});
*/

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const Vessel_log = new LoginPage(page);
    await Vessel_log.Vessel_login();
})

test.afterEach('After Each', async ({ page }: { page: Page }) => {
    await page.close();
});

test('Dry Dock Basic Smoke', async ({ page }: { page: Page }) => {
    const BS = new FeedAndDiscussion(page);
    await BS.EnvironmentSettingUp("vessel");
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.Findings);
    await BS.DetailPageNavigation(Locators.Findings_Main,"clickingOnFirstRecord","vessel",1);
    await BS.Navigate_to_FeedAndDiscussion("vessel");
}); 