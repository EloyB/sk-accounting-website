import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const OverOnsContent: GlobalConfig = {
  slug: 'over-ons-content',
  label: 'Over ons — pagina',
  hooks: {
    afterChange: [revalidateGlobal(['/over-ons'])],
  },
  access: { read: () => true },
  fields: [
    {
      type: 'collapsible',
      label: 'Hero',
      fields: [
        { name: 'heroLabel', type: 'text', label: 'Labeltje boven titel', defaultValue: 'Over ons' },
        {
          name: 'heroHeading',
          type: 'textarea',
          label: 'Titel',
          admin: { description: 'Regeleindes worden overgenomen.' },
          defaultValue: 'Een kantoor gebouwd op vertrouwen',
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Ons verhaal',
      fields: [
        { name: 'onsVerhaalLabel', type: 'text', label: 'Labeltje', defaultValue: 'Ons verhaal' },
        { name: 'onsVerhaalTitle', type: 'text', label: 'Titel', defaultValue: 'Al meer dan 15 jaar uw partner in cijfers' },
        { name: 'onsVerhaalDescription', type: 'richText', label: 'Tekst' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Cijfers (balk)',
      fields: [
        {
          name: 'stats',
          type: 'array',
          label: 'Cijfers',
          admin: { description: 'Laat leeg om de standaardcijfers te tonen.' },
          fields: [
            { name: 'value', type: 'text', label: 'Waarde', required: true },
            { name: 'label', type: 'text', label: 'Omschrijving', required: true },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Onze waarden',
      fields: [
        { name: 'waardenLabel', type: 'text', label: 'Labeltje', defaultValue: 'Onze waarden' },
        { name: 'waardenHeading', type: 'text', label: 'Titel', defaultValue: 'Waar we voor staan' },
        {
          name: 'waarden',
          type: 'array',
          label: 'Waarden',
          admin: { description: 'Laat leeg om de standaardwaarden te tonen. Nummering gebeurt automatisch.' },
          fields: [
            { name: 'title', type: 'text', label: 'Titel', required: true },
            { name: 'description', type: 'textarea', label: 'Omschrijving', required: true },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Onze geschiedenis',
      fields: [
        { name: 'geschiedenisLabel', type: 'text', label: 'Labeltje', defaultValue: 'Onze geschiedenis' },
        { name: 'geschiedenisHeading', type: 'text', label: 'Titel', defaultValue: 'Hoe we zijn gekomen waar we zijn' },
        {
          name: 'milestones',
          type: 'array',
          label: 'Mijlpalen',
          admin: { description: 'Laat leeg om de standaard tijdlijn te tonen.' },
          fields: [
            { name: 'year', type: 'text', label: 'Jaar', required: true },
            { name: 'event', type: 'textarea', label: 'Gebeurtenis', required: true },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Oproep (CTA)',
      fields: [
        { name: 'ctaLabel', type: 'text', label: 'Labeltje', defaultValue: 'Maak kennis' },
        { name: 'ctaHeading', type: 'textarea', label: 'Titel', defaultValue: 'Benieuwd wat we voor u kunnen doen?' },
        {
          name: 'ctaText',
          type: 'textarea',
          label: 'Tekst',
          defaultValue:
            'Plan een vrijblijvend kennismakingsgesprek en ontdek hoe SK Accounting uw onderneming kan ondersteunen.',
        },
        { name: 'ctaPrimaryLabel', type: 'text', label: 'Knop 1', defaultValue: 'Neem contact op' },
        { name: 'ctaSecondaryLabel', type: 'text', label: 'Knop 2', defaultValue: 'Ontmoet ons team' },
      ],
    },
  ],
}
