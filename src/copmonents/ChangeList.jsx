export default function ChangeList({
  fetchData,
  allCount,
  completedCount,
  inWorkCount,
  activeStatusButton,
  setActiveStatusButton,
}) {


  return (
    <div className="todoStatus">
      <button
        className={activeStatusButton == "all" ? "active" : undefined}
        onClick={() => {
          fetchData("all"), setActiveStatusButton("all");
        }}
      >
        Все ({allCount})
      </button>
      <button
        className={activeStatusButton == "inWork" ? "active" : undefined}
        onClick={() => {
          fetchData("inWork"), setActiveStatusButton("inWork");
        }}
      >
        В прогрессе ({inWorkCount})
      </button>
      <button
        className={activeStatusButton == "completed" ? "active" : undefined}
        onClick={() => {
          fetchData("completed"), setActiveStatusButton("completed");
        }}
      >
        Завершенные ({completedCount})
      </button>
    </div>
  );
}
