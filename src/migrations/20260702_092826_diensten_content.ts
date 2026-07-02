import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "diensten_content_pijlers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "diensten_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"werkwijze_label" varchar DEFAULT 'Werkwijze',
  	"werkwijze_heading" varchar DEFAULT 'Hoe wij werken',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "diensten_content_pijlers" ADD CONSTRAINT "diensten_content_pijlers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."diensten_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "diensten_content_pijlers_order_idx" ON "diensten_content_pijlers" USING btree ("_order");
  CREATE INDEX "diensten_content_pijlers_parent_id_idx" ON "diensten_content_pijlers" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "diensten_content_pijlers" CASCADE;
  DROP TABLE "diensten_content" CASCADE;`)
}
