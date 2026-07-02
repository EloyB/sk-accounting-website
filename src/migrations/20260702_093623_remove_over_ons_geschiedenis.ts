import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "over_ons_content_milestones" CASCADE;
  ALTER TABLE "over_ons_content" DROP COLUMN "geschiedenis_label";
  ALTER TABLE "over_ons_content" DROP COLUMN "geschiedenis_heading";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "over_ons_content_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"event" varchar NOT NULL
  );
  
  ALTER TABLE "over_ons_content" ADD COLUMN "geschiedenis_label" varchar DEFAULT 'Onze geschiedenis';
  ALTER TABLE "over_ons_content" ADD COLUMN "geschiedenis_heading" varchar DEFAULT 'Hoe we zijn gekomen waar we zijn';
  ALTER TABLE "over_ons_content_milestones" ADD CONSTRAINT "over_ons_content_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."over_ons_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "over_ons_content_milestones_order_idx" ON "over_ons_content_milestones" USING btree ("_order");
  CREATE INDEX "over_ons_content_milestones_parent_id_idx" ON "over_ons_content_milestones" USING btree ("_parent_id");`)
}
