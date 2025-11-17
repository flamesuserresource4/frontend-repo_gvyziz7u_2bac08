import { BRAND } from '../brand'

export default function BrandProvider({ children }){
  return (
    <div className={`${BRAND.colors.bgLight || 'bg-white'} text-neutral-900`} style={{
      fontFamily: `${BRAND.fonts?.body || 'Inter'}, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`,
      // Expose CSS vars for headings
      ['--heading-font']: `${BRAND.fonts?.heading || 'Playfair Display'}, Georgia, 'Times New Roman', serif`,
      ['--body-font']: `${BRAND.fonts?.body || 'Inter'}, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif`,
    }}>
      {children}
    </div>
  )
}
