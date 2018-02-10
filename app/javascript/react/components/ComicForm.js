import React from 'react';

const ComicForm = (props) => {

  return(
    <div>
      <label id="title">Title</label>
      <input
        type="text"
        name="title"
        value={props.title}
        onChange={props.handleTitleChange}
      ></input>
      <label id="author">Author</label>
      <input
        type="text"
        name="author"
        value={props.author}
        onChange={props.handleAuthorChange}
      ></input>
      <label id="description">Summary</label>
      <input
        type="text"
        name="description"
        value={props.description}
        onChange={props.handleDescriptionChange}
      ></input>
      <label id="publishedYear">Year of Publication</label>
      <input type="text"
        name="publishedYear"
        value={props.publishedYear}
        onChange={props.handlePublishedYearChange}
      ></input>
    </div>
  )
}
export default ComicForm;
