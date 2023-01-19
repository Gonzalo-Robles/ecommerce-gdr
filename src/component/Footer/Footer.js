const Footer = () => {
    return (
      <>
        <div style={{display: 'flex',  justifyContent:'center'}} >
          <div className="text-down mt-5">
            <p className="">
             Evaluacion de Coderhouse REACT JS{" "}
              {new Date().getFullYear()}
            </p>
            <p>
              Sitio creado por <span className="fw-bold">Gonzalo Robles</span>
            </p>
          </div>
        </div>
      </>
    );
  };
  
  export default Footer;