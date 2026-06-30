import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/seo'

export const alt = 'SK Accounting — Boekhouding & fiscaal advies'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#034c22',
          backgroundImage:
            'radial-gradient(ellipse at 90% 5%, rgba(2,45,20,0.85) 0%, transparent 55%), radial-gradient(ellipse at 5% 95%, rgba(4,90,40,0.6) 0%, transparent 55%)',
          padding: '72px',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              backgroundColor: 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 26,
              letterSpacing: 3,
            }}
          >
            SK
          </div>
          <div style={{ color: '#fff', fontSize: 30, letterSpacing: 2 }}>{SITE_NAME}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: 56, height: 4, backgroundColor: '#b8965a', marginBottom: 28 }} />
          <div style={{ color: '#fff', fontSize: 72, lineHeight: 1.05, maxWidth: 900 }}>
            Boekhouding die werkt voor u
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: 30,
              marginTop: 24,
              fontFamily: 'sans-serif',
            }}
          >
            Boekhouding · Fiscaliteit · Advies voor zelfstandigen en kmo&apos;s
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
