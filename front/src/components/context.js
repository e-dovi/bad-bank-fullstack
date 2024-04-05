import { createContext } from "react";
export const UserContext = createContext(null);

function Card(props){
  function classes(){
    const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-dark';
    return 'card mb-3 ' + bg + txt;
  }

  return (
    <div className={classes()} id='crd' style={{maxWidth: "23rem"}}>
      <div className="card-header">{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title">{props.title}</h5>)}
        {props.text && (<p className="card-text">{props.text}</p>)}
        {props.body}
        {props.status && (<div id='createStatus' className="text-danger" style={{fontFamily:'monospace', fontSize:'large'}}>{props.status}</div>)}
        {props.success && (<div id='createStatus' className="text-success" style={{fontFamily:'monospace', fontSize:'large'}}>{props.success}</div>)}
      </div>
    </div>      
  );    
}

export {Card};