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

test.skip('@J3Procurement_BasicSmoke_Office Item Page', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.Item_List, xpath.xpath_items);
    await Navigation_Page.validateRecords("Items Present");
});

test('@J3Procurement_BasicSmoke_Office Catalogue Page', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.Catlalog_List, xpath.xpath_catalog);
    await Navigation_Page.validateRecords("Catalogue Present ");
});

test('@J3Procurement_BasicSmoke_Office Procurement Page', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.Procurement_Main, xpath.xpath_j3Procurement);
    await Navigation_Page.validateRecords("Records Present ");
});

test('@J3Procurement_BasicSmoke_Office List Page', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.Onboard_List, xpath.xpath_listPage);
    await Navigation_Page.validateRecords("Lists Present ");
}); 

test('@J3Procurement_BasicSmoke_Office Company Registry Page', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.company_registry,"-");
    await Navigation_Page.validateRecords("Suppliers Present ");
});