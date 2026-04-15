export function ApiNotice({ title = "Resultado", error, warning, success }) {
  if (!error && !warning && !success) {
    return null;
  }

  return (
    <section className="notice-card">
      <h3>{title}</h3>
      {success ? <p className="notice-success">{success}</p> : null}
      {warning ? <p className="notice-warning">{warning}</p> : null}
      {error ? <p className="notice-error">{error}</p> : null}
    </section>
  );
}

