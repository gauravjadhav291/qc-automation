import { Page } from '@playwright/test';
import { GlobalSetup, MainPageMainFrame } from './GlobalSetup';
import * as mainList from '../../utils/MainList.json';

export class Menu extends GlobalSetup {
    constructor(page: Page) {
        super(page);
    }

    async getMenuNames(): Promise<string[]> {
        const parentMenuItems = await this.page.$$eval('ul#nav.menu > li > a.parent > span', spans =>
            spans.map(span => span.textContent?.trim() || '')
          );
          console.log("Parent Menu Items:", parentMenuItems);
          return parentMenuItems;
    }

    async compareMenuNames(): Promise<{ matches: boolean, missingMenus: string[] }> {
        try {
            const parentMenuItems = await this.getMenuNames();
            const expectedMenuNames = mainList.Parent_Menu.Expected_menuNames;
            
            const missingMenus = expectedMenuNames.filter(menu => !parentMenuItems.includes(menu));
            const areEqual = missingMenus.length === 0;
            
            if (missingMenus.length > 0) {
                console.log('Missing menus:', missingMenus);
                throw new Error(`Missing menus found: ${missingMenus.join(', ')}`);
            }
            console.log('Menu names match:', areEqual);
            
            return {
                matches: areEqual,
                missingMenus: missingMenus
            };
        } catch (error) {
            console.error('Error in menu comparison:', error.message);
            return {
                matches: false,
                missingMenus: []
            };
        }
    }

    async getQHSESubMenuItems(modulename: string): Promise<string[]> {
        const qhseSubMenus = await this.page.$$eval(
            `xpath=//ul[@id='nav' and contains(@class, 'menu')]/li[a[@class='parent']/span[text()='${modulename}']]/ul/li/a`,
            as => as.map(a => a.textContent?.trim() || '')
        );
        console.log(`${modulename} Submenu Items [count:${qhseSubMenus.length}]:`, qhseSubMenus);
        return qhseSubMenus;
    }

    async getDocManagerSubMenus(subSubMenuName: string): Promise<string[]> {
        const docManagerSubMenus = await this.page.$$eval(
            `xpath=//span[text()='${subSubMenuName}']/ancestor::li[1]//ul/li/a`,
            as => as.map(a => a.textContent?.trim() || '')
        );
        console.log(`${subSubMenuName} Submenu Items [count:${docManagerSubMenus.length}]:`, docManagerSubMenus);
        return docManagerSubMenus;
    }
}
