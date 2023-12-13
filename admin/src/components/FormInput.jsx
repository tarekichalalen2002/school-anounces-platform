const FormInput = (props) =>{

    return(

        <div className="FormInput">
        <label className="FormInput-title">{props.formInputTitle}</label>
        <input
          className="FormInput-input"
          type={props.type || 'text'}  
          name={props.formInputTitle}
          placeholder={props.formInputLabel}
          value={props.value}           
          onChange={props.onChange}     
        />
      </div>
    )
}

export default FormInput;