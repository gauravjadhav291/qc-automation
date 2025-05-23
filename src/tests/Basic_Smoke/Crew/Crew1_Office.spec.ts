import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../../pages/Basic_Smoke/Login';
import { Basic_Smoke } from '../../../pages/Basic_Smoke/BasicSmoke';
import { Locators, xpath } from '../../../utils/BasicSmoke_locators.json';
import { Office_Endpoints } from '../../../utils/EndPoints.json';

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const office_log = new LoginPage(page);
    await office_log.login(process.env.userid!, process.env.password!);
});

test.afterEach('After Each', async ({ page }: { page: Page }) => {
    await page.close();
});
 
test('@Crew_BasicSmoke_Office J2 Crew planning', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j2url + Office_Endpoints.crewplanning, Locators.MainFirstClick);
    await Navigation_Page.J2validateRecords("J2 Crew planning Page");
});
 
test('@Crew_BasicSmoke_Office Course Manager Basic Smoke', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.course_Manager, Locators.loc_crew_manager);
    await Navigation_Page.validateRecords("Course Manager Page");
 });
 
test('@Crew_BasicSmoke_Office Crew Communication Basic Smoke', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j3url + Office_Endpoints.crew_communication, Locators.MainFirstClick);
    await Navigation_Page.validateRecords("Crew Communication Page");
});
 
test('@Crew_BasicSmoke_Office Crew Event Planner Basic Smoke', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j2url + Office_Endpoints.crew_event_planner, Locators.MainFirstClick);
});
 
test('@Crew_BasicSmoke_Office Crew Matrix Basic Smoke', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j2url + Office_Endpoints.crew_matrix, Locators.MainFirstClick);
});
 
test('@Crew_BasicSmoke_Office Evaluation Schedule Basic Smoke', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j2url + Office_Endpoints.evaluation_schedule, Locators.MainFirstClick);
});
 
test('@Crew_BasicSmoke_Office Handover Report Basic Smoke', async ({ page }) => {

    const Navigation_Page = new Basic_Smoke(page);
    await Navigation_Page.Navigate_click(process.env.j2url + Office_Endpoints.handover_reports, Locators.MainFirstClick);
    await Navigation_Page.J2validateRecords("Handover report Page");
});