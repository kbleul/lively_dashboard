interface Package {
  id: string;
  place_branch_id: string;
  service_id: string;
  package_type_id: string;
  package_category_id: string;
  price: number;
  enrollment_type: string;
  title: LanguageText;
  description: LanguageText;
  duration: string;
  frequency: string;
  additional_information: null | string;
  created_at: string;
  updated_at: string;
  service: Service;
  package_type: PackageType;
}

interface LanguageText {
  english: string;
  amharic: string;
}

interface Service {
  id: string;
  name: LanguageText;
  icon: {
    uuid: string;
    mime_type: string;
    url: string;
  };
}

interface PackageType {
  id: string;
  name: LanguageText;
}

export interface PackageDataType {
  category: string;
  packages: Package[];
}
