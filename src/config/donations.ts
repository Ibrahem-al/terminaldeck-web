export const DONATION_LINKS = {
  buyMeACoffee: 'https://buymeacoffee.com/ibraA',
} as const

export const DONATION_TIERS = [
  { amount: 5,  label: 'Coffee',    description: 'Buy the developer a coffee' },
  { amount: 15, label: 'Supporter', description: 'Help cover hosting & tooling costs' },
  { amount: 30, label: 'Champion',  description: 'Fuel a week of feature development' },
] as const
