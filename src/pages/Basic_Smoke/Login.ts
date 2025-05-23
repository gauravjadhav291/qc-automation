import { Page, expect } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private wait: Promise<void>;
  private username_txtbox: any;
  private sso_user_txtbox: any;
  private password_txtbox: any;
  private Login_btn: any;
  private nextbtn: any;
  private signbtn: any;
  private yesbtn: any;
  private keyboard_arrow_down_locator: any;
  private username_locator: any;
  private enter_password_locator: any;
  private login_locator: any;
  private notification_locator: any;
  private notification_locator_office: any;
  constructor(page: Page) {
    this.page = page;
    this.wait = this.page.waitForTimeout(15000);
    this.username_txtbox = page.getByPlaceholder('Enter Username Or Email');
    this.sso_user_txtbox = page.getByPlaceholder('someone@example.com');
    this.password_txtbox = page.getByPlaceholder('Password');
    this.Login_btn = page.getByRole('button', { name: 'Yes' });
    this.nextbtn = page.getByRole('button', { name: 'Next' });
    this.signbtn = page.getByRole('button', { name: 'Sign in' });
    this.yesbtn = page.getByRole('button', { name: 'Yes' });
    this.keyboard_arrow_down_locator = this.page.getByRole('button', { name: 'keyboard_arrow_down' });
    this.username_locator = this.page.getByText(process.env.Vessel_user_id as string);
    this.enter_password_locator = this.page.getByPlaceholder('Enter password');
    this.login_locator = this.page.getByRole('button', { name: 'Login' });
    this.notification_locator_office = this.page.getByTitle('Notification');
    this.notification_locator = this.page.locator('.jibe-notification').first();
  }

  async login(username: string, Password: string): Promise<void> {
    await this.page.goto(process.env.BASE_URL as string);
    await this.username_txtbox.click();
    await this.username_txtbox.fill(username);
    await this.nextbtn.click();
    await this.sso_user_txtbox.click();
    await this.sso_user_txtbox.fill(username);
    await this.nextbtn.click();
    await this.password_txtbox.fill(Password);
    await this.signbtn.click();
    await this.yesbtn.click();
    await expect.soft(this.notification_locator_office).toBeVisible({timeout:60000});
    console.log(`----Login successful! Welcome to your dashboard.----`);
  }

  async Vessel_login(): Promise<void> {
    await this.page.goto(process.env.Vessel_BASE_URL as string);
    await this.keyboard_arrow_down_locator.click();
    await this.username_locator.click();
    await this.enter_password_locator.click();
    await this.enter_password_locator.type(process.env.Vessel_password);
    await this.login_locator.click();
    await expect(this.notification_locator).toBeVisible({timeout:60000});
    console.log(`----${process.env.live_Vessel} Vessel Login successful! Welcome to your dashboard.----`);
  }
} 