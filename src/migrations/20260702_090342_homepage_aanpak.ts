import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "homepage_content_aanpak" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  ALTER TABLE "homepage_content" ADD COLUMN "aanpak_label" varchar DEFAULT 'Onze aanpak';
  ALTER TABLE "homepage_content" ADD COLUMN "aanpak_heading" varchar DEFAULT 'Waarom SK Accounting?';
  ALTER TABLE "homepage_content_aanpak" ADD CONSTRAINT "homepage_content_aanpak_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_content_aanpak_order_idx" ON "homepage_content_aanpak" USING btree ("_order");
  CREATE INDEX "homepage_content_aanpak_parent_id_idx" ON "homepage_content_aanpak" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_content_aanpak" CASCADE;
  ALTER TABLE "homepage_content" DROP COLUMN "aanpak_label";
  ALTER TABLE "homepage_content" DROP COLUMN "aanpak_heading";`)
}
