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

test('@Accounting&Chatarering&Drydock_BasicSmoke_OfficeSupplier_invoice', async ({ page }: { page: Page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.Supplier_Invoice, Locators.Supplier_invoice_main);
    await BS.validateRecords('Supplier_invoice_main');
});

test('@Accounting&Chatarering&Drydock_BasicSmoke_Officemanagement_contract', async ({ page }: { page: Page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.management_contract, xpath.loc_management_contract);
    await BS.validateRecords('Management_contract');
});

test('@Accounting&Chatarering&Drydock_BasicSmoke_OfficeGl_Account', async ({ page }: { page: Page }) => {
    const BS = new Basic_Smoke(page);
    console.log(process.env.j3url + Office_Endpoints.GLAccount);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.GLAccount, xpath.Loc_Gl_Account);
    await BS.validateRecords('GL_Account');
});

test('@Accounting&Chatarering&Drydock_BasicSmoke_OfficeReporting_Structure', async ({ page }: { page: Page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.Reporting_Structure, xpath.Loc_Reporting_Strucuture);
    await BS.validateRecords('Reporting_Strucuture');
});

test('@Accounting&Chatarering&Drydock_BasicSmoke_OfficeJ3_BUDGET', async ({ page }: { page: Page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.J3_BUDGET, xpath.loc_J3Budget);
    await BS.validateRecords('J3_Budget');
});

test('@Accounting&Chatarering&Drydock_BasicSmoke_Officejournal_entry', async ({ page }: { page: Page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.journal_entry, xpath.loc_Journal);
    await BS.validateRecords('Journal entry');
});

test('@Accounting&Chatarering&Drydock_BasicSmoke_OfficeTax_code', async ({ page }: { page: Page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.Tax_code, xpath.xpath_Project_main_page);
    await page.waitForTimeout(100000);
    await BS.validateRecords('Tax_code');
});

test('@Accounting&Chatarering&Drydock_BasicSmoke_OfficeProject_libraray', async ({ page }: { page: Page }) => {
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.Project_Library, xpath.xpath_Project_main_page);
    await page.waitForTimeout(100000);
    await BS.validateRecords('Project_libraray');
}); 