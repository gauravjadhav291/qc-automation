import { expect, Page, Frame } from '@playwright/test';
import { Feed_Discussion } from '../../utils/FeedAndDiscussion_locators.json';
import { generateRandomString, generateDate } from './GenerateRandomValue';
import { GlobalSetup, detailPageMainFrame, page1, MainPageMainFrame } from './GlobalSetup';

interface ExpectedField {
    field: string;
    timeout?: number;
}

export class FeedAndDiscussion extends GlobalSetup {
    constructor(page: Page) {
        super(page);
    }

    async ThreeDotValidation(): Promise<void> {
        await this.page.waitForTimeout(2000);
        await this.page.pause();
        await expect(MainPageMainFrame.locator('#advanced-settings')).toBeVisible();
        await MainPageMainFrame.locator('#advanced-settings').click();
        await this.page.waitForTimeout(2000);
        await expect(MainPageMainFrame.getByText('Clear Filters')).toBeVisible();
        await expect(MainPageMainFrame.getByText('Export')).toBeVisible();
        await expect(MainPageMainFrame.getByText('Adjust Columns')).toBeVisible();
    }
    async Navigate_to_FeedAndDiscussion(SetEnvironment: 'office' | 'vessel'): Promise<void> {
        let softAssertionsFailed = false;
        const isVisible = await detailPageMainFrame.locator("i[class='jibe-maximize ng-star-inserted']").isVisible();

        if (!isVisible) {
            await detailPageMainFrame.locator('#discussionConRef i').click();
            await expect(detailPageMainFrame.locator('#discussionConRef').getByText('Feed & Discussions')).toBeVisible({ timeout: 60_000 });
        }

        // Get login user based on environment
        let login_user: string;
        if (SetEnvironment === 'office') {
            login_user = process.env.UserName || '';
        } else {
            const avatarSelector = "(//span[@class='avatar-svg ng-star-inserted'])[1]";
            await detailPageMainFrame.locator(avatarSelector).click();
            await expect(detailPageMainFrame.locator('body')).toContainText('Log out');

            login_user = (await detailPageMainFrame.locator("div[class='user-title']").textContent() || '') + ' - MST';

            await detailPageMainFrame.locator(avatarSelector).click();
            await expect(detailPageMainFrame.locator('div').filter({ hasText: /^Log out$/ }).locator('i')).not.toBeVisible({ timeout: 20_000 });        
                
        }
        console.log("login_user:-", login_user);

        // Add initial comment
        const comment = "Testim_" + generateRandomString(15);
        const addedDate = generateDate(0);
        await detailPageMainFrame
            .locator("//textarea[@placeholder='Add a comment. Use @ to mention a person.']")
            .fill(comment);
        await detailPageMainFrame.locator(Feed_Discussion.sendButton).click();
        await page1.waitForTimeout(5000);

        // Verify comment
        const discussionRef = detailPageMainFrame.locator('#discussionConRef').first();
        await expect(discussionRef).toContainText(comment, { timeout: 60_000 });
        await expect.soft(discussionRef).toContainText(login_user);
        await expect(discussionRef).toContainText(addedDate);

        // Edit comment
        const comment2 = "Edited_" + generateRandomString(15);
        await detailPageMainFrame.locator(Feed_Discussion.hoverAction).hover();
        await detailPageMainFrame.locator(Feed_Discussion.editIcon).click();
        await detailPageMainFrame.locator(Feed_Discussion.editTextBox).fill(comment2);
        await detailPageMainFrame.locator(Feed_Discussion.sendEditButton).click();
        await page1.waitForTimeout(3000);
        await expect(discussionRef).toContainText('(Edited)', { timeout: 60_000 });
        await expect(discussionRef).toContainText(comment2);

        if (SetEnvironment === "office") {
            // Mention user
            const comment3 = generateRandomString(200);
            console.log("comment3:-", comment3);
            const mentionedUser = "@Testim_io";
            await detailPageMainFrame
                .locator(Feed_Discussion.inputBoxClick)
                .fill(`${mentionedUser} ${comment3} ${mentionedUser}`);
            await detailPageMainFrame.locator(Feed_Discussion.sendButton).click();

            const expectedFields = [mentionedUser, comment3, mentionedUser];
            await page1.waitForTimeout(5000);

            for (const field of expectedFields) {
                await expect.soft(discussionRef)
                    .toContainText(field, { timeout: 60_000 });
            }

            // Handle header title icon
            const header_title_icon = await detailPageMainFrame
                .locator('.widget-header-title__icon')
                .isVisible();

            if (header_title_icon) {
                await expect(detailPageMainFrame.locator('#discussionConRef'))
                    .toContainText('More');
                await detailPageMainFrame
                    .locator("(//a[@class='show-less'])[1]")
                    .first()
                    .click();
                await expect(detailPageMainFrame.locator('#discussionConRef'))
                    .toContainText('Less');
            }

            // Activity Feed
            const activityFeedFrame = await (SetEnvironment === 'office'
                ? page1.locator('#iframeNotify').contentFrame()
                : page1.locator('#iframeNotify'));

            if (!activityFeedFrame) {
                throw new Error('Activity feed frame not found');
            }

            await page1.getByTitle('Notification').click();
            await expect.soft(activityFeedFrame.locator('jb-notification'))
                .toContainText('Activity Feed', { timeout: 60_000 });
            await expect.soft(activityFeedFrame.locator('#ui-tabpanel-0-label'))
                .toContainText('Mentioned');
            await expect.soft(activityFeedFrame.getByLabel('Mentioned'))
                .toContainText(login_user, { timeout: 60_000 });
            await expect.soft(activityFeedFrame.getByLabel('Mentioned').first())
                .toContainText('More');

            await activityFeedFrame.locator('.show-less').first().click();
            await expect.soft(activityFeedFrame.getByLabel('Mentioned').first())
                .toContainText('Less');

            const expectedFields2 = [`@${login_user}`, comment3, `@${login_user}`];
            for (const field of expectedFields2) {
                await expect.soft(activityFeedFrame.getByLabel('Mentioned').first())
                    .toContainText(field);
            }

            await activityFeedFrame.locator('.jibe-close').click();
            await expect(page1.getByTitle('SLF'))
                .toBeVisible({ timeout: 60_000 });
        }

        console.log("Feed and Discussion test case is completed Successfully");
    }

    async feedNDiscussion(expectedFields: string[]): Promise<void> {
        const detailFrame = detailPageMainFrame;
        if (!detailFrame) throw new Error('Detail page frame not found');

        const isVisible = await detailFrame
            .locator('#discussionConRef i')
            .nth(1)
            .isVisible();

        if (!isVisible) {
            await detailFrame.locator('#discussionConRef i').click();
            await expect(detailFrame.locator('#discussionConRef')
                .getByText('Feed & Discussions'))
                .toBeVisible({ timeout: 60_000 });
        }

        const addedDate = generateDate(0);
        const dynamicExpectedFields = [...expectedFields];

        for (const field of dynamicExpectedFields) {
            await expect.soft(detailFrame.locator('#discussionConRef').first())
                .toContainText(field);
        }
    }
} 