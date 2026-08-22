import { PERSON, SITE_URL } from "./site";

export type PersonJsonLd = {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  url: string;
  description: string;
  jobTitle: string;
  worksFor: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  sameAs: readonly string[];
  knowsAbout: readonly string[];
};

export function personJsonLd(): PersonJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON.name,
    url: SITE_URL,
    description: PERSON.description,
    jobTitle: PERSON.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: PERSON.worksFor.name,
      url: PERSON.worksFor.url,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      addressCountry: "US",
    },
    sameAs: PERSON.sameAs,
    knowsAbout: ["TypeScript", "AI", "AI observability", "AI products"],
  };
}

export function serializeJsonLd(value: PersonJsonLd): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
