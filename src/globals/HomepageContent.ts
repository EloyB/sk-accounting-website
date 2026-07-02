import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../lib/revalidate'

export const HomepageContent: GlobalConfig = {
  slug: 'homepage-content',
  label: 'Homepage',
  hooks: {
    afterChange: [revalidateGlobal(['/'])],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'collapsible',
      label: 'Hero',
      fields: [
        { name: 'heroEyebrow', type: 'text', label: 'Labeltje boven titel', defaultValue: 'Boekhouding · Fiscaliteit · Advies' },
        {
          name: 'heroHeading',
          type: 'textarea',
          label: 'Titel',
          admin: { description: 'Regeleindes worden overgenomen. Laat leeg voor de standaardtitel.' },
        },
        { name: 'heroSubtext', type: 'textarea', label: 'Ondertekst' },
        { name: 'heroCtaLabel', type: 'text', label: 'Knop 1 (naar contact)', defaultValue: 'Maak een afspraak' },
        { name: 'heroCtaSecondaryLabel', type: 'text', label: 'Knop 2 (naar diensten)', defaultValue: 'Onze diensten' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Cijfers (balk onder hero)',
      fields: [
        { name: 'statYears', type: 'text', label: 'Cijfer 1', defaultValue: '15+', admin: { description: 'Bijv. "15+"' } },
        { name: 'statYearsLabel', type: 'text', label: 'Cijfer 1 — omschrijving', defaultValue: 'Jaar ervaring' },
        { name: 'statClients', type: 'text', label: 'Cijfer 2', defaultValue: '200+', admin: { description: 'Bijv. "200+"' } },
        { name: 'statClientsLabel', type: 'text', label: 'Cijfer 2 — omschrijving', defaultValue: 'Tevreden klanten' },
        { name: 'statThird', type: 'text', label: 'Cijfer 3', defaultValue: '100%' },
        { name: 'statThirdLabel', type: 'text', label: 'Cijfer 3 — omschrijving', defaultValue: 'Persoonlijke aanpak' },
      ],
    },
    {
      type: 'collapsible',
      label: 'Waarom SK Accounting? (Onze aanpak)',
      fields: [
        { name: 'aanpakLabel', type: 'text', label: 'Labeltje', defaultValue: 'Onze aanpak' },
        { name: 'aanpakHeading', type: 'text', label: 'Titel', defaultValue: 'Waarom SK Accounting?' },
        {
          name: 'aanpak',
          type: 'array',
          label: 'Punten',
          admin: { description: 'Laat leeg om de standaardpunten te tonen. Nummering gebeurt automatisch.' },
          fields: [
            { name: 'title', type: 'text', label: 'Titel', required: true },
            { name: 'description', type: 'textarea', label: 'Omschrijving', required: true },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Diensten (overzicht)',
      fields: [
        { name: 'dienstenLabel', type: 'text', label: 'Labeltje', defaultValue: 'Wat we doen' },
        { name: 'dienstenHeading', type: 'text', label: 'Titel', defaultValue: 'Onze diensten' },
        { name: 'dienstenLinkLabel', type: 'text', label: 'Link-tekst', defaultValue: 'Alle diensten' },
      ],
      admin: { description: 'De diensten zelf beheer je in de collectie "Services".' },
    },
    {
      type: 'collapsible',
      label: 'Team (teaser)',
      fields: [
        { name: 'teamLabel', type: 'text', label: 'Labeltje', defaultValue: 'Ons team' },
        {
          name: 'teamHeading',
          type: 'textarea',
          label: 'Titel',
          admin: { description: 'Regeleindes worden overgenomen. Laat leeg voor de standaardtitel.' },
        },
        { name: 'teamText', type: 'textarea', label: 'Tekst' },
        {
          name: 'teamBullets',
          type: 'array',
          label: 'Opsomming',
          admin: { description: 'Laat leeg om de standaardpunten te tonen.' },
          fields: [{ name: 'text', type: 'text', label: 'Punt', required: true }],
        },
        { name: 'teamLinkLabel', type: 'text', label: 'Link-tekst', defaultValue: 'Ontmoet ons team' },
      ],
      admin: { description: 'De teamleden zelf beheer je in de collectie "Team Members".' },
    },
    {
      type: 'collapsible',
      label: 'Oproep (CTA onderaan)',
      fields: [
        { name: 'ctaLabel', type: 'text', label: 'Labeltje', defaultValue: 'Neem contact op' },
        {
          name: 'ctaHeading',
          type: 'textarea',
          label: 'Titel',
          admin: { description: 'Regeleindes worden overgenomen. Laat leeg voor de standaardtitel.' },
        },
        { name: 'ctaText', type: 'textarea', label: 'Tekst' },
        { name: 'ctaPrimaryLabel', type: 'text', label: 'Knop 1 (naar contact)', defaultValue: 'Neem contact op' },
        { name: 'ctaSecondaryLabel', type: 'text', label: 'Knop 2 (naar diensten)', defaultValue: 'Onze diensten' },
      ],
    },
  ],
}
