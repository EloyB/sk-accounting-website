'use client'

export default function AdminLogo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div style={{
        width: 32,
        height: 32,
        backgroundColor: '#034c22',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 400, letterSpacing: '0.05em' }}>
          SK
        </span>
      </div>
      <span style={{ color: '#034c22', fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 400, letterSpacing: '0.04em' }}>
        Accounting
      </span>
    </div>
  )
}
