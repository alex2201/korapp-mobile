type PharmacyProperties = {
  id: number;
  name: string | null;
  phone: string | null;
  email: string | null;
  addressLine: string | null;
  city: string | null;
  state: string | null;
  logoUrl: string | null;
  settings: Record<string, unknown>;
  brandColor: string | null;
  alertEmails: string[];
};

export class Pharmacy {
  static readonly defaultName = 'Korapp';
  static readonly defaultBrandColor = '#355872';

  readonly id: number;
  readonly name: string;
  readonly phone: string | null;
  readonly email: string | null;
  readonly addressLine: string | null;
  readonly city: string | null;
  readonly state: string | null;
  readonly logoUrl: string | null;
  readonly settings: Record<string, unknown>;
  readonly brandColor: string;
  readonly alertEmails: string[];

  constructor(properties: PharmacyProperties) {
    this.id = properties.id;
    this.name = properties.name?.trim() || Pharmacy.defaultName;
    this.phone = properties.phone;
    this.email = properties.email;
    this.addressLine = properties.addressLine;
    this.city = properties.city;
    this.state = properties.state;
    this.logoUrl = properties.logoUrl;
    this.settings = properties.settings;
    this.brandColor =
      properties.brandColor?.trim() || Pharmacy.defaultBrandColor;
    this.alertEmails = properties.alertEmails;
  }
}
