import { test, Page } from '@playwright/test';
import { LoginPage } from '../../../pages/Basic_Smoke/Login';
import { Basic_Smoke } from '../../../pages/Basic_Smoke/BasicSmoke';
import { Locators,xpath } from '../../../utils/BasicSmoke_locators.json';
import { Office_Endpoints } from '../../../utils/EndPoints.json';

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const office_log = new LoginPage(page);
    await office_log.login(process.env.userid!, process.env.password!);
});

test.afterEach('After Each', async ({ page }: { page: Page }) => {
    await page.close();
});
 
test('@Crew_BasicSmoke_Office Crew Main Basic smoke', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j2url + Office_Endpoints.crew_main, Locators.MainFirstClick);
    await Navigation_Page.J2validateRecords("Crew Main Page");
});
 
test('@Crew_BasicSmoke_Office FBM Basic Smoke', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j2url +Office_Endpoints.fbm, Locators.MainFirstClick)
    await Navigation_Page.J2validateRecords("FBM Page")
});
 
test('@Crew_BasicSmoke_Office Training list Basic Smoke', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url +Office_Endpoints.training_list, Locators.MainFirstClick)
    await Navigation_Page.validateRecords("Training list Page")
});
 
test('@Crew_BasicSmoke_Office Yellow and Red Cards Basic Smoke', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j2url +Office_Endpoints.cards, Locators.MainFirstClick)
    await Navigation_Page.J2validateRecords("Yellow and Red Cards Page")
});
 
test('@Crew_BasicSmoke_Office List history Basic Smoke', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j2url +Office_Endpoints.list_history, Locators.MainFirstClick)
});