const ErrorsAfter = ({info}) => {
    return ( <><div className="ea-entry">{info.map(item => (<p>{item.errorType}</p>))}</div></> );
}
 
export default ErrorsAfter;