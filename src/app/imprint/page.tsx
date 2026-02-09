import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Layout } from "@/components/layout";
import { SectionLabel, SectionHeading } from "@/components/ui";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Imprint");
  return { title: t("meta"), description: t("metaDescription") };
}

export default async function ImprintPage() {
  const t = await getTranslations("Imprint");

  return (
    <Layout>
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <SectionLabel>{t("label")}</SectionLabel>
            <div className="mt-4">
              <SectionHeading as="h1" accent={t("headingAccent")}>
                {t("heading")}
              </SectionHeading>
            </div>
          </div>

          <div className="mt-16 space-y-10">
            {/* Business Info */}
            <div>
              <h3 className="font-serif text-2xl text-dark">{t("business")}</h3>
              <p className="mt-3 text-xl font-medium text-dark">{t("businessName")}</p>
            </div>

            {/* Address */}
            <div>
              <h3 className="font-serif text-2xl text-dark">{t("addressLabel")}</h3>
              <p className="mt-3 text-lg leading-relaxed text-body whitespace-pre-line">
                {t("address")}
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-serif text-2xl text-dark">{t("contactLabel")}</h3>
              <div className="mt-3 space-y-2 text-body">
                <p>
                  <span className="font-medium text-dark">{t("emailLabel")}:</span>{" "}
                  {t("email")}
                </p>
                <p>
                  <span className="font-medium text-dark">{t("phoneLabel")}:</span>{" "}
                  {t("phone")}
                </p>
                <p>
                  <span className="font-medium text-dark">{t("websiteLabel")}:</span>{" "}
                  {t("website")}
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div>
              <h3 className="font-serif text-2xl text-dark">{t("disclaimer")}</h3>
              <p className="mt-3 text-lg leading-relaxed text-body">
                {t("disclaimerText")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
