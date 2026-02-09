interface ChecklistItemProps {
  children: React.ReactNode;
}

export default function ChecklistItem({ children }: ChecklistItemProps) {
  return (
    <li className="flex items-start gap-3">
      <svg
        className="mt-0.5 size-5 shrink-0 text-primary"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-base text-body">{children}</span>
    </li>
  );
}
