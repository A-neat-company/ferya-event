import ChecklistItem from "./ChecklistItem";

interface ServiceCardProps {
  title: string;
  description: string;
  items: string[];
}

export default function ServiceCard({
  title,
  description,
  items,
}: ServiceCardProps) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm border border-cream">
      <h3 className="font-serif text-2xl text-dark">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-body">{description}</p>
      <ul className="mt-6 flex flex-col gap-3">
        {items.map((item) => (
          <ChecklistItem key={item}>{item}</ChecklistItem>
        ))}
      </ul>
    </div>
  );
}
