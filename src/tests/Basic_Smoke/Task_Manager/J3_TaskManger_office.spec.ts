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

test('@TaskManager&Operation_BasicSmoke_Office Incident Nearmiss Page Basic Smoke', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.IncidentNearmiss , Locators.IncidentNearmiss)
    await BS.validateRecords('IncidentNearmiss')
})
test('@TaskManager&Operation_BasicSmoke_Office Besafe Basic Smoke', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.besafe, Locators.besafe)
    await BS.validateRecords('Besafe')
})
//certificate
test('@TaskManager&Operation_BasicSmoke_Office Certificate Basic Smoke', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.certificate , Locators.certificate)
    await BS.validateRecords('certificate')
})

test('@TaskManager&Operation_BasicSmoke_Office Office Task Basic Smoke', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.officetask , Locators.officetask)
    await BS.validateRecords('officetask')
})

test('@TaskManager&Operation_BasicSmoke_Office Vessel Task Basic Smoke', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.vesseltask , Locators.vesseltask)
    await BS.validateRecords('vesseltask')
})

test('@TaskManager&Operation_BasicSmoke_Office SCM Basic Smoke', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.scm , Locators.scm)
    await BS.validateRecords('scm')
})

test('@TaskManager&Operation_BasicSmoke_Office MOC Basic Smoke', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.moc , Locators.moc)
    await BS.validateRecords('moc')
})

test('@TaskManager&Operation_BasicSmoke_Office deck Basic Smoke', async ({ page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.deck , Locators.deck)
    await page.waitForTimeout(10_0000)
    await BS.validateRecords('deck')
})