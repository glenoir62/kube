import style from "./Loading.module.scss";

function Loading() {
  return (
    <div className="d-flex flex-row align-items-center justify-content-center flex-fill">
      <i className={`fa-solid fa-spinner ${style.spinner}`}></i>
    </div>
  );
}

export default Loading;
