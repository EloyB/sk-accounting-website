import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "homepage_content_team_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  ALTER TABLE "homepage_content" ALTER COLUMN "hero_cta_label" SET DEFAULT 'Maak een afspraak';
  ALTER TABLE "homepage_content" ALTER COLUMN "stat_years" SET DEFAULT '15+';
  ALTER TABLE "homepage_content" ALTER COLUMN "stat_clients" SET DEFAULT '200+';
  ALTER TABLE "homepage_content" ADD COLUMN "hero_eyebrow" varchar DEFAULT 'Boekhouding · Fiscaliteit · Advies';
  ALTER TABLE "homepage_content" ADD COLUMN "hero_cta_secondary_label" varchar DEFAULT 'Onze diensten';
  ALTER TABLE "homepage_content" ADD COLUMN "stat_years_label" varchar DEFAULT 'Jaar ervaring';
  ALTER TABLE "homepage_content" ADD COLUMN "stat_clients_label" varchar DEFAULT 'Tevreden klanten';
  ALTER TABLE "homepage_content" ADD COLUMN "stat_third" varchar DEFAULT '100%';
  ALTER TABLE "homepage_content" ADD COLUMN "stat_third_label" varchar DEFAULT 'Persoonlijke aanpak';
  ALTER TABLE "homepage_content" ADD COLUMN "diensten_label" varchar DEFAULT 'Wat we doen';
  ALTER TABLE "homepage_content" ADD COLUMN "diensten_heading" varchar DEFAULT 'Onze diensten';
  ALTER TABLE "homepage_content" ADD COLUMN "diensten_link_label" varchar DEFAULT 'Alle diensten';
  ALTER TABLE "homepage_content" ADD COLUMN "team_label" varchar DEFAULT 'Ons team';
  ALTER TABLE "homepage_content" ADD COLUMN "team_heading" varchar;
  ALTER TABLE "homepage_content" ADD COLUMN "team_text" varchar;
  ALTER TABLE "homepage_content" ADD COLUMN "team_link_label" varchar DEFAULT 'Ontmoet ons team';
  ALTER TABLE "homepage_content" ADD COLUMN "cta_label" varchar DEFAULT 'Neem contact op';
  ALTER TABLE "homepage_content" ADD COLUMN "cta_heading" varchar;
  ALTER TABLE "homepage_content" ADD COLUMN "cta_text" varchar;
  ALTER TABLE "homepage_content" ADD COLUMN "cta_primary_label" varchar DEFAULT 'Neem contact op';
  ALTER TABLE "homepage_content" ADD COLUMN "cta_secondary_label" varchar DEFAULT 'Onze diensten';
  ALTER TABLE "homepage_content_team_bullets" ADD CONSTRAINT "homepage_content_team_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "homepage_content_team_bullets_order_idx" ON "homepage_content_team_bullets" USING btree ("_order");
  CREATE INDEX "homepage_content_team_bullets_parent_id_idx" ON "homepage_content_team_bullets" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "homepage_content_team_bullets" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "homepage_content_team_bullets" CASCADE;
  ALTER TABLE "homepage_content" ALTER COLUMN "hero_cta_label" DROP DEFAULT;
  ALTER TABLE "homepage_content" ALTER COLUMN "stat_years" DROP DEFAULT;
  ALTER TABLE "homepage_content" ALTER COLUMN "stat_clients" DROP DEFAULT;
  ALTER TABLE "homepage_content" DROP COLUMN "hero_eyebrow";
  ALTER TABLE "homepage_content" DROP COLUMN "hero_cta_secondary_label";
  ALTER TABLE "homepage_content" DROP COLUMN "stat_years_label";
  ALTER TABLE "homepage_content" DROP COLUMN "stat_clients_label";
  ALTER TABLE "homepage_content" DROP COLUMN "stat_third";
  ALTER TABLE "homepage_content" DROP COLUMN "stat_third_label";
  ALTER TABLE "homepage_content" DROP COLUMN "diensten_label";
  ALTER TABLE "homepage_content" DROP COLUMN "diensten_heading";
  ALTER TABLE "homepage_content" DROP COLUMN "diensten_link_label";
  ALTER TABLE "homepage_content" DROP COLUMN "team_label";
  ALTER TABLE "homepage_content" DROP COLUMN "team_heading";
  ALTER TABLE "homepage_content" DROP COLUMN "team_text";
  ALTER TABLE "homepage_content" DROP COLUMN "team_link_label";
  ALTER TABLE "homepage_content" DROP COLUMN "cta_label";
  ALTER TABLE "homepage_content" DROP COLUMN "cta_heading";
  ALTER TABLE "homepage_content" DROP COLUMN "cta_text";
  ALTER TABLE "homepage_content" DROP COLUMN "cta_primary_label";
  ALTER TABLE "homepage_content" DROP COLUMN "cta_secondary_label";`)
}
