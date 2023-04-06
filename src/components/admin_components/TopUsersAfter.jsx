import './TopUsersAfter.css'

const TopUsersAfter = ({info}) => {
    let count = 1;
    return ( <>
    <div>
    <table>
  <thead>
    <tr>
      <th>Username</th>
      <th>Count</th>
    </tr>
  </thead>
  <tbody>
    {info.map(item => ( <tr key={count++}>
      <td>{item.username.length === 0 ? "Unknwon" : item.username}</td>
      <td>{item.count}</td>
    </tr>))}
   
  </tbody>
</table>
    </div>
    </> );
}
 
export default TopUsersAfter;



