import { test, expect } from '@playwright/test';
const { loginpage } = require('../../pages/Basic_Smoke/LOGIN')
const{ Basic_Smoke} = require('../../pages/Basic_Smoke/BasicSmoke')
const{AdjustColumnValidation}=require('../../pages/Generic_Smoke/AdjustColumn')
// const {AdvanceFilterValidation}=require('../../../pages/AdvanceFilter')
const{Office_Endpoints} = require("../../utils/EndPoints.json")
import {Tag,MachineryType,Function,InternalAudit_Main,J3_Inspection,officetask}  from '../../utils/DefaultColumn';

test.beforeEach('Before Each', async ({ page }) => {
    const office_log = new loginpage(page);
    await office_log.login(process.env.userid, process.env.password);
})

test.afterEach('After Each', async ({ page }) => {
    await page.close();
})

const url = [Office_Endpoints.Function,Office_Endpoints.Tag,Office_Endpoints.J3_Inspection]
const locators = ["","",""]
const module_name = ["Function", "Tag", "J3_Inspection"]
const arrval = [Function, Tag, J3_Inspection]
let i=0;
module_name.forEach((x, i) => {
test(`Adjust Column Validation ${x} (${i}),${locators[i]}, ${url[i]}`, async ({ page }) => {
  // try {
    const AdjustColumn = new AdjustColumnValidation(page);
    console.log(i)
    console.log(url[i])
    await page.waitForTimeout(7000);
    await AdjustColumn.Navigate_click(process.env.j3url+ url[i] , locators[i])
    await AdjustColumn.adjustColumnValidation(arrval[i]); 
  // }
//   catch (error) {
//     console.error(`Test failed for module:(${i})`);
//     throw new Error('Error:', error.message);
// }
})
});
 