import { expect } from "@playwright/test";
import { assert, error } from "console";

exports.AdjustColumnValidation = class AdjustColumnValidation {
  constructor(page) {
    this.page = page;
    this.threeDotLocator = this.page.locator("#ctl00_MainContent_mainFrame").contentFrame();
  }
  async Navigate_click(Page_url, selector) {
    console.log(Page_url);
    await this.page.goto(Page_url, { timeout: 30_000 });
  }
  // Function for getting all column value dynamically
  async adjustColumnValidation(value1) {
    await this.page.waitForTimeout(2000);
    await this.threeDotLocator.locator("#advanced-settings").click();

    await this.threeDotLocator.getByText("Adjust Columns").click();
    const adjustcol = await this.threeDotLocator.locator("(//div[@class='checkbox-custom ng-star-inserted'])"
    );
    // defining blank array
    const adjustColumnValueUI = [];
    await this.page.waitForTimeout(10000);
    const count = await adjustcol.count();
    for (let i = 0; i < count; i++) {
      const element = await adjustcol.nth(i);
      const text = await element.textContent();
      adjustColumnValueUI.push(text);
    }
    await this.page.pause();
    console.log("All Adjust Column present on UI ", adjustColumnValueUI);
    // Adding validation for adjust column
    // if (value1.length === adjustColumnValueUI.length) {
    //   const missingInAdjustColumnValueUI = value1.filter((value) => !adjustColumnValueUI.includes(value));
    //   const missingInValue1 = adjustColumnValueUI.filter((value) => !value1.includes(value));

    //   if (missingInAdjustColumnValueUI.length === 0 && missingInValue1.length === 0) {
    //     console.log("All Adjust column values are matching");
    //   } else {
    //     throw new Error(`Not all Adjust column values are matching. Missing in adjustColumnValueUI: ${missingInAdjustColumnValueUI.join(", ")}, Missing in value1: ${missingInValue1.join(", ")}`);
    //   }
    // } else {
    //   const missingInAdjustColumnValueUI = value1.filter((value) => !adjustColumnValueUI.includes(value));
    //   const missingInValue1 = adjustColumnValueUI.filter((value) => !value1.includes(value));

    //  console.log("Missing in adjustColumnValueUI:",missingInAdjustColumnValueUI);
    //  console.log("Missing in value1:", missingInValue1);

    // }
// New Code 

if (value1.length === adjustColumnValueUI.length) {
  const missingInAdjustColumnValueUI = value1.filter((value) => !adjustColumnValueUI.includes(value));
  const missingInValue1 = adjustColumnValueUI.filter((value) => !value1.includes(value));

  if (missingInAdjustColumnValueUI.length === 0 && missingInValue1.length === 0) {
    console.log("All Adjust column values are matching");
  } else {
    throw new Error(`Not all Adjust column values are matching. Missing in adjustColumnValueUI: ${missingInAdjustColumnValueUI.join(", ")}, Missing in value1: ${missingInValue1.join(", ")}`);
  }
} else {
  const missingInAdjustColumnValueUI = value1.filter((value) => !adjustColumnValueUI.includes(value));
  const missingInValue1 = adjustColumnValueUI.filter((value) => !value1.includes(value));
  console.log("missingInAdjustColumnValueUI",missingInAdjustColumnValueUI)
  console.log("missingInValue1",missingInValue1)

  throw new Error(`Missing in adjustColumnValueUI: ${missingInAdjustColumnValueUI.join(", ")}, Missing in value1: ${missingInValue1.join(", ")}`);
}





       // Clear extracted arrarys
    adjustColumnValueUI.lenght = 0;
  }
};
 