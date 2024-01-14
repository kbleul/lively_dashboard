interface Name {
    english: string;
    amharic: string;
  }
  
  interface Description {
    english: string;
    amharic: string;
  }
  
  interface Roles {
    uuid: string;
    name: string;
  }
  
  interface Owner {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    username: string;
    gender: string;
    dob: string | null;
    created_at: string;
    updated_at: string;
    fcm: string | null;
    profile_image: string;
    need_create_password: boolean;
    roles: Roles[];
  }
  
  interface PlaceLogo {
    uuid: string;
    mime_type: string;
    url: string;
  }
  
  interface PlaceCover {
    uuid: string;
    mime_type: string;
    url: string;
  }
  
  interface PlaceType {
    id: string;
    name: Name;
  }
  
  export interface StoreDataType {
    id: string;
    place_type_id: string;
    owner_id: string;
    name: Name;
    description: Description;
    phone: string;
    website: string;
    additional_information: null;
    status: number;
    creator_id: string;
    created_at: string;
    updated_at: string;
    owner: Owner;
    place_logo: PlaceLogo;
    place_cover: PlaceCover;
    place_type: PlaceType;
  }
  