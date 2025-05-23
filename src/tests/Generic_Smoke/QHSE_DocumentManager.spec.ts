import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../pages/Basic_Smoke/Login';
import { GlobalSetup } from '../../pages/Generic_Smoke/GlobalSetup';
import { Locators } from '../../utils/BasicSmoke_locators.json';
import { Office_Endpoints } from '../../utils/EndPoints.json';

// Define menu arrays
const documentManagerMenus = [
    'Document Manager',
    'QMS Main',
    'QMS File Approval',
    'QMS Sync Approval',
    'EPS Manuals',
    'MHT Converter'
];

const formManagerMenus = [
    'Form Manager',
    'FMS Main'
];

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const Vessel_log = new LoginPage(page);
    await Vessel_log.Vessel_login();
});

test.afterEach('After Each', async ({ page }: { page: Page }) => {
    await page.close();
});

test('QHSE Document Manager UI Validation', async ({ page }: { page: Page }) => {
    const setup = new GlobalSetup(page);
    await setup.EnvironmentSettingUp("vessel");
    await setup.Navigate_click(process.env.j3url + Office_Endpoints.DocumentManager);

    // Verify all menu items
    for (const menu of documentManagerMenus) {
        const isVisible = await page.locator(`text=${menu}`).isVisible();
        if (!isVisible) {
            console.log(`Warning: Menu item "${menu}" is not visible`);
        }
        await expect(page.locator(`text=${menu}`)).toBeVisible();
    }
});

test('Form Manager UI Validation', async ({ page }: { page: Page }) => {
    const setup = new GlobalSetup(page);
    await setup.EnvironmentSettingUp("vessel");
    await setup.Navigate_click(process.env.j3url + Office_Endpoints.FormManager);

    // Verify all menu items
    for (const menu of formManagerMenus) {
        const isVisible = await page.locator(`text=${menu}`).isVisible();
        if (!isVisible) {
            console.log(`Warning: Menu item "${menu}" is not visible`);
        }
        await expect(page.locator(`text=${menu}`)).toBeVisible();
    }
}); 