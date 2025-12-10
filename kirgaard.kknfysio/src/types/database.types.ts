export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type EventType = 'hold' | 'online' | 'workshop';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          is_admin: boolean
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          is_admin?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          is_admin?: boolean
          created_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          type: EventType
          start_time: string
          end_time: string
          location: string | null
          max_spots: number | null
          price: number | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          type: EventType
          start_time: string
          end_time: string
          location?: string | null
          max_spots?: number | null
          price?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          type?: EventType
          start_time?: string
          end_time?: string
          location?: string | null
          max_spots?: number | null
          price?: number | null
          created_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          event_id: string
          status: BookingStatus
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          event_id: string
          status?: BookingStatus
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          event_id?: string
          status?: BookingStatus
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      event_type: EventType
      booking_status: BookingStatus
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types for easier usage
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type Booking = Database['public']['Tables']['bookings']['Row'];

export type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];
export type EventInsert = Database['public']['Tables']['events']['Insert'];
export type BookingInsert = Database['public']['Tables']['bookings']['Insert'];

export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
export type EventUpdate = Database['public']['Tables']['events']['Update'];
export type BookingUpdate = Database['public']['Tables']['bookings']['Update'];
