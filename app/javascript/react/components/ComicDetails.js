import React from 'react';

const ComicDetails = (props) => {
  let title
  let author
  let publishedYear
  let description
  let id

  if (props.comic !== null){
    title = props.comic.title
    author = props.comic.author
    publishedYear = props.comic.published_year
    description = props.comic.description
    id = props.comic.id
  }

  return(
    <div>
      <h1>{title}</h1>
      <h3>By {author}</h3>
      <h3>Published in {publishedYear}</h3>
      <p>{description}</p>
      <div className="fb-like" data-href={`http://dream-eater.herokuapp/comics/${id}`} data-width="50" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
    </div>
  )
}
export default ComicDetails;
