export default function BlogEntries ({result: posts}) {
  return (
    <div style={styles.postContainer}>
      { posts.map(({author, blog, permlink}) => (
        <div style={styles.header}>
          <div>
            <h3 style={styles.title}>{permlink}</h3>
            <p style={styles.author}>by {author}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

const styles = {
  postContainer: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '400px',
    margin: '16px auto',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
  },
  title: {
    margin: '0 0 4px 0',
    fontSize: '18px',
    color: '#333',
  },
  author: {
    margin: 0,
    fontSize: '14px',
    color: '#777',
  },
  teaser: {
    marginTop: '12px',
    fontSize: '16px',
    color: '#555',
  }
}
