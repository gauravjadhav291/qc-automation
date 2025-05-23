import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../pages/Basic_Smoke/Login';
import { Locators, xpath, ModuleClick } from '../../utils/BasicSmoke_locators.json';
import { Office_Endpoints } from '../../utils/EndPoints.json';
import { Attachment } from '../../pages/Generic_Smoke/Attachment/Attachment';

test.beforeEach('Before Each', async ({ page }) => {
    const office_log = new LoginPage(page);
    await office_log.login(process.env.userid!, process.env.password!);
    await page.waitForTimeout(10000);
})

test.afterEach('After Each', async ({ page }) => {
    await page.close();
})

test.skip('@Attachments Validation 01', async ({ page }) =>{

    const BS = new Attachment(page);
    let page1 = (await BS.Navigate_to_SinglePage(process.env.j3url+Office_Endpoints.officetask, Locators.officetask)) as Page;
    await BS.Attachment01(page1, true);
    await BS.deleteRecord(page1, true);
})

test.skip('@Attachments Validation 02', async ({ page }) =>{

    const BS = new Attachment(page);
    let page1 = (await BS.Navigate_to_SinglePage(process.env.j3url+Office_Endpoints.drug_alchol, Locators.drug_alchol)) as Page;
    await BS.Attachment02(page1, true);
    await BS.deleteRecord(page1, true);
})

test.skip('@Attachments Validation 03', async ({ page }) =>{

    const BS = new Attachment(page);
    let page1 = (await BS.Navigate_to_SinglePage(process.env.j3url+Office_Endpoints.Supplier_Invoice, Locators.Supplier_invoice_main)) as Page;
    await BS.Attachment03(page1, true);
    await BS.deleteRecord(page1, true);
})
test.skip('@Attachments Validation 04', async ({ page }) =>{

    const BS = new Attachment(page);
    let page1 = (await BS.Navigate_to_SinglePage(process.env.j3url+Office_Endpoints.List, xpath.xpath_listPage)) as Page;
    await BS.Attachment04(page1, true);
    await BS.deleteRecord(page1, true);
})
test('@Attachments Validation 05', async ({ page }) =>{

    const BS = new Attachment(page);
    await BS.Navigate_to_SinglePage(process.env.j3url + Office_Endpoints.J3_Inspection, Locators.External_Inspection);
    let page1 = await BS.Attachment05(ModuleClick.ExternalInspections, Locators.External_Inspection, true);
    await BS.deleteRecord(page1, true);
})