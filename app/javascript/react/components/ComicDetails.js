import React from 'react';

const ComicDetails = (props) => {
  let title
  let author
  let publishedYear
  let description

  if (props.comic !== null){
    title = props.comic.title
    author = props.comic.author
    publishedYear = props.comic.published_year
    description = props.comic.description
  }

  return(
    <div>
      <h1>{title}</h1>
      <h3>By {author}</h3>
      <h3>Published in {publishedYear}</h3>
      <p>{description}</p>
    </div>
  )
}
export default ComicDetails;
