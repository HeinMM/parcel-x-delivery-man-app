export interface Booking {
  id: number
  user_id: number
  booking_number: string
  cod: string
  parcel_name: string
  sender_name: string
  sender_phone: string
  sender_city: string
  sender_address_detail: string
  sender_township_id: number
  receiver_name: string
  receiver_phone: string
  receiver_city: string
  receiver_address_detail: string
  receiver_township_id: number
  weight: number
  count: number
  fees: string
  delivery_man_id: number
  status_id: number
  assign_at: string
  road_at: string
  qrcode_at: string
  complete_at: string
  created_at: string
  updated_at: string
}
