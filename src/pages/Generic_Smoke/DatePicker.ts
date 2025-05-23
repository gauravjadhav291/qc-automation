import { Page, expect, Locator, FrameLocator } from '@playwright/test';

export let generatedDate: string;

export async function generateDate(days: number): Promise<string> {
    const today = new Date(); // Get today's date
    today.setDate(today.getDate() + days); // Add days to today's date
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    generatedDate = `${day < 10 ? '0' + day : day}-${month + 1 < 10 ? '0' + (month + 1) : (month + 1)}-${year}`; // Format DD-MM-YYYY
    console.log(`Generated date (DD-MM-YYYY): ${generatedDate}`);
    return generatedDate;
}

export class DatePicker {
    private page: Page;
    private first_record_locator: FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.first_record_locator = this.page.locator('#ctl00_MainContent_mainFrame').contentFrame();
    }

    async office_datepicker_J3calendar(ClickAction: string, datestring: string): Promise<void> {
        const [Day, Month, Year] = datestring.split('-'); // Split
        await this.first_record_locator.locator(ClickAction).click(); //click on from 
        await this.first_record_locator.getByRole('combobox').nth(1).selectOption(`${Number(Year)}`); //select the year 
        await this.first_record_locator.getByRole('combobox').first().selectOption(`${Number(Month) - 1}`);//select the month
        await this.first_record_locator.locator(`//a[starts-with(@class,'ui-state-default')][text()=${Number(Day)}]`).click(); //select the day
        await this.page.waitForTimeout(3000);
        const selectedDate = this.page.locator('#ctl00_MainContent_mainFrame').contentFrame().locator(`${ClickAction}`);
        expect.soft(selectedDate).toHaveValue(datestring);
    }

    async vessel_datepicker_J3calendar(ClickAction: string, datestring: string): Promise<void> {
        const [Day, Month, Year] = datestring.split('-'); // Split
        await this.page.locator(ClickAction).click(); //click on from 
        await this.page.getByRole('combobox').nth(1).selectOption(`${Number(Year)}`); //select the year 
        await this.page.getByRole('combobox').first().selectOption(`${Number(Month) - 1}`);//select the month
        await this.page.locator(`//a[starts-with(@class,'ui-state-default')][text()=${Number(Day)}]`).click(); //select the day
        await this.page.waitForTimeout(2000);
        const selectedDate = this.page.locator(`${ClickAction}`);
        expect.soft(selectedDate).toHaveValue(datestring);
    }
} 