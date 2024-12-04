// components/ArticleList.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ArticleList = () => {
  const { query } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`/api/search?query=${query}`);
        if (!response.ok) throw new Error('Failed to fetch articles');
        const data = await response.json();
        setArticles(data.response.docs);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Articles for: {query}</h2>
      {articles.length > 0 ? (
        articles.map((article, index) => (
          <div key={index}>
            <h3>{article.headline.main}</h3>
            <p>{article.abstract}</p>
            <a href={`/article/${article._id}`}>Read more</a>
          </div>
        ))
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default ArticleList;
