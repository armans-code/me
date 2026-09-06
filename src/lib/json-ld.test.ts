import { describe, expect, it } from "vitest";
import { personJsonLd, serializeJsonLd } from "./json-ld";
import { PERSON, SITE_URL } from "./site";

describe("personJsonLd", () => {
  it("emits a parseable Person document with identity fields", () => {
    const jsonLd = personJsonLd();

    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("Person");
    expect(jsonLd.name).toBe(PERSON.name);
    expect(jsonLd.description).toBe(PERSON.description);
    expect(jsonLd.url).toBe(SITE_URL);
    expect(jsonLd.jobTitle).toBe(PERSON.jobTitle);
    expect(jsonLd.worksFor["@type"]).toBe("Organization");
    expect(jsonLd.worksFor.name).toBe(PERSON.worksFor.name);
    expect(jsonLd.worksFor.url).toBe(PERSON.worksFor.url);
    expect(jsonLd.worksFor.url).toBe("https://www.thecontextcompany.com/");
    expect(jsonLd.sameAs).toEqual(PERSON.sameAs);
  });

  it("serializes without raw HTML brackets", () => {
    const serialized = serializeJsonLd(personJsonLd());
    expect(JSON.parse(serialized)).toMatchObject({
      "@type": "Person",
      name: PERSON.name,
    });
    expect(serialized.includes("<")).toBe(false);
  });
});
