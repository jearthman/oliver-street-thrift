export default function CollectionPage({
  params,
}: {
  params: { slug: string[] };
}) {
  console.log(params.slug);

  return (
    <div className="bg-parchment-100">
      <div className="my-4 ml-3 flex">
        {params.slug.map((slug) => (
          <>
            <div key={slug}>{slug}</div>
            <span key={slug} className="mx-1 last:hidden">
              /
            </span>
          </>
        ))}
      </div>
    </div>
  );
}
