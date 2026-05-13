export default function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className={`scroll-mt-20 border-b border-rule py-12 sm:py-16 ${className}`}
    >
      <div className="container-prose">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        {title && (
          <h2 id={`${id}-h`} className="section-h mb-6 sm:mb-8">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
