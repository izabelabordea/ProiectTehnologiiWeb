export interface EventAttributes {
  id: number;
  title: string;
  description?: string;
  state: "OPEN" | "CLOSED";
  code: string;
  startTime: Date;
  endTime: Date;
  organizerId: number;
}
