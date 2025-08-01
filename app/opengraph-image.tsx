import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'TÍO PELOTTE - Pastas Artesanales Frescas'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #FBE6D4 0%, #FECB89 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#8B4513',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          TÍO PELOTTE
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#5A3E1B',
            textAlign: 'center',
            fontStyle: 'italic',
          }}
        >
          Pastas Artesanales Frescas
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#6B4A2C',
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          Más de 30 años de tradición familiar
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}