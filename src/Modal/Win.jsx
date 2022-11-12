import winImg from "../assets/img/win.gif";

function Win() {
  return (
    <>
      <div className="winMessage">
        <h2>Нічосі, ви перемогли</h2>
        <img src={winImg} alt="you win" />
      </div>
    </>
  );
}

export default Win;
