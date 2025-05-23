import { Page, Locator, FrameLocator, expect } from '@playwright/test';

export class Generic_Smoke {
    private page: Page;
    private IAMainPageText: Locator;
    private first_record_locator: FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.IAMainPageText = this.page.locator('#ctl00_ucBreadCrumb_lblBreadcrumb');
        this.first_record_locator = this.page.locator('#ctl00_MainContent_mainFrame').contentFrame();
    }

    async Navigate_click(Page_url: string, selector: string): Promise<void> {
        console.log(Page_url);
        await this.page.waitForTimeout(35000);
        await this.page.goto(Page_url, { timeout: 90_000 });
    }

    async performCommonActions(frame: FrameLocator): Promise<void> {
        await frame.locator('jb-search i').nth(1).click();
        await frame.locator('#advanced-settings');
        await this.page.waitForTimeout(1000);
    }

    async SearchValidation(): Promise<void> {
        await this.page.waitForTimeout(2000);
        const CodeId: Locator = this.first_record_locator.locator("(//td[@class='undefined ng-star-inserted'])[1]");
        const code_value: string = await CodeId.textContent() || '';
        const uppercaseText: string = code_value.toUpperCase();
        const lowercaseText: string = code_value.toLowerCase();
        const LeadingSpace: string = " " + code_value;
        const Trailing: string = code_value + " ";
        console.log("CodeId", code_value);

        const misspelled: string = code_value.split('').map((char: string) => {
            const randomCharCode: number = Math.floor(Math.random() * 26) + 97; // Random lowercase letter
            return String.fromCharCode(randomCharCode);
        }).join('');

        const SearchVal: string[] = [uppercaseText, lowercaseText, LeadingSpace, Trailing, misspelled];
        console.log("Array", SearchVal, SearchVal.length);
        await this.page.pause();

        for (let i = 0; i < SearchVal.length; i++) {
            try {
                const frame: FrameLocator = this.first_record_locator;
                await this.first_record_locator.getByPlaceholder('Search').click();
                await this.first_record_locator.locator('#input').fill(SearchVal[i]);
                await this.first_record_locator.locator('#input').press('Enter');
                await this.page.waitForTimeout(15000);
                console.log(i, SearchVal[i]);

                if (i === 4) {
                    const noRecordsFound: Locator = this.first_record_locator.getByText('No Records Found');
                    await expect.soft(noRecordsFound).toBeVisible();
                    if (await noRecordsFound.isVisible()) {
                        console.log("No records found for", SearchVal[i]);
                    } else {
                        await this.performCommonActions(frame);
                        throw new Error(`Expected 'No Records Found' message, but records were displayed for ${SearchVal[i]}`);
                    }
                } else {
                    await expect.soft(CodeId).toBeVisible();
                    if (await CodeId.isVisible()) {
                        console.log("Valid results found for", SearchVal[i]);
                    } else {
                        await this.performCommonActions(frame);
                        throw new Error("Invalid result found !!!!");
                    }
                }
                await this.performCommonActions(frame);
            } catch (error) {
                console.error(`Error processing item ${i} (${SearchVal[i]}):`, error);
            }
        }
    }

    async ThreeDotValidation(): Promise<void> {
        await this.page.waitForTimeout(2000);
        await this.page.pause();
        await expect(this.first_record_locator.locator('#advanced-settings')).toBeVisible();
        await this.first_record_locator.locator('#advanced-settings').click();
        await this.page.waitForTimeout(2000);
        await expect(this.first_record_locator.getByText('Clear Filters')).toBeVisible();
        await expect(this.first_record_locator.getByText('Export')).toBeVisible();
        await expect(this.first_record_locator.getByText('Adjust Columns')).toBeVisible();
    }

    async JobCodeValidation(): Promise<void> {
        await this.page.waitForTimeout(2000);
        await this.page.pause();
    }

    async Vessel_SearchValidation(): Promise<void> {
        await this.page.waitForTimeout(2000);
        const CodeId: Locator = this.page.locator("(//td[@class='undefined ng-star-inserted'])[1]");
        const code_value: string = await CodeId.textContent() || '';
        const uppercaseText: string = code_value.toUpperCase();
        const lowercaseText: string = code_value.toLowerCase();
        const LeadingSpace: string = " " + code_value;
        const Trailing: string = code_value + " ";
        console.log("Vessel CodeId", code_value);

        const misspelled: string = code_value.split('').map((char: string) => {
            const randomCharCode: number = Math.floor(Math.random() * 26) + 97; // Random lowercase letter
            return String.fromCharCode(randomCharCode);
        }).join('');

        const SearchVal: string[] = [uppercaseText, lowercaseText, LeadingSpace, Trailing, misspelled];
        console.log("Array", SearchVal, SearchVal.length);
        await this.page.pause();

        for (let i = 0; i < SearchVal.length; i++) {
            try {
                const frame: Page = this.page;
                await this.page.getByPlaceholder('Search').click();
                await this.page.locator('#input').fill(SearchVal[i]);
                await this.page.locator('#input').press('Enter');
                await this.page.waitForTimeout(15000);
                console.log(i, SearchVal[i]);

                if (i === 4) {
                    const noRecordsFound: Locator = this.page.getByText('No Records Found');
                    await expect.soft(noRecordsFound).toBeVisible();
                    if (await noRecordsFound.isVisible()) {
                        console.log("No records found for", SearchVal[i]);
                    } else {
                        await this.performCommonActions(this.first_record_locator);
                        throw new Error(`Expected 'No Records Found' message, but records were displayed for ${SearchVal[i]}`);
                    }
                } else {
                    await expect.soft(CodeId).toBeVisible();
                    if (await CodeId.isVisible()) {
                        console.log("Valid results found for", SearchVal[i]);
                    } else {
                        await this.performCommonActions(this.first_record_locator);
                        throw new Error("Invalid result found !!!!");
                    }
                }
                await this.performCommonActions(this.first_record_locator);
            } catch (error) {
                console.error(`Error processing item ${i} (${SearchVal[i]}):`, error);
            }
        }
    }

    async Navigate_click_vessel(Page_url: string, shortcode: string): Promise<void> {
        await this.page.waitForTimeout(35000);
        await this.page.goto(Page_url, { timeout: 30_000 });
        await this.page.pause();
    }

    async Vessel_ThreeDotValidation(): Promise<void> {
        await this.page.waitForTimeout(2000);
        await this.page.pause();
        await expect(this.page.locator('#advanced-settings')).toBeVisible();
        await this.page.locator('#advanced-settings').click();
        await this.page.waitForTimeout(2000);
        await expect(this.page.getByText('Clear Filters')).toBeVisible();
        await expect(this.page.getByText('Export')).toBeVisible();
        await expect(this.page.getByText('Adjust Columns')).toBeVisible();
    }
} 