// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type ItineraryItem = {
  id: string
  type: 'flight' | 'hotel' | 'dining' | 'activity' | 'mobility'
  title: string
  subtitle: string
  time: string
  duration?: string
  cost: number
  currency: string
  status: 'confirmed' | 'pending' | 'flexible'
  location?: string
  notes?: string
}

export type ItineraryDay = {
  day: number
  date: string
  items: ItineraryItem[]
}

export type Trip = {
  id: string
  title: string
  destination: string
  country: string
  image: string
  dates: { start: string; end: string }
  budget: { total: number; spent: number; currency: string }
  status: 'upcoming' | 'active' | 'completed' | 'draft'
  travelers: number
  isGroup: boolean
  isGift: boolean
  itinerary: ItineraryDay[]
}

export type Gift = {
  id: string
  tripTitle: string
  destination: string
  image: string
  from: string
  to: string
  occasion: string
  amount: number
  currency: string
  status: 'purchased' | 'delivered' | 'activated' | 'redeemed'
  purchaseDate: string
  activationDate?: string
  message: string
}

export type GroupMember = {
  id: string
  name: string
  avatar: string
  role: 'organizer' | 'member' | 'contributor'
  contributed: number
}

export type RegistryItem = {
  id: string
  day: number
  location: string
  category: string
  description: string
  cost: number
  purchaser?: string
  message?: string
  funded: boolean
}

export type GroupTrip = {
  id: string
  tripId: string
  name: string
  organizer: string
  members: GroupMember[]
  registry: RegistryItem[]
  totalContributed: number
  totalGoal: number
  currency: string
}

export type User = {
  name: string
  email: string
  avatar: string
  isPremium: boolean
  tripsCompleted: number
  memberSince: string
  preferences: {
    currency: string
    dietaryRestrictions: string[]
    travelStyle: string
    budgetRange: string
  }
}

export type PremiumPlan = {
  name: string
  price: number
  currency: string
  period: string
  features: string[]
  highlighted: boolean
}

