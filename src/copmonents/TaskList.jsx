import TaskItem from "./TaskItem";

export default function TaskList({
  data,
  setFormAddData,
  formAddData,
  deleteData,
  changeData,
  activeStatusButton
}) {
  return (
    <>
      {/* Для каждого элемента списка Todos создадим новый div с классом todo. Этот div будет содержать элементы с задача */}
      <div className="todo-list">
        {data.map((todo) => (
          <TaskItem
            key={`item ${todo.id}`}
            todo={todo}
            setFormAddData={setFormAddData}
            formAddData={formAddData}
            deleteData={deleteData}
            changeData={changeData}
            activeStatusButton={activeStatusButton}
          />
        ))}
      </div>
    </>
  );
}
