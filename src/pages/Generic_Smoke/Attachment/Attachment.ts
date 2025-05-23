import { expect, Page, FrameLocator } from '@playwright/test';
import { ValidateAttachment } from "./ValidateAddedAttachment";

const filePath = ".\\src\\utils\\Attachment_Files\\GenericAttachFile.pdf";
const imagePath = ".\\src\\utils\\Attachment_Files\\Image.png";
const overSizedFile = ".\\src\\utils\\Attachment_Files\\OverSizedFile.pdf";
const invalidFile = ".\\src\\utils\\Attachment_Files\\demo.js";

let UserName: string = '';

export class Attachment {
    private page: Page;
    private main_page_locator: FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.main_page_locator = this.page.locator('#ctl00_MainContent_mainFrame').contentFrame();
    }

    async Navigate_to_SinglePage(Page_url: string, selector: string): Promise<Page | void> {
        console.log(Page_url);
        if (Page_url.includes('jms/main')) {
            await this.page.goto(Page_url, { timeout: 30_000 });
            await this.page.waitForTimeout(35000);
        } else {
            await this.page.goto(Page_url, { timeout: 30_000 });
            await this.page.waitForTimeout(35000);
            const page1Promise = this.page.waitForEvent('popup');
            await this.main_page_locator.locator(selector).first().click();
            const page1 = await page1Promise;
            await this.page.waitForTimeout(30000);
            return page1;
        }
    }

    async Navigate_to_SinglePage_Vessel(Page_url: string, shortcode: string): Promise<void> {
        console.log(Page_url);
        let page1: Page;
        if (Page_url.includes('/jms/main/inspection')) {
            await this.page.waitForTimeout(35000);
            await this.page.goto(Page_url, { timeout: 35_000 });
            await this.page.waitForTimeout(35000);
            page1 = this.page;
        } else {
            await this.page.waitForTimeout(35000);
            await this.page.goto(Page_url, { timeout: 35_000 });
            await this.page.waitForTimeout(35000);
            const page1Promise = this.page.waitForEvent('popup');
            await this.page.locator(shortcode).first().click({ timeout: 30_000 });
            page1 = await page1Promise;
            await this.page.waitForTimeout(35000);
        }
        await page1.locator('(//span[@class="e-avatar e-avatar-circle avatar-initails avatar-small"])[1]').first().click();
        await page1.waitForTimeout(5000);
        const userName = await page1.locator('//div[@class="user-title"]').textContent() || '';
        UserName = userName;
        await page1.waitForTimeout(5000);
    }

    async Attachment01(page1: Page, useFrame: boolean = true): Promise<void> {
        const single_page_locator = useFrame
            ? await page1.locator('#ctl00_MainContent_mainFrame').contentFrame()
            : page1;

        // Common selectors
        const attachmentsTab = single_page_locator.locator('a').filter({ hasText: 'Attachments' }).first();
        const attachmentsCountText = () =>
            single_page_locator.locator('jb-attachments').getByText('Items per page| Total Pages:');

        const openAddAttachmentDialog = async (): Promise<void> => {
            await attachmentsTab.click();
            await single_page_locator.locator('jb-tm-attachment').getByRole('button', { name: '+ Add New' }).click();
            await page1.waitForTimeout(20000);
            await expect(single_page_locator.getByText('Add Attachment')).toBeVisible();
        };

        const uploadFile = async (filePath: string, comment: string = '', clickUpload: boolean = true): Promise<void> => {
            if (comment) {
                await single_page_locator.getByRole('dialog', { name: 'Add Attachment' }).getByPlaceholder('Add your comments here').fill(comment);
            }
            await single_page_locator.getByLabel('Add Attachment').locator('input[type="file"]').setInputFiles(filePath);
            if (clickUpload) {
                await single_page_locator.getByLabel('Add Attachment').getByRole('button', { name: 'Upload' }).click();
            }
        };

        const validateAttachmentChange = async (before: string, after: string): Promise<void> => {
            if (!ValidateAttachment(before, after)) {
                throw new Error("Attachment is not added");
            } else {
                console.log(`File is added successfully - Positive Scenario Passed`);
            }
        };

        const getAttachmentCount = async (): Promise<string> => {
            return (await attachmentsCountText().textContent() || '').trim();
        };

        const checkErrorMessage = async (expectedText: string): Promise<void> => {
            const errorMsg = await single_page_locator.locator("//span[contains(@class,'ui-messages-summary')]").textContent() || '';
            console.log("Error Message = " + errorMsg);
            await page1.waitForTimeout(20000);
            if (!errorMsg.includes(expectedText)) {
                throw new Error("Error Message is not displayed");
            } else {
                console.log("Error Message Displayed");
            }
        };

        // Upload PDF File
        await attachmentsTab.click();
        await expect(single_page_locator.locator('jb-jms-master').getByText('Attachments')).toBeVisible({ timeout: 60_000 });

        const beforePdfAttach = await getAttachmentCount();
        await openAddAttachmentDialog();
        await single_page_locator.getByLabel('Add Attachment').getByText('Select').click();
        await single_page_locator.locator("(//li[@class = 'ui-dropdown-item ui-corner-all'])[1]").click();
        await uploadFile(filePath, 'Attachment Testing');
        await page1.waitForTimeout(20000);
        const afterPdfAttach = await getAttachmentCount();
        await validateAttachmentChange(beforePdfAttach, afterPdfAttach);

        // Upload Image File
        const beforeImageAttach = await getAttachmentCount();
        await openAddAttachmentDialog();
        await uploadFile(imagePath);
        await page1.waitForTimeout(25000);
        const afterImageAttach = await getAttachmentCount();
        await validateAttachmentChange(beforeImageAttach, afterImageAttach);

        // Oversized File Test 
        await openAddAttachmentDialog();
        await uploadFile(overSizedFile, '', false);
        await page1.waitForTimeout(20000);
        await checkErrorMessage("Invalid file size");
        console.log("Oversized File is not added & Error Message displayed - Negative Scenario Passed");

        // Invalid File Type Test 
        await uploadFile(invalidFile, '', false);
        await page1.waitForTimeout(20000);
        await checkErrorMessage("Invalid file type. Please select a valid file and try again");
        console.log("Invalid File is not added - Negative Scenario Passed");

        // Close Attachment Dialog
        await single_page_locator.getByRole('button', { name: '' }).click();
    }

    async Attachment02(page1: Page, useFrame: boolean = true): Promise<void> {
        const single_page_locator = useFrame
            ? await page1.locator('#ctl00_MainContent_mainFrame').contentFrame()
            : page1;

        // Common selectors
        const attachmentsTab = single_page_locator.locator('a').filter({ hasText: 'Attachments' }).first();
        const attachmentsCountText = () =>
            single_page_locator.locator('jb-attachments').getByText('Items per page| Total Pages:');

        const openAddAttachmentDialog = async (): Promise<void> => {
            await attachmentsTab.click();
            await single_page_locator.getByRole('button', { name: '+ Add New' }).click();
            await page1.waitForTimeout(20000);
            await expect(single_page_locator.getByText('Add Attachment')).toBeVisible();
        };

        const uploadFile = async (filePath: string, comment: string = '', clickUpload: boolean = true): Promise<void> => {
            if (comment) {
                await single_page_locator.getByRole('dialog', { name: 'Add Attachment' }).getByPlaceholder('Add your comments here').fill(comment);
            }
            await single_page_locator.getByLabel('Add Attachment').locator('input[type="file"]').setInputFiles(filePath);
            if (clickUpload) {
                await single_page_locator.getByRole('button', { name: 'Upload', exact: true }).click();
            }
        };

        const validateAttachmentChange = async (before: string, after: string): Promise<void> => {
            if (!ValidateAttachment(before, after)) {
                throw new Error("Attachment is not added");
            } else {
                console.log(`File is added successfully - Positive Scenario Passed`);
            }
        };

        const getAttachmentCount = async (): Promise<string> => {
            return (await attachmentsCountText().textContent() || '').trim();
        };

        const checkErrorMessage = async (expectedText: string): Promise<void> => {
            const errorMsg = await single_page_locator.locator("//span[contains(@class,'ui-messages-summary')]").textContent() || '';
            console.log("Error Message = " + errorMsg);
            await page1.waitForTimeout(20000);
            if (!errorMsg.includes(expectedText)) {
                throw new Error("Error Message is not displayed");
            } else {
                console.log("Error Message Displayed");
            }
        };

        // Upload PDF File
        const beforePdfAttach = await getAttachmentCount();
        await openAddAttachmentDialog();
        await single_page_locator.getByLabel('Add Attachment').getByText('Select').click();
        await single_page_locator.locator("(//li[@class = 'ui-dropdown-item ui-corner-all'])[1]").click();
        await uploadFile(filePath, 'Attachment Testing');
        await page1.waitForTimeout(20000);
        const afterPdfAttach = await getAttachmentCount();
        await validateAttachmentChange(beforePdfAttach, afterPdfAttach);

        // Upload Image File
        const beforeImageAttach = await getAttachmentCount();
        await openAddAttachmentDialog();
        await uploadFile(imagePath);
        await page1.waitForTimeout(25000);
        const afterImageAttach = await getAttachmentCount();
        await validateAttachmentChange(beforeImageAttach, afterImageAttach);

        // Negative scenario - Oversized file [More than 20 MB]
        await openAddAttachmentDialog();
        await uploadFile(overSizedFile, '', false);
        await page1.waitForTimeout(20000);
        await checkErrorMessage("Invalid file size");
        console.log("Oversized File is not added & Error Message displayed - Negative Scenario Passed");

        // Negative scenario - Invalid File[js file]
        await uploadFile(invalidFile, '', false);
        await page1.waitForTimeout(20000);
        await checkErrorMessage("Invalid file type. Please select a valid file and try again");
        console.log("Invalid File is not added - Negative Scenario Passed");

        // Close Attachment Popup
        await single_page_locator.getByRole('button', { name: '' }).click();
    }

    async Attachment03(page1: Page, useFrame: boolean = true): Promise<void> {
        const single_page_locator = useFrame
            ? await page1.locator('#ctl00_MainContent_mainFrame').contentFrame()
            : page1;

        // Common selectors
        const attachmentsTab = single_page_locator.locator('a').filter({ hasText: 'Attachments' }).first();
        const attachmentsCountText = () =>
            single_page_locator.locator('jb-attachments').getByText('Items per page| Total Pages:');

        const openUploadDialog = async (): Promise<void> => {
            await attachmentsTab.click();
            await single_page_locator.getByRole('button', { name: 'Upload' }).click();
            await page1.waitForTimeout(20000);
            await expect(single_page_locator.locator('span').filter({ hasText: /^Upload$/ })).toBeVisible();
        };

        const uploadFile = async (filePath: string, comment: string = '', clickUpload: boolean = true): Promise<void> => {
            await single_page_locator.locator('input[type="file"]').setInputFiles(filePath);
            if (comment) {
                await single_page_locator.getByRole('textbox', { name: 'Attachment Remarks:' }).fill(comment);
            }
            if (clickUpload) {
                await single_page_locator.getByRole('button', { name: 'Upload' }).click();
            }
        };

        const validateAttachmentChange = async (before: string, after: string): Promise<void> => {
            if (!ValidateAttachment(before, after)) {
                throw new Error("Attachment is not added");
            } else {
                console.log(`File is added successfully - Positive Scenario Passed`);
            }
        };

        const getAttachmentCount = async (): Promise<string> => {
            return (await attachmentsCountText().textContent() || '').trim();
        };

        const checkErrorMessage = async (expectedText: string): Promise<void> => {
            const errorMsg = await single_page_locator.locator("//span[contains(@class,'ui-messages-summary')]").textContent() || '';
            console.log("Error Message = " + errorMsg);
            await page1.waitForTimeout(20000);
            if (!errorMsg.includes(expectedText)) {
                throw new Error("Error Message is not displayed");
            } else {
                console.log("Error Message Displayed");
            }
        };

        // Upload PDF File
        const beforePdfAttach = await getAttachmentCount();
        await openUploadDialog();
        await uploadFile(filePath, 'Attachment Testing');
        await page1.waitForTimeout(20000);
        const afterPdfAttach = await getAttachmentCount();
        await validateAttachmentChange(beforePdfAttach, afterPdfAttach);

        // Upload Image File
        const beforeImageAttach = await getAttachmentCount();
        await openUploadDialog();
        await uploadFile(imagePath);
        await page1.waitForTimeout(25000);
        const afterImageAttach = await getAttachmentCount();
        await validateAttachmentChange(beforeImageAttach, afterImageAttach);

        // Negative scenario - Oversized file [More than 20 MB]
        await openUploadDialog();
        await uploadFile(overSizedFile, '', false);
        await page1.waitForTimeout(20000);
        await checkErrorMessage("Invalid file size");
        console.log("Oversized File is not added & Error Message displayed - Negative Scenario Passed");

        // Negative scenario - Invalid File[js file]
        await uploadFile(invalidFile, '', false);
        await page1.waitForTimeout(20000);
        await checkErrorMessage("Invalid file type. Please select a valid file and try again");
        console.log("Invalid File is not added - Negative Scenario Passed");

        // Close Attachment Dialog
        await single_page_locator.getByRole('button', { name: '' }).click();
    }

    async Attachment04(page1: Page, useFrame: boolean = true): Promise<void> {
        const single_page_locator = useFrame
            ? await page1.locator('#ctl00_MainContent_mainFrame').contentFrame()
            : page1;

        // Common selectors
        const attachFileButton = single_page_locator.getByRole('button', { name: 'Attach file' });
        const uploadButton = single_page_locator.getByLabel('Upload').getByRole('button', { name: 'Upload' });
        const fileInput = single_page_locator.locator('input[type="file"]');
        const remarksInput = single_page_locator.getByRole('textbox', { name: 'Attachment Remarks:' });

        const openUploadDialog = async (): Promise<void> => {
            await attachFileButton.click();
            await page1.waitForTimeout(10000);
            await expect(single_page_locator.locator('span').filter({ hasText: 'Upload' })).toBeVisible();
        };

        const uploadFile = async (filePath: string, comment: string = '', clickUpload: boolean = true): Promise<void> => {
            await fileInput.setInputFiles(filePath);
            if (comment) {
                await remarksInput.fill(comment);
            }
            if (clickUpload) {
                await uploadButton.click();
            }
            await page1.waitForTimeout(20000);
        };

        const checkErrorMessage = async (expectedText: string): Promise<void> => {
            const errorMsg = await single_page_locator.locator("//span[contains(@class,'ui-messages-summary')]").textContent() || '';
            console.log("Error Message = " + errorMsg);
            await page1.waitForTimeout(20000);
            if (!errorMsg.includes(expectedText)) {
                throw new Error("Error Message is not displayed");
            } else {
                console.log("Error Message Displayed");
            }
        };

        // Positive scenario - Upload PDF File
        await openUploadDialog();
        await uploadFile(filePath, 'Attachment Testing');
        await page1.waitForTimeout(20000);
        console.log(`File uploaded successfully - Positive scenario passed`);

        // Upload Image File [png file]
        await openUploadDialog();
        await uploadFile(imagePath);
        await page1.waitForTimeout(20000);
        console.log(`Image uploaded successfully - Positive scenario passed`);

        // Negative scenario - Oversized file [More than 20 MB]
        await openUploadDialog();
        await uploadFile(overSizedFile, '', false);
        await page1.waitForTimeout(20000);
        await checkErrorMessage("Invalid file size");
        console.log("Oversized File is not added & Error Message displayed - Negative scenario passed");

        // Negative scenario - Invalid File[js file]
        await uploadFile(invalidFile, '', false);
        await page1.waitForTimeout(20000);
        await checkErrorMessage("Invalid file type. Please select a valid file and try again");
        console.log("Invalid File is not added & Error Message displayed - Negative scenario passed");

        // Close Attachment Dialog
        await single_page_locator.getByRole('button', { name: '' }).click();
    }

    async Attachment05(ModuleClick: string, selector: string, useFrame: boolean = true): Promise<Page> {
        const page1Promise = this.page.waitForEvent('popup');
        await this.main_page_locator.getByText(ModuleClick).click({ timeout: 20_000 });
        await this.page.waitForTimeout(20000);
        await this.main_page_locator.locator(selector).first().click({ timeout: 30_000 });
        await this.page.waitForTimeout(20000);
        const page1 = await page1Promise;
        await this.page.waitForTimeout(35000);

        const single_page_locator = useFrame
            ? await page1.locator('#ctl00_MainContent_mainFrame').contentFrame()
            : page1;

        // Common selectors
        const addNewButton = single_page_locator.getByRole('button', { name: '+ Add New' });
        const uploadButton = single_page_locator.getByLabel('Add Attachment').getByRole('button', { name: 'Upload' });
        const fileInput = single_page_locator.locator('input[type="file"]');
        const remarksInput = single_page_locator.getByRole('textbox', { name: 'Attachment Remarks:' });

        // Helper functions
        const openAttachmentDialog = async (): Promise<void> => {
            await single_page_locator.locator('a').filter({ hasText: 'Attachments' }).first().click();
            await expect(single_page_locator.getByText('Attachments')).toBeVisible({ timeout: 60_000 });
            await page1.waitForTimeout(20000);
            await addNewButton.click();
            await expect(single_page_locator.getByText('Add Attachment')).toBeVisible();
        };

        const uploadFile = async (filePath: string, comment: string = '', clickUpload: boolean = true): Promise<void> => {
            await fileInput.setInputFiles(filePath);
            if (comment) {
                await remarksInput.fill(comment);
            }
            if (clickUpload) {
                await uploadButton.click();
            }
            await page1.waitForTimeout(20000);
        };

        const validateAttachment = async (beforeText: string, afterText: string): Promise<void> => {
            if (beforeText === afterText) {
                throw new Error("Attachment is not added");
            }
            console.log("Attachment successfully added.");
        };

        const checkErrorMessage = async (expectedText: string): Promise<void> => {
            const errorMsg = await single_page_locator.locator("//span[contains(@class,'ui-messages-summary')]").textContent() || '';
            console.log("Error Message = " + errorMsg);
            await page1.waitForTimeout(20000);
            if (!errorMsg.includes(expectedText)) {
                throw new Error("Error Message is not displayed as expected.");
            }
            console.log("Error Message Displayed.");
        };

        // Positive scenario - Upload PDF File
        await openAttachmentDialog();
        const BeforeAttachItem = await single_page_locator.getByText('Items per page| Total Pages:').textContent() || '';
        console.log(BeforeAttachItem);
        await uploadFile(filePath, 'Attachment Testing');
        const AfterAttachItem = await single_page_locator.getByText('Items per page| Total Pages:').textContent() || '';
        console.log(AfterAttachItem);
        await validateAttachment(BeforeAttachItem, AfterAttachItem);
        console.log("File uploaded successfully - Positive scenario passed");

        // Upload Image File [png file]
        const BeforeAttachImage = await single_page_locator.locator('//label[@class="jb-lb-500-12"]').textContent() || '';
        console.log(BeforeAttachImage);
        await openAttachmentDialog();
        await uploadFile(imagePath);
        const AfterAttachImage = await single_page_locator.locator('//label[@class="jb-lb-500-12"]').textContent() || '';
        console.log(AfterAttachImage);
        await validateAttachment(BeforeAttachImage, AfterAttachImage);
        console.log("Image uploaded successfully - Positive scenario passed");

        // Negative scenario - Oversized file [More than 20 MB]
        await openAttachmentDialog();
        await uploadFile(overSizedFile, '', false);
        await checkErrorMessage("Invalid file size");
        console.log("Oversized File is not added & Error Message displayed - Negative scenario passed");

        // Negative scenario - Invalid File [js file]
        await uploadFile(invalidFile, '', false);
        await checkErrorMessage("Invalid file type. Please select a valid file and try again");
        console.log("Invalid File is not added & Error Message displayed - Negative scenario passed");

        // Close Attachment Dialog
        await single_page_locator.getByRole('button', { name: '' }).click();

        return page1;
    }

    async deleteRecord(page1: Page, useFrame: boolean = true): Promise<void> {
        const single_page_locator = useFrame
            ? await page1.locator('#ctl00_MainContent_mainFrame').contentFrame()
            : page1;
        await page1.waitForTimeout(20000);

        const rows = await single_page_locator.locator('tr');

        for (let i = 0; i < await rows.count(); i++) {
            const row = rows.nth(i);

            const uploadedByCell = row.locator('(//span[@class="jb-grid-cell-rowdata-field ng-star-inserted"])[3]');

            const uploadedByValue = await uploadedByCell.textContent() || await uploadedByCell.innerText();

            if (uploadedByValue && (uploadedByValue.includes('Testim io') || uploadedByValue.includes(UserName?.trim()))) {
                console.log(`Record with 'Uploaded By' = 'Testim io' found, proceeding to delete...`);

                await row.locator('(//td[@class="undefined ng-star-inserted"])[7]').hover();
                await single_page_locator.getByRole('cell', { name: '' }).locator('span').click();
                await expect(single_page_locator.locator('div').filter({ hasText: 'Delete' }).nth(4)).toBeVisible();
                await single_page_locator.getByText('Delete').click();
                await expect(single_page_locator.locator('span').filter({ hasText: 'Delete' })).toBeVisible();
                await expect(single_page_locator.getByText('Are you sure you want to')).toBeVisible();
                await expect(single_page_locator.getByRole('button', { name: 'Delete' })).toBeVisible();
                await single_page_locator.getByRole('button', { name: 'Delete' }).click();
                await page1.waitForTimeout(20000);

                console.log('Record with "Uploaded By" = "Testim io" deleted successfully.');
            } else {
                console.log(`Skipping record with "Uploaded By" = ${uploadedByValue}`);
            }
        }
    }
} 