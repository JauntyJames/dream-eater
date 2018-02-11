import React from 'react';

const ComicDetails = (props) => {
  let title
  let author
  let publishedYear
  let description
  let id
  let thumbnail

  if (props.comic !== null){
    title = props.comic.title
    author = props.comic.author
    publishedYear = props.comic.published_year
    description = props.comic.description
    id = props.comic.id
    thumbnail = props.comic.thumbnail
  }

  debugger

  return(
    <div>
      <meta property="og:url"                content={`http://dream-eater.herokuapp/comics/${id}`} />
      <meta property="og:type"               content="media" />
      <meta property="og:title"              content={title} />
      <meta property="og:description"        content={description} />
      <meta property="og:image"              content={thumbnail} />
      <div className="fb-like" data-href={`http://dream-eater.herokuapp/comics/${id}`} data-width="75" data-layout="button_count" data-action="like" data-size="small" data-show-faces="false" data-share="true"></div>
      <h1>{title}</h1>
      <h3>By {author}</h3>
      <h3>Published in {publishedYear}</h3>
      <p>{description}</p>
    </div>
  )
}
export default ComicDetails;