export type Notification = {
  id: string
  type: 'booking' | 'price' | 'trip' | 'group' | 'gift' | 'system'
  title: string
  message: string
  time: string
  read: boolean
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock Trips
// ─────────────────────────────────────────────────────────────────────────────

export const mockTrips: Trip[] = [
  // ── 1. Lisbon Honeymoon (group / upcoming) ────────────────────────────────
  {
    id: 'trip-lisbon-001',
    title: 'Lisbon Honeymoon',
    destination: 'Lisbon',
    country: 'Portugal',
    image: 'https://picsum.photos/seed/lisbon/800/500',
    dates: { start: '2026-09-12', end: '2026-09-16' },
    budget: { total: 3800, spent: 1240, currency: 'EUR' },
    status: 'upcoming',
    travelers: 2,
    isGroup: true,
    isGift: false,
    itinerary: [
      {
        day: 1,
        date: '2026-09-12',
        items: [
          {
            id: 'li-d1-1',
            type: 'flight',
            title: 'TAP Air Portugal TP1326',
            subtitle: 'Zagreb (ZAG) → Lisbon (LIS)',
            time: '07:20',
            duration: '3h 40m',
            cost: 312,
            currency: 'EUR',
            status: 'confirmed',
            location: 'Zagreb Airport, Terminal D',
            notes: 'Check-in closes 45 min before departure. Seats 14A & 14B.',
          },
          {
            id: 'li-d1-2',
            type: 'mobility',
            title: 'Aerobus to City Centre',
            subtitle: 'LIS Airport → Marquês de Pombal',
            time: '11:30',
            duration: '35m',
            cost: 8,
            currency: 'EUR',
            status: 'flexible',
            location: 'Lisbon Humberto Delgado Airport',
          },
          {
            id: 'li-d1-3',
            type: 'hotel',
            title: 'Bairro Alto Hotel',
            subtitle: 'Check-in · Deluxe River View Room',
            time: '14:00',
            duration: '4 nights',
            cost: 920,
            currency: 'EUR',
            status: 'confirmed',
            location: 'Praça Luís de Camões 2, Chiado',
            notes:
              'Early check-in requested. Honeymoon package confirmed — champagne & flowers on arrival.',
          },
          {
            id: 'li-d1-4',
            type: 'dining',
            title: 'Solar dos Presuntos',
            subtitle: 'Traditional Portuguese dinner',
            time: '20:00',
            duration: '2h',
            cost: 95,
            currency: 'EUR',
            status: 'confirmed',
            location: 'R. das Portas de Santo Antão 150, Baixa',
            notes: 'Reservation for 2. Try the bacalhau à Brás and ginjinha digestif.',
          },
          {
            id: 'li-d1-5',
            type: 'activity',
            title: 'Fado Show at Clube de Fado',
            subtitle: 'Live traditional Fado performance',
            time: '22:30',
            duration: '1h 30m',
            cost: 60,
            currency: 'EUR',
            status: 'confirmed',
            location: 'R. de S. João da Praça 92, Alfama',
            notes: 'Tickets pre-purchased. No cameras during performance.',
          },
        ],
      },
      {
        day: 2,
        date: '2026-09-13',
        items: [
          {
            id: 'li-d2-1',
            type: 'activity',
            title: 'Sintra Day Trip',
            subtitle: 'Pena Palace + Moorish Castle tour',
            time: '09:00',
            duration: '8h',
            cost: 120,
            currency: 'EUR',
            status: 'confirmed',
            location: 'Departure from Rossio Station',
            notes: 'Private guide included. Bring sunscreen and comfortable shoes.',
          },
          {
            id: 'li-d2-2',
            type: 'dining',
            title: 'Tascas do Chico',
            subtitle: 'Lunch in Sintra village',
            time: '13:00',
            duration: '1h 15m',
            cost: 48,
            currency: 'EUR',
            status: 'flexible',
            location: 'Volta do Duche 68, Sintra',
          },
          {
            id: 'li-d2-3',
            type: 'activity',
            title: 'Cabo da Roca Sunset',
            subtitle: 'Westernmost point of mainland Europe',
            time: '18:30',
            duration: '1h',
            cost: 0,
            currency: 'EUR',
            status: 'flexible',
            location: 'Cabo da Roca, Sintra-Cascais Natural Park',
          },
          {
            id: 'li-d2-4',
            type: 'dining',
            title: 'Cervejaria Ramiro',
            subtitle: 'Seafood dinner — lobster & clams',
            time: '20:30',
            duration: '2h',
            cost: 130,
            currency: 'EUR',
            status: 'pending',
            location: 'Av. Almirante Reis 1, Lisbon',
            notes: 'Walk-in only. Expect 20–30 min wait on weekends.',
          },
        ],
      },
      {
        day: 3,
        date: '2026-09-14',
        items: [
          {
            id: 'li-d3-1',
            type: 'activity',
            title: 'Belém Tower & Jerónimos Monastery',
            subtitle: 'UNESCO World Heritage morning tour',
            time: '10:00',
            duration: '3h',
            cost: 24,
            currency: 'EUR',
            status: 'confirmed',
            location: 'Av. Brasília, Belém',
          },
          {
            id: 'li-d3-2',
            type: 'dining',
            title: 'Pastéis de Belém',
            subtitle: 'Original pastel de nata since 1837',
            time: '13:15',
            duration: '30m',
            cost: 12,
            currency: 'EUR',
            status: 'flexible',
            location: 'R. de Belém 84-92, Belém',
          },
          {
            id: 'li-d3-3',
            type: 'activity',
            title: 'Tuk-Tuk City Tour',
            subtitle: 'Alfama, Mouraria & Miradouros',
            time: '15:00',
            duration: '2h',
            cost: 70,
            currency: 'EUR',
            status: 'confirmed',
            location: 'Meet at Praça do Comércio',
          },
          {
            id: 'li-d3-4',
            type: 'dining',
            title: 'Alma Restaurant',
            subtitle: 'Fine dining — Chef Henrique Sá Pessoa',
            time: '20:00',
            duration: '2h 30m',
            cost: 210,
            currency: 'EUR',
            status: 'confirmed',
            location: 'R. Anchieta 15, Chiado',
            notes: 'Tasting menu for 2 with wine pairing. Smart casual dress code.',
          },
        ],
      },
      {
        day: 4,
        date: '2026-09-15',
        items: [
          {
            id: 'li-d4-1',
            type: 'activity',
            title: 'Douro Valley Wine Tour',
            subtitle: 'Private car + 2 quinta visits + tasting',
            time: '08:30',
            duration: '10h',
            cost: 290,
            currency: 'EUR',
            status: 'pending',
            location: 'Pick-up at Bairro Alto Hotel',
            notes: 'Includes lunch at Quinta do Crasto. Confirmation expected by Sept 1.',
          },
          {
            id: 'li-d4-2',
            type: 'dining',
            title: 'LX Factory Night Market',
            subtitle: 'Street food, crafts & live music',
            time: '20:00',
            duration: '2h',
            cost: 35,
            currency: 'EUR',
            status: 'flexible',
            location: 'Rua Rodrigues de Faria 103, Alcântara',
          },
        ],
      },
      {
        day: 5,
        date: '2026-09-16',
        items: [
          {
            id: 'li-d5-1',
            type: 'hotel',
            title: 'Bairro Alto Hotel',
            subtitle: 'Check-out',
            time: '11:00',
            cost: 0,
            currency: 'EUR',
            status: 'confirmed',
            location: 'Praça Luís de Camões 2, Chiado',
          },
          {
            id: 'li-d5-2',
            type: 'dining',
            title: 'Brunch at Copenhagen Coffee Lab',
            subtitle: 'Specialty coffee & avocado toast',
            time: '11:30',
            duration: '1h',
            cost: 28,
            currency: 'EUR',
            status: 'flexible',
            location: 'R. Nova da Piedade 10, Príncipe Real',
          },
          {
            id: 'li-d5-3',
            type: 'mobility',
            title: 'Bolt Ride to Airport',
            subtitle: 'Hotel → LIS Humberto Delgado',
            time: '14:30',
            duration: '25m',
            cost: 18,
            currency: 'EUR',
            status: 'flexible',
          },
          {
            id: 'li-d5-4',
            type: 'flight',
            title: 'TAP Air Portugal TP1327',
            subtitle: 'Lisbon (LIS) → Zagreb (ZAG)',
            time: '17:10',
            duration: '3h 30m',
            cost: 298,
            currency: 'EUR',
            status: 'confirmed',
            location: 'LIS Terminal 1, Gate 32',
            notes: 'Online check-in opens 36h before departure.',
          },
        ],
      },
    ],
  },

  // ── 2. Barcelona Weekend (solo / active) ─────────────────────────────────
  {
    id: 'trip-barcelona-002',
    title: 'Barcelona Weekend',
    destination: 'Barcelona',
    country: 'Spain',
    image: 'https://picsum.photos/seed/barcelona/800/500',
    dates: { start: '2026-05-15', end: '2026-05-18' },
    budget: { total: 900, spent: 640, currency: 'EUR' },
    status: 'active',
    travelers: 1,
    isGroup: false,
    isGift: false,
    itinerary: [
      {
        day: 1,
        date: '2026-05-15',
        items: [
          {
            id: 'bc-d1-1',
            type: 'flight',
            title: 'Vueling VY1344',
            subtitle: 'Zagreb (ZAG) → Barcelona (BCN)',
            time: '06:45',
            duration: '2h 10m',
            cost: 89,
            currency: 'EUR',
            status: 'confirmed',
            location: 'Zagreb Airport, Terminal A',
          },
          {
            id: 'bc-d1-2',
            type: 'mobility',
            title: 'Aerobús',
            subtitle: 'BCN Airport T1 → Plaça Catalunya',
            time: '09:20',
            duration: '40m',
            cost: 6,
            currency: 'EUR',
            status: 'flexible',
          },
          {
            id: 'bc-d1-3',
            type: 'hotel',
            title: 'Hotel Arts Barcelona',
            subtitle: 'Check-in · Superior Sea View Room',
            time: '14:00',
            duration: '3 nights',
            cost: 420,
            currency: 'EUR',
            status: 'confirmed',
            location: 'Carrer de la Marina 19-21, Barceloneta',
          },
          {
            id: 'bc-d1-4',
            type: 'activity',
            title: 'La Sagrada Família',
            subtitle: 'Skip-the-line tower access ticket',
            time: '16:00',
            duration: '2h',
            cost: 36,
            currency: 'EUR',
            status: 'confirmed',
            location: 'Carrer de Mallorca 401, Eixample',
          },
          {
            id: 'bc-d1-5',
            type: 'dining',
            title: 'El Xampanyet',
            subtitle: 'Tapas & cava in El Born',
            time: '20:30',
            duration: '1h 30m',
            cost: 42,
            currency: 'EUR',
            status: 'confirmed',
            location: 'Carrer de Montcada 22, El Born',
          },
        ],
      },
      {
        day: 2,
        date: '2026-05-16',
        items: [
          {
            id: 'bc-d2-1',
            type: 'activity',
            title: 'Park Güell Morning Visit',
            subtitle: 'Monumental Zone timed entry',
            time: '09:00',
            duration: '2h',
            cost: 10,
            currency: 'EUR',
            status: 'confirmed',
            location: "Carrer d'Olot 5, Gràcia",
          },
          {
            id: 'bc-d2-2',
            type: 'dining',
            title: 'Bar Electricitat',
            subtitle: 'Vermut & pintxos brunch',
            time: '11:30',
            duration: '1h',
            cost: 22,
            currency: 'EUR',
            status: 'flexible',
            location: 'Carrer de Sant Carles 15, Barceloneta',
          },
          {
            id: 'bc-d2-3',
            type: 'activity',
            title: 'Picasso Museum',
            subtitle: 'Permanent collection + temporary exhibition',
            time: '14:00',
            duration: '2h 30m',
            cost: 14,
            currency: 'EUR',
            status: 'confirmed',
            location: 'Carrer de Montcada 15-23, El Born',
          },
          {
            id: 'bc-d2-4',
            type: 'dining',
            title: 'Disfrutar',
            subtitle: 'Avant-garde tasting menu (2 Michelin stars)',
            time: '21:00',
            duration: '3h',
            cost: 185,
            currency: 'EUR',
            status: 'confirmed',
            location: 'Carrer de Villarroel 163, Eixample',
            notes: 'Solo diner confirmed. No substitutions on tasting menu.',
          },
        ],
      },
      {
        day: 3,
        date: '2026-05-17',
        items: [
          {
            id: 'bc-d3-1',
            type: 'activity',
            title: 'Montjuïc Cable Car',
            subtitle: 'Round trip + Castell de Montjuïc',
            time: '10:00',
            duration: '3h',
            cost: 18,
            currency: 'EUR',
            status: 'flexible',
            location: 'Av. de Miramar, Montjuïc',
          },
          {
            id: 'bc-d3-2',
            type: 'dining',
            title: 'La Pepita',
            subtitle: 'Montaditos & craft beers',
            time: '14:00',
            duration: '1h',
            cost: 25,
            currency: 'EUR',
            status: 'flexible',
            location: 'Carrer de Còrsega 343, Gràcia',
          },
          {
            id: 'bc-d3-3',
            type: 'activity',
            title: 'Barceloneta Beach & Spa W',
            subtitle: 'Afternoon at the beach + spa access',
            time: '16:00',
            duration: '3h',
            cost: 45,
            currency: 'EUR',
            status: 'pending',
          },
        ],
      },
      {
        day: 4,
        date: '2026-05-18',
        items: [
          {
            id: 'bc-d4-1',
            type: 'hotel',
            title: 'Hotel Arts Barcelona',
            subtitle: 'Check-out',
            time: '11:00',
            cost: 0,
            currency: 'EUR',
            status: 'confirmed',
          },
          {
            id: 'bc-d4-2',
            type: 'mobility',
            title: 'Taxi to BCN Airport',
            subtitle: 'Hotel Arts → Terminal 1',
            time: '13:00',
            duration: '30m',
            cost: 35,
            currency: 'EUR',
            status: 'flexible',
          },
          {
            id: 'bc-d4-3',
            type: 'flight',
            title: 'Vueling VY1345',
            subtitle: 'Barcelona (BCN) → Zagreb (ZAG)',
            time: '16:00',
            duration: '2h 05m',
            cost: 74,
            currency: 'EUR',
            status: 'confirmed',
            location: 'BCN Terminal 1, Gate B24',
          },
        ],
      },
    ],
  },

  // ── 3. Paris Family Trip (completed) ──────────────────────────────────────
  {
    id: 'trip-paris-003',
    title: 'Paris Family Trip',
    destination: 'Paris',
    country: 'France',
    image: 'https://picsum.photos/seed/paris/800/500',
    dates: { start: '2025-10-18', end: '2025-10-25' },
    budget: { total: 5200, spent: 5048, currency: 'EUR' },
    status: 'completed',
    travelers: 4,
    isGroup: false,
    isGift: false,
    itinerary: [
      {
        day: 1,
        date: '2025-10-18',
        items: [
          {
            id: 'pa-d1-1',
            type: 'flight',
            title: 'Air France AF1460',
            subtitle: 'Zagreb (ZAG) → Paris CDG',
            time: '08:05',
            duration: '2h 30m',
            cost: 680,
            currency: 'EUR',
            status: 'confirmed',
            notes: '4 passengers. Seats 22A, 22B, 22C, 22D.',
          },
          {
            id: 'pa-d1-2',
            type: 'mobility',
            title: 'RER B — CDG to City',
            subtitle: 'CDG Airport → Gare du Nord',
            time: '11:00',
            duration: '45m',
            cost: 40,
            currency: 'EUR',
            status: 'confirmed',
          },
          {
            id: 'pa-d1-3',
            type: 'hotel',
            title: 'Hôtel de Crillon',
            subtitle: 'Check-in · Family Suite',
            time: '15:00',
            duration: '7 nights',
            cost: 2800,
            currency: 'EUR',
            status: 'confirmed',
            location: '10 Place de la Concorde, 8th arrondissement',
          },
          {
            id: 'pa-d1-4',
            type: 'dining',
            title: 'Brasserie Lipp',
            subtitle: 'Classic French brasserie dinner',
            time: '19:30',
            duration: '2h',
            cost: 180,
            currency: 'EUR',
            status: 'confirmed',
            location: '151 Bd Saint-Germain, Saint-Germain-des-Prés',
          },
        ],
      },
      {
        day: 2,
        date: '2025-10-19',
        items: [
          {
            id: 'pa-d2-1',
            type: 'activity',
            title: 'Eiffel Tower — Summit Access',
            subtitle: 'Priority access + summit lift tickets (x4)',
            time: '10:00',
            duration: '3h',
            cost: 112,
            currency: 'EUR',
            status: 'confirmed',
            location: 'Champ de Mars, 7th arrondissement',
          },
          {
            id: 'pa-d2-2',
            type: 'dining',
            title: 'Café de Flore',
            subtitle: 'Iconic Left Bank café lunch',
            time: '13:30',
            duration: '1h 30m',
            cost: 88,
            currency: 'EUR',
            status: 'confirmed',
            location: '172 Bd Saint-Germain, 6th arrondissement',
          },
          {
            id: 'pa-d2-3',
            type: 'activity',
            title: 'Seine River Cruise — Bateaux Mouches',
            subtitle: '1-hour panoramic cruise (x4)',
            time: '16:00',
            duration: '1h',
            cost: 60,
            currency: 'EUR',
            status: 'confirmed',
            location: "Port de l'Alma, Pont de l'Alma",
          },
          {
            id: 'pa-d2-4',
            type: 'dining',
            title: 'Septime',
            subtitle: 'Neo-bistro dinner — seasonal tasting',
            time: '20:00',
            duration: '2h 30m',
            cost: 280,
            currency: 'EUR',
            status: 'confirmed',
            location: '80 Rue de Charonne, 11th arrondissement',
          },
        ],
      },
      {
        day: 3,
        date: '2025-10-20',
        items: [
          {
            id: 'pa-d3-1',
            type: 'activity',
            title: 'Louvre Museum',
            subtitle: 'Full-day timed entry + guided highlights tour',
            time: '09:30',
            duration: '5h',
            cost: 140,
            currency: 'EUR',
            status: 'confirmed',
            location: 'Rue de Rivoli, 1st arrondissement',
          },
          {
            id: 'pa-d3-2',
            type: 'dining',
            title: 'Angelina Paris',
            subtitle: 'Afternoon tea & hot chocolate',
            time: '15:30',
            duration: '1h',
            cost: 72,
            currency: 'EUR',
            status: 'confirmed',
            location: '226 Rue de Rivoli, 1st arrondissement',
          },
          {
            id: 'pa-d3-3',
            type: 'activity',
            title: 'Palais Royal Gardens',
            subtitle: 'Evening stroll & Colonnes de Buren',
            time: '17:00',
            duration: '1h',
            cost: 0,
            currency: 'EUR',
            status: 'confirmed',
          },
          {
            id: 'pa-d3-4',
            type: 'dining',
            title: 'Le Comptoir du Relais',
            subtitle: 'Authentic Parisian bistro dinner',
            time: '20:00',
            duration: '2h',
            cost: 160,
            currency: 'EUR',
            status: 'confirmed',
            location: '9 Carrefour de l\'Odéon, 6th arrondissement',
          },
        ],
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Mock Gifts
// ─────────────────────────────────────────────────────────────────────────────

export const mockGifts: Gift[] = [
  {
    id: 'gift-001',
    tripTitle: 'Lisbon Honeymoon',
    destination: 'Lisbon',
    image: 'https://picsum.photos/seed/lisbongift/800/500',
    from: 'Marko & Ivana Horvat',
    to: 'Ana & Marco',
    occasion: 'Wedding Gift',
    amount: 150,
    currency: 'EUR',
    status: 'activated',
    purchaseDate: '2026-04-20',
    activationDate: '2026-04-22',
    message:
      'Wishing you the most magical honeymoon! Enjoy every moment in beautiful Lisbon. With all our love.',
  },
  {
    id: 'gift-002',
    tripTitle: 'Lisbon Honeymoon',
    destination: 'Lisbon',
    image: 'https://picsum.photos/seed/lisbongift2/800/500',
    from: 'Petra Novak',
    to: 'Ana & Marco',
    occasion: 'Wedding Gift',
    amount: 100,
    currency: 'EUR',
    status: 'purchased',
    purchaseDate: '2026-05-01',
    message:
      'A little something toward your unforgettable honeymoon dinner. Cheers to a lifetime of adventures together!',
  },
  {
    id: 'gift-003',
    tripTitle: 'Barcelona Weekend',
    destination: 'Barcelona',
    image: 'https://picsum.photos/seed/bcngift/800/500',
    from: 'Tomislav Kovač',
    to: 'Dino',
    occasion: 'Birthday',
    amount: 75,
    currency: 'EUR',
    status: 'redeemed',
    purchaseDate: '2026-03-10',
    activationDate: '2026-03-11',
    message:
      'Happy birthday! Barcelona is calling your name — enjoy every tapas and every cava. You earned it.',
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Mock Group Trip
// ─────────────────────────────────────────────────────────────────────────────

export const mockGroupTrip: GroupTrip = {
  id: 'group-001',
  tripId: 'trip-lisbon-001',
  name: "Ana & Marco's Honeymoon",
  organizer: 'Ana Maričić',
  members: [
    {
      id: 'gm-001',
      name: 'Ana Maričić',
      avatar: 'AM',
      role: 'organizer',
      contributed: 0,
    },
    {
      id: 'gm-002',
      name: 'Marco Ferretti',
      avatar: 'MF',
      role: 'organizer',
      contributed: 0,
    },
    {
      id: 'gm-003',
      name: 'Marko Horvat',
      avatar: 'MH',
      role: 'contributor',
      contributed: 150,
    },
    {
      id: 'gm-004',
      name: 'Ivana Horvat',
      avatar: 'IH',
      role: 'contributor',
      contributed: 150,
    },
    {
      id: 'gm-005',
      name: 'Petra Novak',
      avatar: 'PN',
      role: 'contributor',
      contributed: 100,
    },
    {
      id: 'gm-006',
      name: 'Luka Blažević',
      avatar: 'LB',
      role: 'contributor',
      contributed: 80,
    },
    {
      id: 'gm-007',
      name: 'Sara Miletić',
      avatar: 'SM',
      role: 'contributor',
      contributed: 60,
    },
    {
      id: 'gm-008',
      name: 'Tomislav Kovač',
      avatar: 'TK',
      role: 'member',
      contributed: 0,
    },
  ],
  registry: [
    {
      id: 'ri-001',
      day: 1,
      location: 'Clube de Fado, Alfama',
      category: 'Experience',
      description:
        'Authentic Fado show for two with a glass of port — a perfect first night in Lisbon.',
      cost: 60,
      purchaser: 'Marko Horvat',
      message: 'Enjoy the most beautiful music in the world on your first evening!',
      funded: true,
    },
    {
      id: 'ri-002',
      day: 2,
      location: 'Cervejaria Ramiro, Lisbon',
      category: 'Dining',
      description:
        "Romantic seafood dinner — lobster, clams, and tiger prawns at Lisbon's most iconic seafood institution.",
      cost: 130,
      purchaser: 'Ivana Horvat',
      message: 'The best seafood dinner in Lisbon, just for the two of you. A toast to forever!',
      funded: true,
    },
    {
      id: 'ri-003',
      day: 3,
      location: 'Alma Restaurant, Chiado',
      category: 'Fine Dining',
      description:
        "Michelin-starred tasting menu with wine pairing at Chef Henrique Sá Pessoa's flagship restaurant.",
      cost: 210,
      funded: false,
    },
    {
      id: 'ri-004',
      day: 4,
      location: 'Douro Valley',
      category: 'Experience',
      description:
        'Private car, guide, and tastings at two historic quintas in the Douro Valley wine region.',
      cost: 290,
      purchaser: 'Petra Novak',
      message:
        'A day among the vineyards — because the best things in life are to be shared over great wine.',
      funded: true,
    },
    {
      id: 'ri-005',
      day: 2,
      location: 'Sintra & Cabo da Roca',
      category: 'Day Trip',
      description:
        "Private guided day trip to Sintra's Pena Palace and the westernmost point of continental Europe.",
      cost: 120,
      funded: false,
    },
    {
      id: 'ri-006',
      day: 3,
      location: 'Belém & Alfama',
      category: 'Tour',
      description:
        "Tuk-tuk city tour through Alfama's narrow streets and the historic Belém waterfront.",
      cost: 70,
      purchaser: 'Luka Blažević',
      message: 'Lisbon is best seen from a tuk-tuk! Have the most amazing ride. Sretan medeni!',
      funded: true,
    },
    {
      id: 'ri-007',
      day: 1,
      location: 'Bairro Alto Hotel',
      category: 'Hotel',
      description:
        'Welcome champagne and honeymoon floral arrangement in the Deluxe River View Room.',
      cost: 85,
      purchaser: 'Sara Miletić',
      message: 'Every fairy tale begins somewhere. Yours begins here. Congratulations!',
      funded: true,
    },
  ],
  totalContributed: 540,
  totalGoal: 965,
  currency: 'EUR',
}

// ─────────────────────────────────────────────────────────────────────────────
// Mock User
// ─────────────────────────────────────────────────────────────────────────────

export const mockUser: User = {
  name: 'Dino Poprzenovic',
  email: 'dino@suitcase.travel',
  avatar: 'DP',
  isPremium: false,
  tripsCompleted: 14,
  memberSince: '2024-03-01',
  preferences: {
    currency: 'EUR',
    dietaryRestrictions: [],
    travelStyle: 'Explorer',
    budgetRange: 'Mid-range (€100–200/day)',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Premium Plans
// ─────────────────────────────────────────────────────────────────────────────

export const premiumPlans: PremiumPlan[] = [
  {
    name: 'Free',
    price: 0,
    currency: 'EUR',
    period: 'month',
    features: [
      'Up to 2 active trips',
      'Basic itinerary builder',
      'Budget tracker',
      'Group trips (up to 5 members)',
      'Gift travel vouchers',
    ],
    highlighted: false,
  },
  {
    name: 'Premium',
    price: 9.99,
    currency: 'EUR',
    period: 'month',
    features: [
      'Unlimited active trips',
      'AI-powered itinerary suggestions',
      'Real-time price alerts & rebooking',
      'Unlimited group members & registry',
      'Priority customer support',
      'Offline itinerary access',
      'Hotel & flight price tracking',
      'Exclusive partner discounts',
    ],
    highlighted: true,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Mock Notifications
// ─────────────────────────────────────────────────────────────────────────────

export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'price',
    title: 'Price drop on your Lisbon flight',
    message:
      'TAP Air Portugal TP1326 has dropped by €23 since you booked. No action needed — you already have the best price.',
    time: '2026-05-10T08:14:00Z',
    read: false,
  },
  {
    id: 'notif-002',
    type: 'group',
    title: 'New contribution to your registry',
    message:
      "Petra Novak contributed €100 toward your Lisbon Honeymoon registry. You're now 56% funded!",
    time: '2026-05-09T15:32:00Z',
    read: false,
  },
  {
    id: 'notif-003',
    type: 'booking',
    title: 'Douro Valley tour — confirmation pending',
    message:
      'Your private Douro Valley wine tour is awaiting confirmation. The operator will respond by September 1.',
    time: '2026-05-08T10:00:00Z',
    read: false,
  },
  {
    id: 'notif-004',
    type: 'gift',
    title: 'Gift voucher activated',
    message:
      'The €150 gift from Marko & Ivana Horvat has been activated and added to your Lisbon Honeymoon budget.',
    time: '2026-05-07T09:22:00Z',
    read: true,
  },
  {
    id: 'notif-005',
    type: 'trip',
    title: 'Your Barcelona trip starts in 5 days',
    message:
      'Pack your bags! Your Barcelona Weekend kicks off on May 15. Check your itinerary for last-minute tips.',
    time: '2026-05-10T07:00:00Z',
    read: false,
  },
  {
    id: 'notif-006',
    type: 'system',
    title: 'Upgrade to Premium',
    message:
      'Unlock unlimited trips, real-time price alerts, and AI itinerary suggestions — starting at €9.99/month.',
    time: '2026-05-06T12:00:00Z',
    read: true,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Convenience aliases (used by page components)
// ─────────────────────────────────────────────────────────────────────────────

export const trips = mockTrips
export const gifts = mockGifts
export const notifications = mockNotifications
export const groupTrip = mockGroupTrip

// ─────────────────────────────────────────────────────────────────────────────
// Legacy type aliases expected by existing components
// ─────────────────────────────────────────────────────────────────────────────

export type TripStatus = Trip['status'] | 'cancelled'
export type ItineraryItemType = ItineraryItem['type']
// NotificationPanel uses a simpler 4-value union for its icon map
export type NotificationType = 'info' | 'success' | 'warning' | 'alert'
