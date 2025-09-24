export type EventStatus = 'draft' | 'scheduled' | 'in-progress' | 'completed';

export interface EventMenuItem {
  id: string;
  name: string;
  pricePerGuest: number;
}

export interface EventTimelineItem {
  id: string;
  label: string;
  dueDate: string;
  completed: boolean;
}

export interface CateringEvent {
  id: string;
  client: string;
  date: string;
  type: string;
  attendees: number;
  status: EventStatus;
  assignedMenus: EventMenuItem[];
  staff: string[];
  inventoryNeeds: string[];
  notes?: string;
  timeline: EventTimelineItem[];
}
