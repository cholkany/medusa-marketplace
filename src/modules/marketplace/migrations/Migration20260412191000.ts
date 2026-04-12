import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260412191000 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`
      alter table if exists "vendor"
        add column if not exists "description" text null,
        add column if not exists "category" text null,
        add column if not exists "instagram" text null,
        add column if not exists "twitter" text null,
        add column if not exists "facebook" text null,
        add column if not exists "website" text null,
        add column if not exists "contact_email" text null,
        add column if not exists "contact_phone" text null,
        add column if not exists "address" text null,
        add column if not exists "city" text null,
        add column if not exists "country" text null,
        add column if not exists "return_policy" text null,
        add column if not exists "shipping_policy" text null,
        add column if not exists "privacy_policy" text null;
    `);
  }

  override async down(): Promise<void> {
    this.addSql(`
      alter table if exists "vendor"
        drop column if exists "description",
        drop column if exists "category",
        drop column if exists "instagram",
        drop column if exists "twitter",
        drop column if exists "facebook",
        drop column if exists "website",
        drop column if exists "contact_email",
        drop column if exists "contact_phone",
        drop column if exists "address",
        drop column if exists "city",
        drop column if exists "country",
        drop column if exists "return_policy",
        drop column if exists "shipping_policy",
        drop column if exists "privacy_policy";
    `);
  }

}
