import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../../../pages/Basic_Smoke/Login';
import { Basic_Smoke } from '../../../../pages/Basic_Smoke/BasicSmoke';
import { Locators, xpath } from '../../../../utils/BasicSmoke_locators.json';
import { Vessel_EndPoints } from '../../../../utils/EndPoints.json';

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const vessel_log = new LoginPage(page);
    await vessel_log.Vessel_login();});

test.afterEach('After Each', async ({ page }: { page: Page }) => {
    await page.close();
});

test('@RiskAssessment_BasicSmoke_VesselRiskAssessment_Main_Page Basic Smoke', async ({ page }: { page: Page }) => {
    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click_vessel(process.env.Vessel_J3url+Vessel_EndPoints.risk_assessment_Vessel_EP , Locators.risk_assessment_vessel);
    await Navigation_Page.validateRecords("RiskAssessment_Main_Page");
}); 