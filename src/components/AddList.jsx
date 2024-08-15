const AddList = ({title, body, handleOnChange, addPost}) => { 
  return (
  <div className="left-wrapper">
      <form onSubmit={addPost}>
          <div className="box">

          <div className="form-group">
              <label htmlFor="title" className="form-label">Title: </label>
              <input id="title" name="title" type="text" className="form-title" value={title} onChange={(e) => handleOnChange("title", e)}></input>
          </div>

          <div className="form-group">
              <label htmlFor="body" className="form-label">Body: </label>
              <input id="body" name="body" type="text" className="form-body" value={body} onChange={(e) => handleOnChange("body", e)}></input> 
          </div>        

          <button className="form-button" type="submit">
              Add to List
          </button>    

          </div>
      </form>
  </div>
  )

};



export default AddList;