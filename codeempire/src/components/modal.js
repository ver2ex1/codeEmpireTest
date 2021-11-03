import "../modal.css";

export const Modal = ({
  active,
  setActive,
  name,
  confirmed,
  recovered,
  death,
}) => {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div className="modalContent">
        <h1>{name}</h1>
        <div className="modalInfo">
          <div className="modalData">
            <img src="../img/confirmed.png" alt="" width="20px" />
            <span>Total confirmed</span>
            <span>{confirmed}</span>
          </div>
          <div className="modalData">
            <img src="../img/death.png" alt="" width="20px" />
            <span>Total deaths</span>
            <span>{death}</span>
          </div>
          <div className="modalData">
            <img src="../img/recovered.png" alt="" width="15px" />
            <span>Total recovered</span>
            <span>{recovered}</span>
          </div>
        </div>
        <button className="btn" onClick={() => setActive(false)}>
          Ok
        </button>
      </div>
    </div>
  );
};
