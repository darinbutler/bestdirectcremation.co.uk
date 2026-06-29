export default function JsonLd({ raw }: { raw: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: raw }}
    />
  );
}
