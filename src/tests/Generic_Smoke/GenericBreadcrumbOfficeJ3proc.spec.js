import { test, expect } from '@playwright/test';
import { error } from 'console';
const { loginpage } = require('../../pages/Basic_Smoke/LOGIN')
const { Basic_Smoke } = require('../../pages/Basic_Smoke/BasicSmoke')
// const{Locators} = require('../utils/BasicSmoke_locators.json')
const { Office_Endpoints } = require("../../utils/EndPoints.json")
const { Locators, xpath } = require('../../utils/BasicSmoke_locators.json')
const {validateBreadcrum} = require('../../pages/Generic_Smoke/ValidateBreadcrumb')
const {Office_breadcrum} = require('../../utils/Breadcrumb.json')
const {getBreadcrumbText} = require('../../utils/Breadcrumb.json')

// Item Main Page
test('Item Page', async ({ page }) => {
    const office_log = new loginpage(page);
    await office_log.login(process.env.userid, process.env.password);
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.Item_List, xpath.xpath_items)
    await BS.validateRecords("Items Present ")

    const expectedBreadcrumb = Office_breadcrum.Item_list_page;
    await validateBreadcrum(expectedBreadcrumb,page,getBreadcrumbText);


})

//Catalogue Main Page
test('Catalogue Page', async ({ page }) => {
    const office_log = new loginpage(page);
    await office_log.login(process.env.userid, process.env.password);
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.Catlalog_List, xpath.xpath_catalog)
    await BS.validateRecords("Catalogue Present ")

    const expectedBreadcrumb = Office_breadcrum.Catalogue_List_Page;
    await validateBreadcrum(expectedBreadcrumb,page,getBreadcrumbText);

})

// Procurement Main Page
test('Procurement Page', async ({ page }) => {
    const office_log = new loginpage(page);
    await office_log.login(process.env.userid, process.env.password);
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.Procurement_Main, xpath.xpath_j3Procurement)
    await BS.validateRecords("Records Present")

    const expectedBreadcrumb = Office_breadcrum.Procurement_main_page;
    await validateBreadcrum(expectedBreadcrumb,page,getBreadcrumbText);

})

// List Main Page
test('List Page', async ({ page }) => {
    const office_log = new loginpage(page);
    await office_log.login(process.env.userid, process.env.password);
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.Onboard_List, xpath.xpath_listPage)
    await BS.validateRecords("Lists Present ")

    const expectedBreadcrumb = Office_breadcrum.List_Page;
    await validateBreadcrum(expectedBreadcrumb,page,getBreadcrumbText);

})

// Company Registry Main Page
test('Company Registry Page', async ({ page }) => {
    const office_log = new loginpage(page);
    await office_log.login(process.env.userid, process.env.password);
    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url + Office_Endpoints.company_registry)
    await BS.validateRecords("Suppliers Present ")

    const expectedBreadcrumb = Office_breadcrum.Company_Registry;
    await validateBreadcrum(expectedBreadcrumb,page,getBreadcrumbText);


})
 
test('Supplier_invoice', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.Supplier_Invoice , Locators.Supplier_invoice_main)
    await BS.validateRecords('Supplier_invoice_main')

    const expectedBreadcrumb = Office_breadcrum.Supplier_Invoice;
    await validateBreadcrum(expectedBreadcrumb,page,getBreadcrumbText);


});
test('managment_contract', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.management_contract,xpath.loc_management_contract )
    await BS.validateRecords('Mnagmeant_contract')

    const expectedBreadcrumb = Office_breadcrum.Management_Contracts;
    await validateBreadcrum(expectedBreadcrumb,page,getBreadcrumbText);
})
test('Gl_Account', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    console.log(process.env.j3url+Office_Endpoints.GLAccount)
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.GLAccount,xpath.Loc_Gl_Account)
    await BS.validateRecords('GL_Account')

    const expectedBreadcrumb = Office_breadcrum.GL_Account;
    await validateBreadcrum(expectedBreadcrumb,page,getBreadcrumbText);
})
test('Reporting_Structure', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.Reporting_Structure,xpath.Loc_Reporting_Strucuture)
    await BS.validateRecords('Reporting_Strucuture')

    const expectedBreadcrumb = Office_breadcrum.Reporting_Structure;
    await validateBreadcrum(expectedBreadcrumb,page,getBreadcrumbText);
})
test('J3_BUDGET', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.J3_BUDGET,xpath.loc_J3Budget)
    await BS.validateRecords('J3_Budget')

    const expectedBreadcrumb = Office_breadcrum.J3_Budget;
    await validateBreadcrum(expectedBreadcrumb,page,getBreadcrumbText);
})
test('journal_entry', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.journal_entry,xpath.loc_Journal)
    await BS.validateRecords('Journal entry')

    const expectedBreadcrumb = Office_breadcrum.Journal_Entry;
    await validateBreadcrum(expectedBreadcrumb,page,getBreadcrumbText);
})
test('Tax_code', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.Tax_code)
    await BS.validateRecords('Tax_code')

    const expectedBreadcrumb = Office_breadcrum.Tax_code_library;
    await validateBreadcrum(expectedBreadcrumb,page,getBreadcrumbText);
})
test('Project_libraray', async ({ page }) => {

    const BS = new Basic_Smoke(page);
    await BS.Navigate_click(process.env.j3url+Office_Endpoints.Project_Library)
    await BS.validateRecords('Project_libraray')

    const expectedBreadcrumb = Office_breadcrum.Project_Library;
    await validateBreadcrum(expectedBreadcrumb,page,getBreadcrumbText);
})