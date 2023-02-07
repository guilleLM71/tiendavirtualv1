import React from "react";

export default function Modal({tbtn,title,children}) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="btn-modal"
        type="button"
        onClick={() => setShowModal(true)}
      >
       { tbtn}
      </button>
      {showModal ? (
        <>
          <div className="cont-model">
            <div className="">
              {/*content*/}
              <div className="card-cont-model">
                {/*header*/}
                <div className="header-modal">
                  <h3 className="title-modal">
                    {title}
                  </h3>
                  <button
                    className="btn-close-modal"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-close-modal">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="body-modal">
                  {children}
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="bg-model"></div>
        </>
      ) : null}
    </>
  );
}