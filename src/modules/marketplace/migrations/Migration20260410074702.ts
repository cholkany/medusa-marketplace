import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260410074702 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "chat_room" add column if not exists "product_id" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "chat_room" drop column if exists "product_id";`);
  }

}
