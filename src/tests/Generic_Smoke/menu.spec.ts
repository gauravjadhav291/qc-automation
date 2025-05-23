import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../pages/Basic_Smoke/Login';
import { FeedAndDiscussion } from '../../pages/Generic_Smoke/F&D';
import { GlobalSetup } from '../../pages/Generic_Smoke/GlobalSetup';
import { Locators, xpath } from '../../utils/BasicSmoke_locators.json';
import { Office_Endpoints } from '../../utils/EndPoints.json';
import { Menu } from '../../pages/Generic_Smoke/menu';

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const office_log = new LoginPage(page);
    await office_log.login(process.env.userid as string, process.env.password as string);
    await page.waitForTimeout(10000);
});
/*

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const Vessel_log = new LoginPage(page);
    await Vessel_log.Vessel_login();
})
*/

test.afterEach('After Each', async ({ page }: { page: Page }) => {
    await page.close();
});

test('Dry Dock Basic Smoke', async ({ page }: { page: Page }) => {
    
    const menu = new Menu(page);
    await menu.EnvironmentSettingUp("office");
    await menu.getMenuNames();
    await menu.compareMenuNames();
    await menu.getQHSESubMenuItems("QHSE");
    await menu.getDocManagerSubMenus("Document Manager");
    await menu.getDocManagerSubMenus("Form Manager");
    await menu.getDocManagerSubMenus("Risk Assessment");
    await menu.getDocManagerSubMenus("Safety Committee Meeting");
    await menu.getDocManagerSubMenus("Fleet Broadcast Message");
    await menu.getDocManagerSubMenus("Vessel Drills and Trainings");
    await menu.getDocManagerSubMenus("Work and Rest Hours");
    await menu.getDocManagerSubMenus("Drug and Alcohol Test");
    await menu.getDocManagerSubMenus("Environmental Meeting");
       
    
}); 
