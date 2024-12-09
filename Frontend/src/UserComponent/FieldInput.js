
const FieldInput = (props) => {
    const { placeholder, id, manage_request, err, type, label,value } = props;

    // Check if there is an error for this specific field
    const hasError = err && err[id];

    return (
        <div style={{ position: "relative", width: "100%" }}>
            <label
                htmlFor={id} 
                className="control-label required"
                style={{
                    position: "absolute",
                    top: "-10px", 
                    left: "0px",
                    background: "white", // Add background to make it stand out
                    padding: "0 5px",
                    fontWeight: "bold",
                    color: "#333",
                    fontSize: "12px",
                }}
            >
                {label}
            </label>
            <input
                id={id} // Ensure input id matches label's htmlFor
                style={{
                    fontWeight: "bold",
                    color: 'gray',
                    width: "100%",
                    padding: "10px",
                    border: `1px solid ${hasError ? 'red' : '#ccc'}`, // Conditionally set the border color
                    borderRadius: "4px",
                    boxSizing: "border-box",
                }}
                type={type ? type : "text"}
                placeholder={placeholder}
                value={ value ? value : ""}
                required
                onChange={(e) => {
                    const value = e.target.value;
                    
                    if (manage_request) manage_request({ value, id });
                }}
            />
            <div style={{ color: "red", fontWeight: "bold" }}>
                {hasError ? err[id] : ""}
            </div>
            <br />
        </div>
    );
};

export default FieldInput;
