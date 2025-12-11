export default function BlogList({ data, loading }) {
  if (loading) return <p>Loading...</p>;

  console.log('datdat: ', data);

  return (
    <div>
      {data?.length === 0 ? (
        <p>Henüz blog yok.</p>
      ) : (
        data.map((blog) => (
          <div key={blog.id}>
            <h2>{blog.title}</h2>
          </div>
        ))
      )}
    </div>
  );
}
