import * as migration_20260408_182150 from './20260408_182150';
import * as migration_20260701_045915_over_ons_content_fields from './20260701_045915_over_ons_content_fields';
import * as migration_20260702_090342_homepage_aanpak from './20260702_090342_homepage_aanpak';
import * as migration_20260702_092826_diensten_content from './20260702_092826_diensten_content';
import * as migration_20260702_093623_remove_over_ons_geschiedenis from './20260702_093623_remove_over_ons_geschiedenis';
import * as migration_20260702_094229_homepage_all_sections from './20260702_094229_homepage_all_sections';

export const migrations = [
  {
    up: migration_20260408_182150.up,
    down: migration_20260408_182150.down,
    name: '20260408_182150',
  },
  {
    up: migration_20260701_045915_over_ons_content_fields.up,
    down: migration_20260701_045915_over_ons_content_fields.down,
    name: '20260701_045915_over_ons_content_fields',
  },
  {
    up: migration_20260702_090342_homepage_aanpak.up,
    down: migration_20260702_090342_homepage_aanpak.down,
    name: '20260702_090342_homepage_aanpak',
  },
  {
    up: migration_20260702_092826_diensten_content.up,
    down: migration_20260702_092826_diensten_content.down,
    name: '20260702_092826_diensten_content',
  },
  {
    up: migration_20260702_093623_remove_over_ons_geschiedenis.up,
    down: migration_20260702_093623_remove_over_ons_geschiedenis.down,
    name: '20260702_093623_remove_over_ons_geschiedenis',
  },
  {
    up: migration_20260702_094229_homepage_all_sections.up,
    down: migration_20260702_094229_homepage_all_sections.down,
    name: '20260702_094229_homepage_all_sections'
  },
];
