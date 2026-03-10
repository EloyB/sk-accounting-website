'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function submitContactForm(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const name    = (formData.get('name')    as string | null)?.trim()
  const email   = (formData.get('email')   as string | null)?.trim()
  const phone   = (formData.get('phone')   as string | null)?.trim()
  const message = (formData.get('message') as string | null)?.trim()

  if (!name || !email || !message) {
    return { status: 'error', message: 'Vul alle verplichte velden in.' }
  }

  try {
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'contact-submissions',
      data: { name, email, phone: phone || undefined, message },
    })
    return { status: 'success' }
  } catch {
    return { status: 'error', message: 'Er is iets misgegaan. Probeer het later opnieuw.' }
  }
}
