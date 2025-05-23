import { Page, Locator } from '@playwright/test';

export async function validateBreadcrum(ExpBreadcrum: string, page: Page, getBreadcrumbText: (page: Page) => Promise<string>): Promise<void> {
    const ActBreadcrum = await getBreadcrumbText(page); 

    if (ExpBreadcrum === ActBreadcrum) {
        console.log("Breadcrumb is as per our expectation"); 

        const breadcrumbLocator: Locator = page.locator('#ctl00_ucBreadCrumb_lblBreadcrumb');

        const isLink = await breadcrumbLocator.evaluate((el) => {
            return el.tagName === 'A' || el.querySelector('a') !== null;
        });

        if (isLink) {
            console.error("Breadcrumb is a link");
        } else {
            console.log("Breadcrumb is not a link");
        }
    } else {
        console.error("Breadcrumb is not as per our expectations");
    }
}

export async function validateBreadcrum_Vessel(ExpBreadcrum: string, page: Page, getBreadcrumbText_Vessel: (page: Page) => Promise<string>): Promise<void> {
    const ActBreadcrum = await getBreadcrumbText_Vessel(page); 

    if (ExpBreadcrum === ActBreadcrum) {
        console.log("Breadcrumb is as per our expectation"); 

        const breadcrumbLocator: Locator = page.locator("//div[@class='ui-breadcrumb ui-widget ui-widget-header ui-helper-clearfix ui-corner-all']");

        const isLink = await breadcrumbLocator.evaluate((el) => {
            return el.tagName === 'A' || el.querySelector('a') !== null;
        });

        if (isLink) {
            console.error("Breadcrumb is a link");
        } else {
            console.log("Breadcrumb is not a link");
        }
    } else {
        console.error("Breadcrumb is not as per our expectations");
    }
} 