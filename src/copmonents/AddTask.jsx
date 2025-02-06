export default function AddTask({
  updateData,
  setFormAddData,
  formAddData,
  activeStatusButton,
}) {
  return (
    <form
      id="add-todo-form"
      className="new-todo"
      onSubmit={(event) => {
        event.preventDefault(); // предотвращаем перезагрузку страницы
        setFormAddData({
          isDone: "",
          title: "",
        });
        {
          formAddData.title.length >= 2
            ? updateData(activeStatusButton)
            : alert("Текст должен быть от 2 до 64 символов");
        }

        {
          formAddData.title.length >= 2 ? event.target.reset() : undefined;
        }
      }}
    >
      <input
        maxLength={64}
        required
        type="text"
        name="todo"
        placeholder="Ваша задача"
        className="new-todo"
        onChange={(event) => {
          setFormAddData({
            title: event.target.value,
          });
        }}
      />
      <button id="add-button">Добавить</button>
    </form>
  );
}
