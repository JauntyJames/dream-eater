import React from 'react';

const ComicForm = (props) => {

  return(
    <div id="new-comic-form">
      <label>Title</label>
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
      <label id="publishedYear">Year of Publication</label>
      <input type="text"
        name="publishedYear"
        value={props.publishedYear}
        onChange={props.handlePublishedYearChange}
        ></input>
      <label id="description">Summary</label>
      <textarea
        type="text"
        name="description"
        value={props.description}
        onChange={props.handleDescriptionChange}
      ></textarea>
    </div>
  )
}
export default ComicForm;
