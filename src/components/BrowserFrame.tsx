/**
 * Рамка браузера вокруг скриншота: три «светофора» + моно-адрес в строке-табе.
 * Сквозная деталь — используется во флагмане на главной и в хиро страницы кейса.
 * className прокидывается на внешнюю рамку (hover-эффекты у вызывающего кода).
 */
export function BrowserFrame({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-hair bg-surface ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-hair px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-surface-2" />
          <span className="size-2.5 rounded-full bg-surface-2" />
          <span className="size-2.5 rounded-full bg-surface-2" />
        </span>
        <span className="ml-2 inline-flex items-center gap-1.5 rounded bg-surface-2 px-3 py-1 font-mono text-xs text-muted">
          <span aria-hidden="true">▲</span> {label}
        </span>
      </div>
      {children}
    </div>
  );
}
