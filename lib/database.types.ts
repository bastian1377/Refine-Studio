export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      staff: {
        Row: {
          id: string
          name: string
          role: string
          specialties: string[]
          image: string
          booksyUrl: string
          email: string
          phone: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          specialties: string[]
          image: string
          booksyUrl: string
          email: string
          phone: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          specialties?: string[]
          image?: string
          booksyUrl?: string
          email?: string
          phone?: string
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          price: string
          duration: string
          category: string
          imageSrc: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: string
          duration: string
          category: string
          imageSrc: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: string
          duration?: string
          category?: string
          imageSrc?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export interface StaffMember {
  id: string
  name: string
  role: string
  specialties: string[]
  image: string
  booksyUrl: string
  email: string
  phone: string
  created_at?: string
}

export interface Service {
  id: string
  title: string
  description: string
  price: string
  duration: string
  category: string
  imageSrc: string
  created_at?: string
}

