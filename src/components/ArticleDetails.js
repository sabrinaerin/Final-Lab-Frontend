import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ArticleDetails = () => {
  const { id } = useParams();  
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/article/${id}`);
        const data = await response.json();
        if (response.ok) {
          setArticle(data.response.docs[0]);
        } else {
          setError('Error fetching article details');
        }
      } catch (error) {
        setError('Error fetching article details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticleDetails();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!article) return <div>No article found</div>;

  return (
    <div>
      <h1>{article.headline.main}</h1>
      <p><strong>Source:</strong> {article.source}</p>
      <p><strong>Published Date:</strong> {article.pub_date}</p>
      <p><strong>Abstract:</strong> {article.abstract}</p>
      <p><strong>Lead Paragraph:</strong> {article.lead_paragraph}</p>
      <a href={article.web_url} target="_blank" rel="noopener noreferrer">Read Full Article</a>
    </div>
  );
};

export default ArticleDetails;
