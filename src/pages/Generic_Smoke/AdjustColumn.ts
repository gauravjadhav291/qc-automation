import { Page, Locator } from '@playwright/test';

export default class AdjustColumnValidation {
  private page: Page;
  private threeDotLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.threeDotLocator = this.page.frameLocator('#ctl00_MainContent_mainFrame');
  }

  async Navigate_click(Page_url: string, selector?: string): Promise<void> {
    console.log(Page_url);
    await this.page.goto(Page_url, { timeout: 30_000 });
  }

  // Function for getting all column values dynamically and validating them
  async adjustColumnValidation(expectedValues: string[]): Promise<void> {
    await this.page.waitForTimeout(2000);
    await this.threeDotLocator.locator('#advanced-settings').click();
    await this.threeDotLocator.getByText('Adjust Columns').click();

    const adjustcol = this.threeDotLocator.locator("//div[@class='checkbox-custom ng-star-inserted']");
    const adjustColumnValueUI: string[] = [];
    await this.page.waitForTimeout(10000);

    const count = await adjustcol.count();
    for (let i = 0; i < count; i++) {
      const element = adjustcol.nth(i);
      const text = (await element.textContent())?.trim() || '';
      adjustColumnValueUI.push(text);
    }

    console.log('All Adjust Column present on UI:', adjustColumnValueUI);

    // Validation logic
    const missingInUI = expectedValues.filter(value => !adjustColumnValueUI.includes(value));
    const missingInExpected = adjustColumnValueUI.filter(value => !expectedValues.includes(value));

    if (missingInUI.length === 0 && missingInExpected.length === 0) {
      console.log('All Adjust column values are matching');
    } else {
      console.log('Missing in UI:', missingInUI);
      console.log('Missing in expected:', missingInExpected);
      throw new Error(
        `Not all Adjust column values are matching. Missing in UI: ${missingInUI.join(', ')}, Missing in expected: ${missingInExpected.join(', ')}`
      );
    }
  }
} 