import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../../../pages/Basic_Smoke/Login';
import { Basic_Smoke } from '../../../pages/Basic_Smoke/BasicSmoke';
import { Locators, xpath } from '../../../utils/BasicSmoke_locators.json';
import { Vessel_EndPoints } from '../../../utils/EndPoints.json';

test.beforeEach('Before Each', async ({ page }: { page: Page }) => {
    const vessel_log = new LoginPage(page);
    await vessel_log.Vessel_login()
});

test.afterEach('After Each', async ({ page }: { page: Page }) => {
    await page.close();
});

test('@Vessel_BasicSmoke_Office Vessel Incident Nearmiss Page Basic Smoke', async ({ page }) => {
    const Vessel_basic_smoke = new Basic_Smoke(page);

    //incident
    await Vessel_basic_smoke.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.incident_vessel, "NM-");
    await Vessel_basic_smoke.validatePagnination_vessel('IncidentNearmiss')

})
test('@Vessel_BasicSmoke_Office Vessel Besafe Basic Smoke', async ({ page }) => {
    const Vessel_basic_smoke = new Basic_Smoke(page);

    //besafe vessel
    await Vessel_basic_smoke.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.besafe_vessel, "BBS-");
    await Vessel_basic_smoke.validatePagnination_vessel('Besafe')
})
test('@Vessel_BasicSmoke_Office Vessel MOC Basic Smoke', async ({ page }) => {
    const Vessel_basic_smoke = new Basic_Smoke(page);
    //moc_vessel
    await Vessel_basic_smoke.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.moc_vessel, ' MOC-');
    await Vessel_basic_smoke.validatePagnination_vessel('moc vessel')
})

test('@Vessel_BasicSmoke_Office Vessel SCM Basic Smoke', async ({ page }) => {

    const Vessel_basic_smoke = new Basic_Smoke(page);
    //scm_vessel
    await Vessel_basic_smoke.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.scm_vessel, "SC-");
    await Vessel_basic_smoke.validatePagnination_vessel('scm vessel')
})

test('@Vessel_BasicSmoke_Office Vessel Vessel Task Basic Smoke', async ({ page }) => {

    const Vessel_basic_smoke = new Basic_Smoke(page);
    //vessel_task_vessel
    await Vessel_basic_smoke.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.vessel_task_vessel, "VT-");
    await Vessel_basic_smoke.validatePagnination_vessel('vessel task vessel')
})

test('@Vessel_BasicSmoke_Office Vessel ENV Meeting Basic Smoke', async ({ page }) => {
    const Vessel_basic_smoke = new Basic_Smoke(page);

    //env_meeting_vessel
    await Vessel_basic_smoke.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.env_meeting_vessel, "EM-");
    await Vessel_basic_smoke.validatePagnination_vessel('env meeting vessel')
})

test('@Vessel_BasicSmoke_Office Vessel decklog Basic Smoke', async ({ page }) => {
    const Vessel_basic_smoke = new Basic_Smoke(page);

    //deck vessel
    await Vessel_basic_smoke.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.deck_vessel, Locators.deck_vessel);
    await page.waitForTimeout(10_0000)
    await Vessel_basic_smoke.validatePagnination_vessel('deck vessel')
})

test('@Vessel_BasicSmoke_Office Vessel Voyage Report Basic Smoke', async ({ page }) => {
    const Vessel_basic_smoke = new Basic_Smoke(page);
    //Voyage Report vessel
    await Vessel_basic_smoke.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.Voyage_report_vessel, Locators.deck_vessel);
    await Vessel_basic_smoke.validatePagnination_vessel('Voyage_report_vessel')
})

test('@Vessel_BasicSmoke_Office Voyage Manager Basic Smoke', async ({ page }) => {
    const Vessel_basic_smoke = new Basic_Smoke(page);
    //Voyage Manager
    await Vessel_basic_smoke.Navigate_click_vessel(process.env.Vessel_J3url + Vessel_EndPoints.voyage_manager_vessel, Locators.deck_vessel);
    await Vessel_basic_smoke.validatePagnination_vessel('voyage_manager_vessel')
})