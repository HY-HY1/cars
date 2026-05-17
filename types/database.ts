export type Profile = {
  id: string;
  email: string;
  created_at: string;
  stripe_customer_id: string | null;
  subscription_status: string | null;
  full_name: string | null;
};

export type Onboarding = {
  id: string;
  customer_id: string | null;
  email: string;
  created_at: string;
  completed_at: string | null;
  name: string | null;
  age_range: string | null;
  employment: string | null;
  capital_range: string | null;
  weekly_hours: string | null;
  experience: string | null;
  goal: string | null;
  target_monthly: string | null;
  notes: string | null;
};

export type Customer = {
  id: string;
  email: string;
  stripe_customer_id: string | null;
  created_at: string;
  auth_user_id: string | null;
  has_account: boolean;
  purchase_status: string | null;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: {
          id: string;
          email: string;
          created_at?: string;
          stripe_customer_id?: string | null;
          subscription_status?: string | null;
          full_name?: string | null;
        };
        Update: Partial<Omit<Profile, "id" | "created_at">>;
        Relationships: [];
      };
      onboarding: {
        Row: Onboarding;
        Insert: {
          id?: string;
          customer_id?: string | null;
          email: string;
          created_at?: string;
          completed_at?: string | null;
          name?: string | null;
          age_range?: string | null;
          employment?: string | null;
          capital_range?: string | null;
          weekly_hours?: string | null;
          experience?: string | null;
          goal?: string | null;
          target_monthly?: string | null;
          notes?: string | null;
        };
        Update: Partial<Omit<Onboarding, "id">>;
        Relationships: [];
      };
      customers: {
        Row: Customer;
        Insert: {
          id?: string;
          email: string;
          stripe_customer_id?: string | null;
          created_at?: string;
          auth_user_id?: string | null;
          has_account?: boolean;
          purchase_status?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          stripe_customer_id?: string | null;
          created_at?: string;
          auth_user_id?: string | null;
          has_account?: boolean;
          purchase_status?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
