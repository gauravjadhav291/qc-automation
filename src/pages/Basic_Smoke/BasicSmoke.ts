import { Page, expect, Locator, FrameLocator } from "@playwright/test";
import { validatePagnination } from "./ValidateRecord";

export class Basic_Smoke {
  private readonly page: Page;
  private readonly first_record_locator: FrameLocator;
  private readonly pgn_locator: Locator;
  private readonly pgn_locator_vessel: Locator;
  private readonly alert_locator: Locator;
  private readonly advance_locator: Locator;
  private readonly clear_locator: Locator;
  private readonly Back_btn_locator: Locator;
  private readonly J2_pgnLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.first_record_locator = this.page
      .locator("#ctl00_MainContent_mainFrame")
      .contentFrame();
    this.pgn_locator = this.first_record_locator.getByText(
      "Items per page| Total Pages"
    );
    this.pgn_locator_vessel = this.page.getByText(
      "Items per page| Total Pages"
    );
    this.alert_locator = this.page.getByRole("alert").locator("a");
    this.advance_locator = this.page.locator("#advanced-settings");
    this.clear_locator = this.page.getByText("Clear Filters");
    this.Back_btn_locator = this.first_record_locator.getByRole("button", {
      name: "Back",
    });
    this.J2_pgnLocator = this.page.getByText("[ Total Pages : ");
  }

  async NavigateWithModule(
    ModuleClick: string,
    selector: string,
    loc_type: number
  ): Promise<void> {
    const page1Promise = this.page.waitForEvent("popup");
    await this.first_record_locator
      .getByText(ModuleClick)
      .click({ timeout: 20_000 });
    await this.first_record_locator
      .locator(selector)
      .first()
      .click({ timeout: 30_000 });
    await this.page.waitForTimeout(20000);

    const page1 = await page1Promise;
    switch (loc_type) {
      case 1:
        await expect(
          page1
            .locator("#ctl00_MainContent_mainFrame")
            .contentFrame()
            .locator("#discussionConRef")
            .getByText("Feed & Discussions")
        ).toBeVisible({ timeout: 60_000 });
        console.log("case1");
        await this.page.waitForTimeout(3000);
        await page1.close();
        break;
      case 2:
        await expect(
          page1
            .locator("#ctl00_MainContent_mainFrame")
            .contentFrame()
            .getByText("Feed & Discussions")
        ).toBeVisible({ timeout: 60_000 });
        console.log("case2");
        await this.page.waitForTimeout(3000);
        await page1.close();
        break;
      default:
        console.log("Only checked Pagination for this Page");
    }
  }

  async clear_filter(): Promise<void> {
    await this.page.waitForTimeout(15000);
    await this.first_record_locator.locator("#advanced-settings").click();
    await this.page.waitForTimeout(2000);
    await this.first_record_locator.getByText("Clear Filters").click();
    await this.page.waitForTimeout(15000);
  }

  async Navigate_click(Page_url: string, selector: string): Promise<void> {
    console.log(Page_url);
    await this.page.waitForTimeout(5000);
    await this.page.goto(Page_url, { timeout: 50_000 });
    await this.page.waitForTimeout(35000);

    if (Page_url.includes("jms/index/deferral")) {
      await this.clear_filter();
    }

    if (
      !Page_url.includes("records/records_book") &&
      !Page_url.includes("deck") &&
      !Page_url.includes("pms") &&
      !Page_url.includes("tax-library/tax-index") &&
      !Page_url.includes("projects-library") &&
      !Page_url.includes("jms/main") &&
      !Page_url.includes("jms/index/internalAuditPlanner") &&
      !Page_url.includes(
        "Technical/Inspection/SuperintendentInspection.aspx"
      ) &&
      !Page_url.includes("Technical/Vetting/Vetting_Index.aspx") &&
      !Page_url.includes("j3-crew/drill-calendar") &&
      !Page_url.includes("lms/lms_program_list.aspx") &&
      !Page_url.includes("Infrastructure/Libraries/Drill_Questionnaire.aspx") &&
      !Page_url.includes("lms/LMS_Item_List.aspx") &&
      !Page_url.includes("Crew/RelievePlanning.aspx") &&
      !Page_url.includes("Crew/EventPlanner.aspx") &&
      !Page_url.includes("Crew/CrewMatrixNew.aspx") &&
      !Page_url.includes("CrewEvaluation/EvaluationSchedules.aspx") &&
      !Page_url.includes("CrewEvaluation/EvaluationSchedules.aspx") &&
      !Page_url.includes("Crew/CrewListHistory.aspx") &&
      !Page_url.includes("crew-training/crew-course-index") &&
      !Page_url.includes("/crew/crew-communication-index") &&
      !Page_url.includes("Crew/CrewHandOver.aspx") &&
      !Page_url.includes("QMS/FBM/FBM_Main_Report.aspx") &&
      !Page_url.includes("Crew/CrewCardIndex.aspx") &&
      !Page_url.includes("/crew-training/training-list-index") &&
      !Page_url.includes("crew-accounts/onboard-account/admin-index") &&
      !Page_url.includes(
        "crew-accounts/wage-scale-library/wage-scale-library-index"
      ) &&
      !Page_url.includes("crew-accounts/salary-structure/salary-index") &&
      !Page_url.includes(
        "crew-accounts/onboard-accounts-main/onboard-account-index"
      ) &&
      !Page_url.includes("voyage-manager/index/grid") &&
      !Page_url.includes("vessel-schedule/index") &&
      !Page_url.includes("dry-dock/project-templates-main") &&
      !Page_url.includes("dry-dock/standard-jobs-main")
    ) {
      const page1Promise = this.page.waitForEvent("popup");
      if (
        Page_url.includes("j3-crew/drill-index") ||
        Page_url.includes("crew-accounts/crew-task/sign-off-index")
      ) {
        await this.first_record_locator
          .getByRole("cell", { name: selector })
          .locator("a")
          .first()
          .click({ timeout: 60_000 });
      } else if (Page_url.includes("crew/crewlist.aspx")) {
        await this.page
          .locator("(//a[contains(@href,'CrewDetails.aspx')])[1]")
          .click({ timeout: 50_000 });
      } else {
        await this.first_record_locator.locator(selector).first().click();
      }

      if (
        !Page_url.includes("voyage-manager/index/grid") &&
        !Page_url.includes("dry-dock/standard-jobs-main") &&
        !Page_url.includes("dry-dock/project-templates-main")
      ) {
        const page1 = await page1Promise;
        if (
          Page_url.includes("j3-chartering/chartering") ||
          Page_url.includes("budget-library") ||
          Page_url.includes("journal") ||
          Page_url.includes("dry-dock/projects-main-page") ||
          Page_url.includes("j3-crew/drill-index") ||
          Page_url.includes(
            "crew-accounts/onboard-accounts-main/portage-bill-index"
          ) ||
          Page_url.includes("crew-accounts/crew-task/sign-off-index") ||
          Page_url.includes(
            "crew-accounts/allotment/allotment-payment-center-index"
          )
        ) {
          await page1
            .locator("#ctl00_MainContent_mainFrame")
            .contentFrame()
            .locator("#discussionConRef i")
            .click({ timeout: 60_000 });
        }
        if (Page_url.includes("prc-catalog/catalog-main-page")) {
          await expect(
            page1
              .locator("#ctl00_MainContent_mainFrame")
              .contentFrame()
              .getByText("General information", { exact: true })
          ).toBeVisible({ timeout: 90000 });
        } else if (Page_url.includes("management-contract")) {
          await expect(
            page1
              .locator("#ctl00_MainContent_mainFrame")
              .contentFrame()
              .locator("jb-details-layout-figma")
              .getByText("General")
          ).toBeVisible({ timeout: 30_000 });
        } else if (Page_url.includes("gl-account-library")) {
          await expect(
            page1
              .locator("#ctl00_MainContent_mainFrame")
              .contentFrame()
              .locator("lib-gl-account-details")
              .getByText("GL Account Details")
          ).toBeVisible({ timeout: 30_000 });
        } else if (Page_url.includes("reporting-structures")) {
          await expect(
            page1
              .locator("#ctl00_MainContent_mainFrame")
              .contentFrame()
              .getByText("Code *")
          ).toBeVisible({ timeout: 30_000 });
        } else if (Page_url.includes("crew/crewlist.aspx")) {
          await expect(
            page1.getByRole("link", { name: "Documents", exact: true })
          ).toBeVisible({ timeout: 50_000 });
        } else {
          await expect(
            page1
              .locator("#ctl00_MainContent_mainFrame")
              .contentFrame()
              .locator("#discussionConRef")
              .getByText("Feed & Discussions")
          ).toBeVisible({ timeout: 60_000 });
        }
        await page1.close();
      } else {
        if (Page_url.includes("vessel-schedule/index")) {
          await this.first_record_locator
            .locator("#grid-cell-value > span")
            .first()
            .dblclick({ timeout: 30_000 });
          await expect(
            this.first_record_locator.getByRole("heading", {
              name: "Vessel Movement",
            })
          ).toBeVisible({ timeout: 60_000 });
          await this.Back_btn_locator.click();
        } else if (Page_url.includes("voyage-manager/index/grid")) {
          await this.first_record_locator
            .locator("#grid-cell-value > span")
            .first()
            .dblclick({ timeout: 30_000 });
          await expect(
            this.first_record_locator.getByRole("heading", {
              name: "Voyage Manager",
            })
          ).toBeVisible({ timeout: 60_000 });
          await this.Back_btn_locator.click();
        } else if (Page_url.includes("dry-dock/standard-jobs-main")) {
          await this.first_record_locator
            .getByText("Edit Standard Job")
            .textContent({ timeout: 50_000 });
          await this.first_record_locator
            .locator("//span[@class='pi jibe-close']")
            .click({ timeout: 50_000 });
        } else if (Page_url.includes("dry-dock/project-templates-main")) {
          await this.first_record_locator
            .getByText("Edit Project Template")
            .textContent();
          await this.first_record_locator
            .locator("//span[@class='pi jibe-close']")
            .click({ timeout: 50_000 });
        }
      }
    } else {
      if (Page_url.includes("lms/lms_program_list.aspx")) {
        await this.page
          .locator("table")
          .filter({ hasText: "Question: Add New Question" })
          .waitFor({ timeout: 40000 });
        console.log("lms_program Page Validated");
      } else if (
        Page_url.includes("Infrastructure/Libraries/Drill_Questionnaire.aspx")
      ) {
        await expect(
          this.page.locator(
            "#ctl00_MainContent_grdQuestion_ctl02_LinkButton1del"
          )
        ).toBeVisible({ timeout: 50000 });
        console.log("Drill_Questionnaire Page validate");
      } else if (Page_url.includes("j3-crew/drill-calendar")) {
        await expect(
          this.first_record_locator.getByText("Drill Name:Select")
        ).toBeVisible({ timeout: 60_000 });
        console.log("drill-calendar Page Validated");
      } else if (Page_url.includes("lms/LMS_Item_List.aspx")) {
        await expect(
          this.page.locator("#ctl00_MainContent_gvTrainingItems")
        ).toContainText("RESOURCE", { timeout: 50000 });
        console.log("LMS_Item_List Page validate");
      } else if (Page_url.includes("Crew/RelievePlanning.aspx")) {
        await expect(this.page.getByText("Crew OnBoard, FINISHING")).toHaveText(
          "Crew OnBoard, FINISHING CONTRACT",
          { timeout: 15_000 }
        );
        console.log("J2 Crew planning Page validate");
      } else if (Page_url.includes("Crew/EventPlanner.aspx")) {
        await expect(
          this.page.getByText("Crew OnBoard, FINISHING CONTRACT")
        ).toHaveText("Crew OnBoard, FINISHING CONTRACT", { timeout: 15_000 });
        console.log("Crew Event planner validated");
      } else if (Page_url.includes("Crew/CrewMatrixNew.aspx")) {
        await expect(
          this.page.getByRole("cell", { name: "Type Of Vessel" })
        ).toHaveText("Type Of Vessel", { timeout: 15_000 });
        console.log("Crew Matrix page validated");
      } else if (Page_url.includes("CrewEvaluation/EvaluationSchedules.aspx")) {
        await expect(
          this.page.getByRole("cell", { name: "Vessel", exact: true })
        ).toHaveText("Vessel", { timeout: 15_000 });
        console.log("Crew Matrix page validated");
      } else if (Page_url.includes("CrewEvaluation/EvaluationSchedules.aspx")) {
        await expect(
          this.page.getByRole("cell", { name: "Vessel", exact: true })
        ).toHaveText("Vessel", { timeout: 15_000 });
        console.log("Crew Evaluation page validated");
      } else if (Page_url.includes("Crew/CrewListHistory.aspx")) {
        await expect(this.page.getByText("Crew List View")).toBeVisible({
          timeout: 15_000,
        });
        console.log("Crew history page validated");
      }
    }
  }

  async Navigate_click01(Page_url: string, selector: string): Promise<void> {
    console.log(Page_url);
    await this.page.waitForTimeout(5000);
    await this.page.goto(Page_url, { timeout: 30_000 });
    await this.page.waitForTimeout(35000);

    if (
      Page_url.includes("crew/work-rest-hour-index") ||
      Page_url.includes("crew/wrh-fleet-main")
    ) {
      await this.first_record_locator.getByText("Attention!");
      await this.first_record_locator.getByText("To view the data please");
      await this.first_record_locator
        .getByRole("button", { name: "Ok" })
        .click();
      await this.page.waitForTimeout(3000);
      await this.first_record_locator
        .locator("#Vessel_Name")
        .getByText("Select")
        .click();
      await this.first_record_locator
        .locator("#Vessel_Name")
        .getByRole("textbox")
        .fill(process.env.live_Vessel as string);
      await this.first_record_locator.getByRole("checkbox").nth(1).click();
      await this.first_record_locator.locator("#Vessel_Name a").click();
      await this.page.waitForTimeout(3000);
    } else if (
      Page_url.includes("inventory-management/inventory/inventory-spares-grid")
    ) {
      await this.first_record_locator
        .getByRole("button", { name: "keyboard_arrow_down" })
        .click();
      await this.first_record_locator
        .getByRole("textbox")
        .fill(process.env.live_Vessel as string);
      await this.first_record_locator
        .getByLabel(process.env.live_Vessel as string)
        .locator("div")
        .click();
      await this.page.waitForTimeout(10000);
      await this.first_record_locator
        .locator("span")
        .filter({ hasText: "Stores" })
        .click();
      await this.first_record_locator.getByRole("cell", {
        name: process.env.live_Vessel as string,
      });
    }

    if (
      Page_url.includes(
        "inventory-management/inventory/inventory-spares-grid"
      ) ||
      Page_url.includes("crew/work-rest-hour-index") ||
      Page_url.includes("crew/wrh-fleet-main")
    ) {
      console.log("No Detail Page Validation Required");
    } else {
      const page1Promise = this.page.waitForEvent("popup");
      await this.first_record_locator.locator(selector).first().click();
      const page1 = await page1Promise;
      await expect(
        page1
          .locator("#ctl00_MainContent_mainFrame")
          .contentFrame()
          .getByText("Feed & Discussions")
      ).toBeVisible({ timeout: 60_000 });
    }
  }

  async validateRecords(ModuleName: string): Promise<void> {
    const itemsText =
      (await this.pgn_locator.textContent({ timeout: 30_000 })) || "";
    if (!validatePagnination(itemsText)) {
      throw new Error(`No Records found ${ModuleName}`);
    }
    console.log(`Records are present for ${ModuleName}`);
  }

  async J2validateRecords(ModuleName: string): Promise<void> {
    const itemsText = (await this.J2_pgnLocator.textContent()) || "";
    console.log(itemsText);
    console.log(validatePagnination(itemsText));
    if (!validatePagnination(itemsText)) {
      throw new Error(`No Records found on ${ModuleName}`);
    }
    console.log(`Records are present for ${ModuleName}`);
  }

  async validatePagnination_vessel(ModuleName: string): Promise<void> {
    const itemsText = (await this.pgn_locator_vessel.textContent()) || "";
    if (!validatePagnination(itemsText)) {
      throw new Error(`No Records found ${ModuleName}`);
    }
    console.log(`Records are present for ${ModuleName}`);
  }

  async validateRecordsmp(ModuleName: string): Promise<void> {
    await this.first_record_locator.getByText("Select").click();
    await this.first_record_locator
      .getByRole("textbox")
      .fill(process.env.live_Vessel as string);
    await this.first_record_locator
      .getByText(process.env.live_Vessel as string)
      .click();
    await this.first_record_locator
      .getByRole("tree")
      .getByText(process.env.live_Vessel as string)
      .click();
    await this.first_record_locator
      .getByRole("tab", { name: "Planned Maintenance" })
      .click();
    await this.page.waitForTimeout(5000);

    const itemsText = (await this.pgn_locator.textContent()) || "";
    if (!validatePagnination(itemsText)) {
      throw new Error(`No Records found ${ModuleName}`);
    }
    console.log(`Records are present for ${ModuleName}`);
  }

  async validateRecords_onboard_smp(ModuleName: string): Promise<void> {
    await expect(this.page.getByPlaceholder("Search...")).toBeVisible();
    await this.page.getByLabel(process.env.live_Vessel as string).click();
    await this.page.getByRole("tab", { name: "Job Status" }).click();
    await this.page.waitForTimeout(30_000);

    const itemsText = (await this.pgn_locator_vessel.textContent()) || "";
    if (!validatePagnination(itemsText)) {
      throw new Error(`No Records found On ${ModuleName}`);
    }
    console.log(`Records are visible on ${ModuleName}`);
  }

  //-----------------------------------------------ONBOARD NAVIGATION-----------------------------------------------
  async Navigate_click_vessel(
    Page_url: string,
    shortcode: string
  ): Promise<void> {
    await this.page.waitForTimeout(35000);
    await this.page.goto(Page_url, { timeout: 30_000 });

    if (
      !Page_url.includes("/inventory-management/main") &&
      !Page_url.includes("pms") &&
      !Page_url.includes("/jms/main/inspection") &&
      !Page_url.includes(
        "crew-accounts/onboard-accounts-main/onboard-account-index"
      ) &&
      !Page_url.includes("deck") &&
      !Page_url.includes("/crew/work-rest-hour-index") &&
      !Page_url.includes("voyage-manager/index")
    ) {
      this.page.pause()
      const page1Promise = this.page.waitForEvent("popup");

      if (Page_url.includes("/jms/index/scm")) {
        await this.page
          .getByRole("cell", { name: shortcode })
          .locator("div")
          .first()
          .click();
      } else if (
        Page_url.includes("prc-main-flow") ||
        Page_url.includes("prc-catalog/item-main-page") ||
        Page_url.includes("prc-catalog/catalog-main-page") ||
        Page_url.includes("procurement/item-list-main-page")
      ) {
        await this.page.locator(shortcode).click();
      } else if (
        Page_url.includes("/crew/riskassessment") ||
        Page_url.includes("/jms/index/certificate") ||
        Page_url.includes("/jms/index/psc") ||
        Page_url.includes("/jms/index/deficiency") ||
        Page_url.includes("/jms/index/internalAudit") ||
        Page_url.includes("/jms/index/findings") ||
        Page_url.includes("/jms/index/deferral") ||
        Page_url.includes(
          "crew-accounts/onboard-accounts-main/portage-bill-index"
        )
      ) {
        if (Page_url.includes("/jms/index/deferral")) {
          await this.page.waitForTimeout(20000);
          await this.alert_locator.click();
          await this.advance_locator.click();
          await this.clear_locator.click();
          await this.page.waitForTimeout(20000);
        }
        await this.page.locator(shortcode).first().click({ timeout: 30_000 });
      } else if (Page_url.includes("/voyage-report/index/grid")) {
        await this.advance_locator.click();
        await this.clear_locator.click();
        await this.page.waitForTimeout(35000);
        const element = await this.page
          .getByText("Arrival Report at Berth")
          .first();
        await element.waitFor({ timeout: 15_000 });
        await element.click();
      } else if (Page_url.includes("manager/env-meeting/index")) {
        await this.page
          .getByRole("cell", { name: shortcode })
          .locator("a")
          .first()
          .click();
      } else {
        await this.page.getByRole("cell", { name: shortcode }).first().click();
      }

      const page1 = await page1Promise;
      if (!Page_url.includes("prc-catalog/catalog-main-page")) {
        if (
          Page_url.includes(
            "crew-accounts/onboard-accounts-main/portage-bill-index"
          ) ||
          Page_url.includes("crew-accounts/crew-task/sign-off-index") ||
          Page_url.includes("j3-crew/drill-index")
        ) {
          await page1.locator("#discussionConRef i").click({ timeout: 30_000 });
        }
        await expect(
          page1.locator("#discussionConRef").getByText("Feed & Discussions")
        ).toBeVisible({ timeout: 60_000 });
      } else {
        await expect(
          page1.getByText("General information", { exact: true })
        ).toBeVisible({ timeout: 30_000 });
        await page1.close();
      }
    } else {
      if (Page_url.includes("/deck")) {
        await this.page.waitForTimeout(50_000);
        await this.page.locator(shortcode).click();
        await this.page.getByRole("button", { name: "Back" }).click();
      } else if (Page_url.includes("voyage-manager/index")) {
        await this.page
          .locator("span")
          .filter({ hasText: "JiBe Voyage No." })
          .click();
        await this.page
          .locator("span")
          .filter({ hasText: "JiBe Voyage No." })
          .click();
        await this.page.waitForTimeout(100_000);
        await this.page
          .locator("#grid-cell-value > span")
          .first()
          .click({ timeout: 30_000 });
      }
    }
  }

  async Vessel_Navigation(
    ModuleClick: string,
    selector: string,
    loc_type: number
  ): Promise<void> {
    const page1Promise = this.page.waitForEvent("popup");
    await this.page.getByText(ModuleClick).click();
    await this.page.waitForTimeout(35000);
    await this.page.locator(selector).first().click();
    await this.page.waitForTimeout(25000);

    const page1 = await page1Promise;
    switch (loc_type) {
      case 1:
        await expect(
          page1.locator("#discussionConRef").getByText("Feed & Discussions")
        ).toBeVisible({ timeout: 60_000 });
        console.log("case1");
        await this.page.waitForTimeout(3000);
        await page1.close();
        break;
      case 2:
        await expect(page1.getByText("Feed & Discussions")).toBeVisible({
          timeout: 60_000,
        });
        console.log("case2");
        await this.page.waitForTimeout(3000);
        await page1.close();
        break;
      default:
        console.log("Only checked Pagination for this Page");
    }
  }
}
