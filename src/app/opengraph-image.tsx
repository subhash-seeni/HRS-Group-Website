import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'HRS Group — Ahmedabad';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E6E4DF',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '16px', height: '16px', backgroundColor: '#F58220' }} />
          <span
            style={{
              fontSize: '22px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#141414',
              fontWeight: 600,
            }}
          >
            HRS GROUP
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '52px',
              color: '#141414',
              lineHeight: 1.15,
            }}
          >
            Eight businesses, anchored in engineering, property and food.
          </div>
          <div style={{ fontSize: '22px', color: '#6B6B66' }}>
            Headquartered in Ahmedabad, Gujarat · Operating across Western and Southern India
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid #E6E4DF',
            paddingTop: '24px',
            fontSize: '18px',
            color: '#6B6B66',
          }}
        >
          <span>hrsgroup.in</span>
          <span>Built Environment · Food · Hospitality · Education · Services</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
