import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "over_ons_content_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "over_ons_content_waarden" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "over_ons_content_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar NOT NULL,
  	"event" varchar NOT NULL
  );
  
  ALTER TABLE "over_ons_content" ALTER COLUMN "ons_verhaal_title" SET DEFAULT 'Al meer dan 15 jaar uw partner in cijfers';
  ALTER TABLE "over_ons_content" ADD COLUMN "hero_label" varchar DEFAULT 'Over ons';
  ALTER TABLE "over_ons_content" ADD COLUMN "hero_heading" varchar DEFAULT 'Een kantoor gebouwd op vertrouwen';
  ALTER TABLE "over_ons_content" ADD COLUMN "ons_verhaal_label" varchar DEFAULT 'Ons verhaal';
  ALTER TABLE "over_ons_content" ADD COLUMN "waarden_label" varchar DEFAULT 'Onze waarden';
  ALTER TABLE "over_ons_content" ADD COLUMN "waarden_heading" varchar DEFAULT 'Waar we voor staan';
  ALTER TABLE "over_ons_content" ADD COLUMN "geschiedenis_label" varchar DEFAULT 'Onze geschiedenis';
  ALTER TABLE "over_ons_content" ADD COLUMN "geschiedenis_heading" varchar DEFAULT 'Hoe we zijn gekomen waar we zijn';
  ALTER TABLE "over_ons_content" ADD COLUMN "cta_label" varchar DEFAULT 'Maak kennis';
  ALTER TABLE "over_ons_content" ADD COLUMN "cta_heading" varchar DEFAULT 'Benieuwd wat we voor u kunnen doen?';
  ALTER TABLE "over_ons_content" ADD COLUMN "cta_text" varchar DEFAULT 'Plan een vrijblijvend kennismakingsgesprek en ontdek hoe SK Accounting uw onderneming kan ondersteunen.';
  ALTER TABLE "over_ons_content" ADD COLUMN "cta_primary_label" varchar DEFAULT 'Neem contact op';
  ALTER TABLE "over_ons_content" ADD COLUMN "cta_secondary_label" varchar DEFAULT 'Ontmoet ons team';
  ALTER TABLE "over_ons_content_stats" ADD CONSTRAINT "over_ons_content_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."over_ons_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "over_ons_content_waarden" ADD CONSTRAINT "over_ons_content_waarden_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."over_ons_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "over_ons_content_milestones" ADD CONSTRAINT "over_ons_content_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."over_ons_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "over_ons_content_stats_order_idx" ON "over_ons_content_stats" USING btree ("_order");
  CREATE INDEX "over_ons_content_stats_parent_id_idx" ON "over_ons_content_stats" USING btree ("_parent_id");
  CREATE INDEX "over_ons_content_waarden_order_idx" ON "over_ons_content_waarden" USING btree ("_order");
  CREATE INDEX "over_ons_content_waarden_parent_id_idx" ON "over_ons_content_waarden" USING btree ("_parent_id");
  CREATE INDEX "over_ons_content_milestones_order_idx" ON "over_ons_content_milestones" USING btree ("_order");
  CREATE INDEX "over_ons_content_milestones_parent_id_idx" ON "over_ons_content_milestones" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "over_ons_content_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "over_ons_content_waarden" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "over_ons_content_milestones" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "over_ons_content_stats" CASCADE;
  DROP TABLE "over_ons_content_waarden" CASCADE;
  DROP TABLE "over_ons_content_milestones" CASCADE;
  ALTER TABLE "over_ons_content" ALTER COLUMN "ons_verhaal_title" DROP DEFAULT;
  ALTER TABLE "over_ons_content" DROP COLUMN "hero_label";
  ALTER TABLE "over_ons_content" DROP COLUMN "hero_heading";
  ALTER TABLE "over_ons_content" DROP COLUMN "ons_verhaal_label";
  ALTER TABLE "over_ons_content" DROP COLUMN "waarden_label";
  ALTER TABLE "over_ons_content" DROP COLUMN "waarden_heading";
  ALTER TABLE "over_ons_content" DROP COLUMN "geschiedenis_label";
  ALTER TABLE "over_ons_content" DROP COLUMN "geschiedenis_heading";
  ALTER TABLE "over_ons_content" DROP COLUMN "cta_label";
  ALTER TABLE "over_ons_content" DROP COLUMN "cta_heading";
  ALTER TABLE "over_ons_content" DROP COLUMN "cta_text";
  ALTER TABLE "over_ons_content" DROP COLUMN "cta_primary_label";
  ALTER TABLE "over_ons_content" DROP COLUMN "cta_secondary_label";`)
}
