import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260410074048 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "chat_room" ("id" text not null, "customer_id" text not null, "vendor_id" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "chat_room_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_chat_room_vendor_id" ON "chat_room" ("vendor_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_chat_room_deleted_at" ON "chat_room" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`create table if not exists "chat_message" ("id" text not null, "room_id" text not null, "sender_type" text check ("sender_type" in ('customer', 'vendor')) not null, "sender_id" text not null, "text" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "chat_message_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_chat_message_room_id" ON "chat_message" ("room_id") WHERE deleted_at IS NULL;`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_chat_message_deleted_at" ON "chat_message" ("deleted_at") WHERE deleted_at IS NULL;`);

    this.addSql(`alter table if exists "chat_room" add constraint "chat_room_vendor_id_foreign" foreign key ("vendor_id") references "vendor" ("id") on update cascade;`);

    this.addSql(`alter table if exists "chat_message" add constraint "chat_message_room_id_foreign" foreign key ("room_id") references "chat_room" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "chat_message" drop constraint if exists "chat_message_room_id_foreign";`);

    this.addSql(`drop table if exists "chat_room" cascade;`);

    this.addSql(`drop table if exists "chat_message" cascade;`);
  }

}
