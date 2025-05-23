import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../pages/Basic_Smoke/Login';
import { Attachment } from '../../pages/Generic_Smoke/Attachment/Attachment';
import { Locators, xpath, ModuleClick } from '../../utils/BasicSmoke_locators.json';
import { Office_Endpoints, Vessel_EndPoints } from '../../utils/EndPoints.json';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            Vessel_user_id: string;
            Vessel_password: string;
            Vessel_J3url: string;
        }
    }
}

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const Vessel_log = new LoginPage(page);
    await Vessel_log.Vessel_login();
});

test.afterEach('After Each', async ({ page }: { page: Page }) => {
    await page.close();
});

test('@AttachmentVessel Validation 01', async ({ page }: { page: Page }) => {
    const BS = new Attachment(page);
    let page1 = (await BS.Navigate_to_SinglePage_Vessel(process.env.Vessel_J3url + Vessel_EndPoints.Vmoc, Locators.moc) as unknown) as Page;
    await BS.Attachment01(page1, false);
    await BS.deleteRecord(page1, false);
});

test.skip('@AttachmentVessel Validation 02', async ({ page }: { page: Page }) => {
    const BS = new Attachment(page);
    let page1 = (await BS.Navigate_to_SinglePage_Vessel(process.env.Vessel_J3url + Vessel_EndPoints.drug_alchol, Locators.drug_alchol) as unknown) as Page;
    await BS.Attachment02(page1, false);
    await BS.deleteRecord(page1, false);
});

test.skip('@AttachmentVessel Validation 03', async ({ page }: { page: Page }) => {
    const BS = new Attachment(page);
    let page1 = (await BS.Navigate_to_SinglePage_Vessel(process.env.Vessel_J3url + Vessel_EndPoints.Supplier_Invoice, Locators.Supplier_invoice_main) as unknown) as Page;
    await BS.Attachment03(page1, false);
    await BS.deleteRecord(page1, false);
});

test.skip('@AttachmentVessel Validation 04', async ({ page }: { page: Page }) => {
    const BS = new Attachment(page);
    let page1 = (await BS.Navigate_to_SinglePage_Vessel(process.env.Vessel_J3url + Vessel_EndPoints.List, xpath.xpath_listPage) as unknown) as Page;
    await BS.Attachment04(page1, false);
    await BS.deleteRecord(page1, false);
});

test.skip('@AttachmentVessel Validation 05', async ({ page }: { page: Page }) => {
    const BS = new Attachment(page);
    await BS.Navigate_to_SinglePage_Vessel(process.env.Vessel_J3url + Vessel_EndPoints.J3_Inspection, Locators.External_Inspection);
    let page1 = await BS.Attachment05(ModuleClick.ExternalInspections, Locators.External_Inspection, false);
    await BS.deleteRecord(page1, false);
}); 