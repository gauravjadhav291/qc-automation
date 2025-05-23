import { test, Page } from '@playwright/test';
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

test('@Crew_BasicSmoke_Office Office_J3_Portage_Bill_Basic_Smoke', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.j3_portage_bill, xpath.OfficeNVessel_PortageBill);
    await Navigation_Page.validateRecords("Office_J3_Portage_Bill Page");
});

test('@Crew_BasicSmoke_Office Office_j3_crew_account_tasks Basic Smoke', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.j3_crew_account_tasks, "SOFF - ");
    await Navigation_Page.validateRecords("Office_j3_crew_account_tasks Page");
});

test('@Crew_BasicSmoke_Office Office_j3_main_allotement Basic Smoke', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.j3_main_allotement, Locators.loc_j3_main_allotement);
    await Navigation_Page.validateRecords("Office_j3_main_allotement Page");
});

test('@Crew_BasicSmoke_Office Office_j3_onboard_accounts_admin Basic Smoke', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.j3_onboard_accounts_admin, "SOFF - ");
    await Navigation_Page.validateRecords("Office_j3_onboard_accounts_admin Page");
});

test('@Crew_BasicSmoke_Office Office_j3_Wage_Scale_Library Basic Smoke', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.j3_Wage_Scale_Library, "SOFF - ");
    await Navigation_Page.validateRecords("Office_j3_Wage_Scale_Library Page");
});

test('@Crew_BasicSmoke_Office Office_j3_Salary_Structure Basic Smoke', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.j3_Salary_Structure, "SOFF - ");
    await Navigation_Page.validateRecords("Office_j3_Salary_Structure Page");
});

test('@Crew_BasicSmoke_Office Office_J3_Onboard_Account Basic Smoke', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.j3_onboard_accounts, "SOFF - ");
    await Navigation_Page.validateRecords("Office_J3_Onboard_Account Page");
}); 