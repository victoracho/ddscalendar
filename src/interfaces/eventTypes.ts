export interface CustomEvent {
  id?: string | number
  title: string
  start: string | Date | null
  end: string | Date | null
  backgroundColor: string | null
  substatus: string | null
  contentText?: string
}
export interface Timeslot {
  start: string | Date | null
  end: string | Date | null
}
export interface SelectedSlot {
  add: boolean,
  modal: boolean
  times: Timeslot
}
