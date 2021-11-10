import './index.css'

const PasswordItem = props => {
  const {listsData, checkedBox, deletePwd} = props
  const {id, randomColors, website, username, pwd} = listsData

  const onDeleteBtn = () => {
    deletePwd(id)
  }

  return (
    <li className="list-container">
      <div className="list-display">
        <h1 className={`icon-color ${randomColors}`}>
          {website.toUpperCase()[0]}
        </h1>
        <div>
          <p className="website-title">{website}</p>
          <p className="username-desc">{username}</p>
          {checkedBox ? (
            <p>{pwd}</p>
          ) : (
            <img
              className="stars-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
      </div>
      <button
        testid="delete"
        onClick={onDeleteBtn}
        type="button"
        className="delete-btn"
      >
        <img
          className="delete-img"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
