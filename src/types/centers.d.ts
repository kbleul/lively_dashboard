export interface CenterType {
  id: string;
  name: {
    english: string;
    amharic: string;
  };
  description: {
    english: string;
    amharic: string;
  };
  city_id: string;
  location: {
    latitude: string;
    longitude: string;
  };
  socials: {
    telegram: null | string;
    whatsapp: null | string;
    facebook: null | string;
    instagram: null | string;
  };
  phone: string;
  website: string;
  additional_information: null | string;
  status: number;
  created_at: string;
  updated_at: string;
  is_open: boolean;
  center_logo: {
    uuid: string;
    mime_type: string;
    url: string;
  };
  center_cover: {
    uuid: string;
    mime_type: string;
    url: string;
  };
  rating: {
    average: number;
    users_count: number;
  };
}
