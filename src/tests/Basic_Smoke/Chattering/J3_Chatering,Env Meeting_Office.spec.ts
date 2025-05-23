import { test, Page } from '@playwright/test';
import { LoginPage } from '../../../pages/Basic_Smoke/Login';
import { Basic_Smoke } from '../../../pages/Basic_Smoke/BasicSmoke';
import { Locators } from '../../../utils/BasicSmoke_locators.json';
import { Office_Endpoints } from '../../../utils/EndPoints.json';

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const office_log = new LoginPage(page);
    await office_log.login(process.env.userid!, process.env.password!);
});

test.afterEach('After Each', async ({ page }: { page: Page }) => {
    await page.close();
});

test('@Accounting&Chatarering&Drydock_BasicSmoke_OfficeChartering Party Main Page Basic Smoke', async ({ page }: { page: Page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.chartering_Party_Main_EP, Locators.chartering_Party_Main_Page);
    await BS.validateRecords('chartering_Party_Main_Page');
});

test('@Accounting&Chatarering&Drydock_BasicSmoke_OfficeChartering Invoice Main Page Basic Smoke', async ({ page }: { page: Page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.chartering_Invoice_main, Locators.chartering_Invoice_main);
    await BS.validateRecords('chartering_Invoice_main');
});

test('@Accounting&Chatarering&Drydock_BasicSmoke_OfficeEnvironment Meeting Page Basic Smoke', async ({ page }: { page: Page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.env_meeting, Locators.env_meeting);
    await BS.validateRecords('env meeting');
}); 