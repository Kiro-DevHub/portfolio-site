/**
 * Минимальная рамка телефона под скрины Mini App/приложений: бордер-бордюр +
 * вырез сверху, без скевоморфизма. Отдельно от BrowserFrame — десктопная
 * рамка браузера поверх портретного скрина телефона выглядит как чужой
 * контекст (адресная строка и трафик-лайты для приложения без URL).
 */
export function PhoneFrame({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-[2rem] border border-hair bg-surface-2 pb-2.5 pt-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] ${className}`}
    >
      <span
        aria-hidden="true"
        className="mx-auto mb-2.5 block h-1 w-10 rounded-full bg-hair-strong/70"
      />
      <div className="mx-2.5 overflow-hidden rounded-[1.25rem] bg-bg">{children}</div>
    </div>
  );
}
