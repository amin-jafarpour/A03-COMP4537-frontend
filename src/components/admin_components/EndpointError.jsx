const EndpointError = ({info}) => {
    let count = 0;
    return ( <>
    <div>
        
<table>
  <thead>
    <tr>
      <th>Endpoint</th>
      <th>Errors</th>
    </tr>
  </thead>
  <tbody>
    {info.map(item => (    <tr key={count++}>
      <td>{item.endpoint}</td>
      <td>{item.errorTypes.join()}</td>
    </tr>))}
  </tbody>
</table>
    </div>
    </> );
}
 
export default EndpointError;




