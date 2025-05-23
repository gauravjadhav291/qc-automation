import { expect, Page, FrameLocator } from "@playwright/test";

// Define environment type
type Environment = "office" | "vessel";

// Define detail page types
enum DetailPageType {
  OldFeedAndDiscussion = 1,
  NewFeedAndDiscussion = 2,
  NoFeedAndDiscussion = 3,
}

// Define return type for DetailPageNavigation
interface DetailPageNavigationResult {
  page1: Page;
  detailPageMainFrame: FrameLocator | Page;
}

export let MainPageMainFrame: FrameLocator | Page;
export let page1: Page;
export let detailPageMainFrame: FrameLocator | Page;

export class GlobalSetup {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async EnvironmentSettingUp(
    SetEnvironment: Environment
  ): Promise<FrameLocator | Page> {
    MainPageMainFrame =
      SetEnvironment === "office"
        ? this.page.locator("#ctl00_MainContent_mainFrame").contentFrame()
        : this.page;
    return MainPageMainFrame;
  }

  async Navigate_click(Page_url: string): Promise<void> {
    console.log("Page_url-" + Page_url);
    await this.page.goto(Page_url, { timeout: 30_000 });
    await expect
      .soft(
        this.page.locator("(//span[@id='ctl00_ucBreadCrumb_lblBreadcrumb'])[1]")
      )
      .toBeVisible({ timeout: 60_000 });
    await this.page.waitForTimeout(10_000);
  }

  async DetailPageNavigation(
    selector: string,
    ProvideClickType: "clickingOnFirstRecord" | string,
    SetEnvironment: Environment,
    detailPage_type: number
  ): Promise<void> {
    const selectClickType =
      ProvideClickType === "clickingOnFirstRecord"
        ? MainPageMainFrame.locator(selector).first()
        : MainPageMainFrame.locator(selector);

    const page1Promise = this.page.waitForEvent("popup");
    await selectClickType.click();
    page1 = await page1Promise;
    detailPageMainFrame =
      SetEnvironment === "office"
        ? page1.locator("#ctl00_MainContent_mainFrame").contentFrame()
        : page1;

    switch (detailPage_type) {
      case 1: // Old Feed-N-Dicussion
        await expect(
          detailPageMainFrame
            .locator("#discussionConRef")
            .getByText("Feed & Discussions")
        ).toBeVisible({ timeout: 60_000 });
        break;
      case 2: // New Feed-N-Dicussion
        await expect(
          detailPageMainFrame.locator(
            "//i[@class='widget-header-title__icon jibe-chat-room']"
          )
        ).toBeVisible({ timeout: 60_000 });
        break;
      default:
        await page1.waitForTimeout(60_000); // No Feed-N-Discussion
    }
  }
}
