import { revalidatePath } from 'next/cache'
import type { GlobalAfterChangeHook, CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

/**
 * Revalidate the given frontend paths after content changes in Payload.
 *
 * Pages fetch their data via the Payload local API in server components, which
 * means Next renders them statically. Without revalidation those static pages
 * never reflect CMS edits. These hooks bust the cache on save/delete so changes
 * appear immediately.
 *
 * Pass `'/'` together with `{ layout: true }` when a change affects the shared
 * layout (header/footer) so every route picks it up.
 */
function revalidate(paths: string[], opts?: { layout?: boolean }) {
  for (const path of paths) {
    if (opts?.layout && path === '/') {
      revalidatePath('/', 'layout')
    } else {
      revalidatePath(path)
    }
  }
}

export function revalidateGlobal(paths: string[], opts?: { layout?: boolean }): GlobalAfterChangeHook {
  return ({ doc }) => {
    revalidate(paths, opts)
    return doc
  }
}

export function revalidateCollectionChange(paths: string[]): CollectionAfterChangeHook {
  return ({ doc }) => {
    revalidate(paths)
    return doc
  }
}

export function revalidateCollectionDelete(paths: string[]): CollectionAfterDeleteHook {
  return ({ doc }) => {
    revalidate(paths)
    return doc
  }
}
