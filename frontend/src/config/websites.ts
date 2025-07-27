export type WebsiteConfig = {
  id: string;
  name: string;
  url: string;
  test_credentials: {
    email: string;
    password: string;
  };
};

export const WEBSITES: Record<string, WebsiteConfig> = {
  "fo1": {
    id: "fo1",
    name: "FO1 Altius Finance",
    url: "https://fo1.api.altius.finance/api/v0.0.2",
    test_credentials: {
      email: "fo1_test_user@whatever.com",
      password: "Test123!"
    }
  },
  "fo2": {
    id: "fo2",
    name: "FO2 Altius Finance", 
    url: "https://fo2.api.altius.finance/api/v0.0.2",
    test_credentials: {
      email: "fo2_test_user@whatever.com",
      password: "Test223!"
    }
  }
};

export const WEBSITES_ARRAY = Object.values(WEBSITES);