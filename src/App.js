import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from './PasswordItem'
import './App.css'

const colors = [
  'red',
  'yellow',
  'blue',
  'green',
  'orange',
  'purple',
  'skyblue',
  'greenyellow',
]

class App extends Component {
  state = {
    pwdLists: [],
    website: '',
    username: '',
    pwd: '',
    checkedBox: false,
    searchInput: '',
  }

  changeWebsite = event => {
    this.setState({website: event.target.value})
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({pwd: event.target.value})
  }

  onAddPwd = event => {
    event.preventDefault()
    const {website, username, pwd} = this.state
    const colorNumber = colors.length - 1

    const randomColors = colors[Math.ceil(Math.random() * colorNumber)]
    const addList = {
      id: v4(),
      randomColors,
      website,
      username,
      pwd,
    }
    this.setState(prevState => ({
      pwdLists: [...prevState.pwdLists, addList],
      website: '',
      username: '',
      pwd: '',
    }))
  }

  onChecked = () => {
    this.setState(prevState => ({
      checkedBox: !prevState.checkedBox,
    }))
  }

  onSearchValue = event => {
    this.setState({searchInput: event.target.value})
  }

  deletePwd = id => {
    const {pwdLists} = this.state
    const selectData = pwdLists.filter(eachItem => eachItem.id !== id)
    this.setState({pwdLists: selectData})
  }

  render() {
    const {
      pwdLists,
      website,
      pwd,
      username,
      checkedBox,
      searchInput,
    } = this.state

    const filteredLists = pwdLists.filter(eachData =>
      eachData.website.toLowerCase().includes(searchInput),
    )

    return (
      <div className="main-app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-img"
        />

        <div className="large-main-container">
          <img
            className="small-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
          <img
            className="large-image"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
          />
          <form onSubmit={this.onAddPwd} className="pwd-form-container">
            <h1 className="pwd-title">Add New Password</h1>
            <div className="inputs-container">
              <img
                className="logos"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                onChange={this.changeWebsite}
                type="text"
                placeholder="Enter Website"
                value={website}
                className="input-element"
              />
            </div>
            <div className="inputs-container">
              <img
                className="logos"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                value={username}
                onChange={this.changeUsername}
                placeholder="Enter Username"
                className="input-element"
              />
            </div>
            <div className="inputs-container">
              <img
                className="logos"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                value={pwd}
                onChange={this.changePassword}
                placeholder="Enter Password"
                className="input-element"
              />
            </div>
            <div className="adjust-btn">
              <button type="submit" className="add-Btn">
                Add
              </button>
            </div>
          </form>
        </div>

        <div className="large-pwd-container height">
          <div className="display-pwd-heading">
            <div className="display">
              <h1 className="pwd-title">Your Passwords</h1>
              <p className="pwd-count">{pwdLists.length}</p>
            </div>
            <div className="search-container">
              <img
                className="search-img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                value={searchInput}
                onChange={this.onSearchValue}
                className="search-element"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-pwd">
            <input
              onChange={this.onChecked}
              checked={checkedBox}
              type="checkbox"
              className="checkbox"
              id="checkbox"
            />
            <label className="label-title" htmlFor="checkbox">
              Show passwords
            </label>
          </div>
          {filteredLists.length > 0 ? (
            <ul className="ul-container">
              {filteredLists.map(eachList => (
                <PasswordItem
                  deletePwd={this.deletePwd}
                  checkedBox={checkedBox}
                  key={eachList.id}
                  listsData={eachList}
                />
              ))}
            </ul>
          ) : (
            <>
              <img
                className="no-pwd-image"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="no-pwd-title">No Passwords</p>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default App
