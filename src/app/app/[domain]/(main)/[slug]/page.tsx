type DomainPageProps = {
  params: { domain: string; slug: string };
}

export default function DomainPage({ params }: DomainPageProps) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);
  return (
    <div className="">
      <h1>Pagina de SLUG ({domain} - {slug})</h1>
    </div>
  )
}
