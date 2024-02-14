interface Name {
  english: string;
  amharic: string;
}

interface Description {
  english: string | null;
  amharic: string | null;
}

interface Location {
  latitude: string;
  longitude: string;
  specific_address: string;
}

interface Socials {
  telegram: string | null;
  whatsapp: string | null;
  facebook: string | null;
  instagram: string | null;
}

interface BranchCover {
  uuid: string;
  mime_type: string;
  url: string;
}

interface CityName {
  english: string;
  amharic: string;
}

interface City {
  id: string;
  name: CityName;
  created_at: string;
  updated_at: string;
}

interface Rating {
  average: number;
  users_count: number;
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

interface Roles {
  uuid: string;
  name: string;
}

interface Place {
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

export interface BranchDataType {
  id: string;
  place_id: string;
  name: Name;
  phone: string;
  description: Description;
  location: Location;
  socials: Socials;
  additional_information: null;
  status: number;
  created_at: string;
  updated_at: string;
  city_id: string;
  branch_cover: BranchCover;
  city: City;
  rating: Rating;
  place: Place;
  has_delivery: boolean;
}
