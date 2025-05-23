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

test('@Operation_BasicSmoke_OfficeVoyage_Manager_Index_Grid Basic Smoke', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.Voyage_Manager_Index_Grid, Locators.loc_Voyage_Manager_Index_Grid);
    await Navigation_Page.validateRecords("Voyage_Manager_Index_Grid");
});

test('@Operation_BasicSmoke_OfficeVessel_Schedule_Index Basic Smoke', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.Vessel_Schedule_Index, Locators.loc_Vessel_Schedule_Index);
    await Navigation_Page.validateRecords("Vessel_Schedule_Index");
}); 