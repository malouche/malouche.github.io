import Section from './ui/Section.jsx';
import Accordion from './ui/Accordion.jsx';

const ITEMS = [
  {
    title: 'Cross-sectional design — no causal inference',
    children: (
      <>
        Cases and controls were ascertained at a single time point. We cannot establish
        whether CBC abnormalities are a consequence of NASH, a marker of antecedent
        physiologic differences, or a reflection of shared metabolic risk factors. The
        associations reported are explicitly cross-sectional.
      </>
    ),
  },
  {
    title: 'NASH ascertained from ICD-10 codes (no histology)',
    children: (
      <>
        NASH cases were identified using ICD-10 codes K75.81, K76.0 and K76.89, not by
        liver biopsy or imaging-based fibrosis staging. Some misclassification — both
        false-positives and false-negatives — is unavoidable. The cohort is best
        characterized as <em>clinically diagnosed</em> NASH in primary care.
      </>
    ),
  },
  {
    title: '~62% missingness in liver enzymes — selected FIB-4 subset',
    children: (
      <>
        The FIB-4 analysis was restricted to the 340 NASH patients with simultaneous
        AST, ALT and platelet measurements. This subgroup is almost certainly enriched
        for sicker, more closely monitored patients, which biases the FIB-4–CBC
        gradient upward relative to the full NASH population.
      </>
    ),
  },
  {
    title: 'No data on iron, B12, folate, MCV/RDW, or medications',
    children: (
      <>
        We do not have iron studies, vitamin B12, folate, MCV or RDW; we therefore
        cannot classify anemia by mechanism (iron-deficiency vs. anemia of chronic
        disease vs. macrocytic). Medication histories — statins, antiplatelets, PPIs —
        are also unavailable; the &ldquo;protective&rdquo; effect of dyslipidaemia in
        adjusted models likely reflects unmeasured statin use rather than a biological
        mechanism.
      </>
    ),
  },
  {
    title: 'Mathematical coupling between FIB-4 and the platelet outcome',
    children: (
      <>
        Platelet count enters the FIB-4 denominator. Patients with low platelets
        therefore mechanically score higher on FIB-4 even without other independent
        information. The APRI sensitivity analysis preserves the direction of the
        association but cannot fully disentangle the magnitude. We flag this on the
        relevant strength card.
      </>
    ),
  },
  {
    title: 'Single-country cohort — generalizability to be confirmed',
    children: (
      <>
        The cohort is drawn from PHCC patients in Qatar, with metabolic and demographic
        characteristics typical of the Gulf region. External validation in other
        ethnic and health-system contexts is needed before extrapolating effect sizes.
      </>
    ),
  },
];

export default function Limitations() {
  return (
    <Section
      id="limits"
      eyebrow="Section 6"
      title="Limitations and open questions"
    >
      <p className="mb-6 max-w-prose text-sm leading-relaxed text-muted">
        These caveats mirror — and do not soften — the discussion in the paper itself.
        Findings should be read as descriptive and hypothesis-generating, not as
        evidence of causal hematologic effects of NASH.
      </p>
      <Accordion items={ITEMS} />
    </Section>
  );
}
