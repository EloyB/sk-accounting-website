import * as migration_20260408_182150 from './20260408_182150';
import * as migration_20260701_045915_over_ons_content_fields from './20260701_045915_over_ons_content_fields';

export const migrations = [
  {
    up: migration_20260408_182150.up,
    down: migration_20260408_182150.down,
    name: '20260408_182150',
  },
  {
    up: migration_20260701_045915_over_ons_content_fields.up,
    down: migration_20260701_045915_over_ons_content_fields.down,
    name: '20260701_045915_over_ons_content_fields'
  },
];
