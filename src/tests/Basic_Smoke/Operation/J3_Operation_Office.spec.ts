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

test('@TaskManager&Operation_BasicSmoke_Office Drug Alchol Page Basic Smoke', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.drug_alchol, Locators.drug_alchol)
    await BS.validateRecords('drug alchol');
    })
test('@TaskManager&Operation_BasicSmoke_Office Voyage Manager Page Basic Smoke', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.VoyageManager, Locators.VoyageManager)
    await page.waitForTimeout(10_0000)
    await BS.validateRecords('Voyage Manager')
    })
test('@TaskManager&Operation_BasicSmoke_Office Vessel Schedule Page Basic Smoke', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.Vesselschedule, Locators.Vesselschedule)
    await page.waitForTimeout(10_0000)
    await BS.validateRecords('Vessel schedule')
}) 