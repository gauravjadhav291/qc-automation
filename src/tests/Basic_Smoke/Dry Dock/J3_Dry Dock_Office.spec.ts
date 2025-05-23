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

test('@Accounting&Chatarering&Drydock_BasicSmoke_OfficeStandard_jobs_main_Page basic smoke', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.Standard_jobs_main, Locators.loc_Standard_jobs_main);
    await Navigation_Page.validateRecords("Standard_jobs_main_Page");
});

test('@Accounting&Chatarering&Drydock_BasicSmoke_OfficeProject_Templates_main_page Basic Smoke', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.Project_Templates, Locators.loc_Project_Templates_main_page);
    await Navigation_Page.validateRecords("Project_Templates");
});

test('@Accounting&Chatarering&Drydock_BasicSmoke_OfficeProjects_Main_page Basic Smoke', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.Projects_main_page, xpath.xpath_Project_main_page);
    await Navigation_Page.validateRecords("Projects_main_page");
}); 