import React from 'react';

const UserDetails = (props) => {
  let email
  let profile_photo
  let fullDate
  const MonthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

  if (props.user) {
    email = props.user.email
    profile_photo = props.user.profile_photo.url
    let created = new Date(props.user.created_at)
    let month = MonthNames[created.getMonth()]
    fullDate = month + " " + created.getDate() + ", " + created.getFullYear()
  }

  return(
    <div>
      <h1>User Details</h1>
        <img src={profile_photo} width="100" height="100" className="avatar"></img>
        <p>Email: {email}</p>
        <p>User since: {fullDate}</p>
    </div>
  )
}
export default UserDetails;
