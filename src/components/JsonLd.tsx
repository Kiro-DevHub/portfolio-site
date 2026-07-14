/**
 * script[type=application/ld+json] с JSON, который формируем сами (не сырой
 * пользовательский ввод) — JSON.stringify экранирует кавычки, XSS здесь не в
 * пользовательских данных, единственный риск — `</script>` в строке, поэтому
 * дополнительно эскейпим слэш.
 */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
