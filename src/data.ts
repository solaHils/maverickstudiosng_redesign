export const SITE = {
  // Real contact details live in .env (not committed). See .env.example.
  email: (import.meta.env.VITE_CONTACT_EMAIL as string | undefined) ?? 'hello@example.com',
  phones: ((import.meta.env.VITE_CONTACT_PHONES as string | undefined) ?? '+234 000 000 0000')
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean),
  location: 'Lagos, Nigeria',
  instagram: 'https://www.instagram.com/dmavericksng/',
  youtube: 'https://www.youtube.com/MaverickStudiosNG/videos',
}

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export interface Project {
  title: string
  kind: string
  img: string
  url: string
}

export const PROJECTS: Project[] = [
  { title: 'Magical Viva, Part 3', kind: 'Animated series · 3D', img: '/img/port_viva3.jpg', url: 'https://www.youtube.com/watch?v=kmPK87BPhJY' },
  { title: 'Viva Clean Up Nigeria', kind: 'Public awareness · 3D animation', img: '/img/port_viva-cleanup.jpg', url: 'https://www.youtube.com/watch?v=yMAB09u4vz0' },
  { title: '3D Character Hair Groom', kind: 'Character study · 3D', img: '/img/port_hair-groom.jpg', url: 'https://www.youtube.com/watch?v=yKLBtPH7-FU' },
  { title: 'Total Lubricant', kind: 'Commercial · 3D animation', img: '/img/port_19.jpg', url: 'https://www.youtube.com/watch?v=S6JrVMMDhF0' },
  { title: 'FirstBank', kind: 'Brand film · Motion', img: '/img/port_23.jpg', url: 'https://www.youtube.com/watch?v=rBm0OlDfK34' },
  { title: 'MyTradebook', kind: 'Product story · 3D', img: '/img/port_18.jpg', url: 'https://www.youtube.com/watch?v=xwZXy4dov6M' },
  { title: 'Adaba', kind: 'Character animation', img: '/img/port_21.jpg', url: 'https://www.youtube.com/watch?v=ryj6hzFhAiw' },
  { title: 'Mr Chef', kind: 'Commercial · VFX', img: '/img/port_20.jpg', url: 'https://www.youtube.com/watch?v=TXVp0lYfV3g' },
  { title: 'Chocolove', kind: 'Commercial · 3D', img: '/img/port_22.jpg', url: 'https://www.youtube.com/watch?v=P-9tp6UKNSw' },
  { title: 'KankpeCloud', kind: 'Explainer · Motion design', img: '/img/port_16.jpg', url: 'https://www.youtube.com/watch?v=AyUdKKmjuv8' },
  { title: 'CliqLite', kind: 'Brand film · Animation', img: '/img/port_12.jpg', url: 'https://www.youtube.com/watch?v=GLONvmOC7pM' },
]

export const SERVICES = ['3D Animation', 'Visual Effects', 'Motion Design', 'Creative Direction']

export const TEAM = [
  { name: 'Oluwatoyin Adeosun', role: 'CEO & CG Artist', img: '/img/tri.jpg' },
  { name: 'Khunmie', role: '3D Model Artist & Brand Manager', img: '/img/khunmie.jpg' },
  { name: 'Muyiwa', role: 'VFX Specialist', img: '/img/mie.jpg' },
]
