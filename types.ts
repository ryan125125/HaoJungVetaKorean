
export type CategoryType = 'food' | 'spot' | 'shop' | 'transport';

export interface ItineraryItem {
  time: string;
  title: string;
  type: CategoryType;
  detail: string;
  note?: string;
  link: string;
}

export interface DayItinerary {
  day: number;
  title: string;
  items: ItineraryItem[];
}

export interface CategoryConfig {
  label: string;
  color: string;
}

export type Categories = Record<CategoryType, CategoryConfig>;
