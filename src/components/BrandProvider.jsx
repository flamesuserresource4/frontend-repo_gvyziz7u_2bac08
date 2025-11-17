import { BRAND } from '../brand'

export default function BrandProvider({ children }){
  return (
    <div className="font-[var(--font-manrope)] bg-white text-neutral-900">
      {children}
    </div>
  )
}
