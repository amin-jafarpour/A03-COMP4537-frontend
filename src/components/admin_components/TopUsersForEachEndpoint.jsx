import './TopUsersForEachEndpoint.css'
const TopUsersForEachEndpoint = ({info}) => {
    let count = 1;

   
    return ( <>
    <div>
        {info.map( item => (<div className="tufeep-entry" key={count++}><h4>{item.endpoint}</h4> <table><thead><tr>
<th>Username</th>
<th>Count</th>
</tr>
</thead>
<tbody>
 {item.usernames.map(entry => (<tr key={count++}>
    <td>{entry.username.length === 0 ? "Unknwon" : entry.username}</td>
    <td>{entry.count}</td>
  </tr>))}
  </tbody>
</table></div>))}
    </div>
    </> );
}
 
export default TopUsersForEachEndpoint;  


// {info.map( item => <div key={count++}><h4>{item.endpoint}</h4><table>{item.usernames.map(entry => (<tr key={count++} ><p>Username: {entry.username}</p> <p>Count: {entry.count}</p></tr>))}</table></div>)}