import { test, expect } from '@playwright/test';
const { loginpage } = require('../../pages/Basic_Smoke/LOGIN')
const{Locators, xpath, ModuleClick} = require('../../utils/BasicSmoke_locators.json')
const{Office_Endpoints, Vessel_EndPoints} = require("../../utils/EndPoints.json")
import { Attachment } from '../../pages/Generic_Smoke/Attachment/Attachment';

test.beforeEach('Before Each', async ({ page }) => {
    const Vessel_log = new loginpage(page);
    await Vessel_log.Vessel_login(process.env.Vessel_user_id, process.env.Vessel_password);
})

test.afterEach('After Each', async ({ page }) => {
    await page.close();
})

test('@AttachmentVessel Validation 01', async ({ page }) =>{

    const BS = new Attachment(page);
    let page1 = await BS.Navigate_to_SinglePage_Vessel (process.env.Vessel_J3url+Vessel_EndPoints.Vmoc, Locators.moc)
    await BS.Attachment01 (page1, false)
    await BS.deleteRecord (page1, false)
})

test.skip('@AttachmentVessel Validation 02', async ({ page }) =>{

    const BS = new Attachment(page);
    let page1 = await BS.Navigate_to_SinglePage_Vessel (process.env.Vessel_J3url+Vessel_EndPoints.drug_alchol, Locators.drug_alchol)
    await BS.Attachment02 (page1, false)
    await BS.deleteRecord (page1, false)
})

test.skip('@AttachmentVessel Validation 03', async ({ page }) =>{

    const BS = new Attachment(page);
    let page1 = await BS.Navigate_to_SinglePage_Vessel (process.env.Vessel_J3url+Vessel_EndPoints.Supplier_Invoice, Locators.Supplier_invoice_main)
    await BS.Attachment03 (page1, false)
    await BS.deleteRecord (page1, false)
})
test.skip('@AttachmentVessel Validation 04', async ({ page }) =>{

    const BS = new Attachment(page);
    let page1 = await BS.Navigate_to_SinglePage_Vessel (process.env.Vessel_J3url+Vessel_EndPoints.List, xpath.xpath_listPage)
    await BS.Attachment04 (page1, false)
    await BS.deleteRecord (page1, false)
})
test.skip('@AttachmentVessel Validation 05', async ({ page }) =>{

    const BS = new Attachment(page);
    await BS.Navigate_to_SinglePage_Vessel (process.env.Vessel_J3url + Vessel_EndPoints.J3_Inspection)
    let page1 = await BS.Attachment05 (ModuleClick.ExternalInspections, Locators.External_Inspection, false)
    await BS.deleteRecord (page1, false)
})