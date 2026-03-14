type DemoBooking = {
  id: string;
  classKey: string;
  className: string;
  instructor: string;
  time: string;
  duration: string;
  location: string;
  date: string;
  createdAt: string;
};

type DemoSubscription = {
  planName: string;
  price: string;
  period: string;
  startedAt: string;
  status: 'active' | 'cancelled';
};

const STORAGE_VERSION = 'v1';

const bookingsKey = (userId: string) => `vitalcore:${STORAGE_VERSION}:bookings:${userId}`;
const subscriptionKey = (userId: string) => `vitalcore:${STORAGE_VERSION}:subscription:${userId}`;

const safeParse = <T>(raw: string | null, fallback: T): T => {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const demoStorage = {
  getBookings(userId: string): DemoBooking[] {
    return safeParse<DemoBooking[]>(localStorage.getItem(bookingsKey(userId)), []);
  },

  addBooking(userId: string, booking: Omit<DemoBooking, 'id' | 'createdAt'>): DemoBooking {
    const existing = this.getBookings(userId);

    const newBooking: DemoBooking = {
      ...booking,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(bookingsKey(userId), JSON.stringify([newBooking, ...existing]));
    return newBooking;
  },

  hasBooking(userId: string, classKey: string): boolean {
    return this.getBookings(userId).some((b) => b.classKey === classKey);
  },

  cancelBooking(userId: string, bookingId: string): void {
    const existing = this.getBookings(userId);
    localStorage.setItem(
      bookingsKey(userId),
      JSON.stringify(existing.filter((b) => b.id !== bookingId))
    );
  },

  getSubscription(userId: string): DemoSubscription | null {
    return safeParse<DemoSubscription | null>(localStorage.getItem(subscriptionKey(userId)), null);
  },

  setSubscription(userId: string, sub: DemoSubscription): void {
    localStorage.setItem(subscriptionKey(userId), JSON.stringify(sub));
  },

  cancelSubscription(userId: string): void {
    const existing = this.getSubscription(userId);
    if (!existing) return;
    this.setSubscription(userId, { ...existing, status: 'cancelled' });
  },
};

export type { DemoBooking, DemoSubscription };
