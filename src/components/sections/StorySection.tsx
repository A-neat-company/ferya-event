import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionLabel, SectionHeading, StatCard } from "@/components/ui";

export default async function StorySection() {
  const t = await getTranslations("Story");

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Text + Stats */}
          <div>
            <SectionLabel>{t("label")}</SectionLabel>
            <div className="mt-4">
              <SectionHeading accent={t("headingAccent")}>
                {t("heading")}
              </SectionHeading>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-body">
              {t("description")}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-body">
              {t("description2")}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-body">
              {t("description3")}
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6">
              <StatCard value={t("stat1Value")} label={t("stat1Label")} />
              <StatCard value={t("stat2Value")} label={t("stat2Label")} />
              <StatCard value={t("stat3Value")} label={t("stat3Label")} />
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/story-marriage-certificate.jpg"
              alt="Bespoke marriage certificate by Ferya"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
