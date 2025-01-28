import { useState } from "react";
import passed from "../../public/passed.png";
import emptyCircle from "../../public/empty-circle.png";
import edit from "../../public/edit.png";
import deleteImg from "../../public/delete.png";
import cancel from "../../public/cancel.png";
import accept from "../../public/accept.png";

export default function TaskInput({
  data,
  updateData,
  setFormAddData,
  formAddData,
  deleteData,
  changeData,
  fetchData,
  allCount,
  completedCount,
  inWorkCount,
}) {
  const [activeInput, setActiveInput] = useState("none");
  const [editingStatus, setEditingStatus] = useState("");
  const [activeStatusButton, setActiveStatusButton] = useState("all");

  return (
    <>
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

      {/* Для каждого элемента списка Todos создадим новый div с классом todo. Этот div будет содержать элементы с задачами */}
      <div className="todo-list">
        {data.map((todo) => (
          <div className="todo" key={todo.id}>
            <section className="left-side">
              <img
                src={todo.isDone ? passed : emptyCircle}
                style={{
                  width: "1rem",
                  height: "1rem",
                  marginRight: "0.6rem",
                }}
                onMouseEnter={() =>
                  setFormAddData({
                    isDone: true,
                    title: "",
                  })
                }
                onClick={() => {
                  changeData(todo.id, activeStatusButton);
                }}
              />
              {activeInput == todo.id ? (
                <>
                  <form
                    id={`change${todo.id}`}
                    onSubmit={(event) => {
                      event.preventDefault(); // предотвращаем перезагрузку страницы

                      {
                        formAddData.title.length >= 2
                          ? changeData(todo.id, activeStatusButton)
                          : alert("Текст должен быть от 2 до 64 символов");
                      }
                      {
                        formAddData.title.length >= 2
                          ? setActiveInput(undefined)
                          : undefined;
                      }
                      setFormAddData({
                        isDone: "",
                        title: "",
                      });
                    }}
                  >
                    <textarea
                      name="change-todo"
                      rows={5}
                      id={`input${todo.id}`}
                      defaultValue={todo.title}
                      maxLength={64}
                      required
                      onChange={(event) => {
                        setFormAddData({
                          title: event.target.value,
                        });
                      }}
                    />
                  </form>
                </>
              ) : (
                <p className="todo-text">{todo.title}</p>
              )}
            </section>
            <section className="right-side">
              {activeInput !== todo.id ? (
                <>
                  {/*//? кнопка редактирования */}
                  <button
                    className={
                      editingStatus == false
                        ? "edit-button"
                        : "edit-button unactive"
                    }
                    onClick={() => setActiveInput(todo.id)}
                    type="button"
                  >
                    <img src={edit} alt="Button for edit task." />
                  </button>
                </>
              ) : (
                <>
                  {/*//* кнопка отменить изменения */}
                  <button
                    className="cancel-button"
                    onClick={() => setActiveInput(undefined)}
                    type="button"
                  >
                    <img src={cancel} alt="Button for edit task." />
                  </button>

                  {/*// кнопка принять изменеия */}
                  <button
                    form={`change${todo.id}`}
                    className="accept-button"
                    type="submit"
                  >
                    <img src={accept} alt="Button for edit task." />
                  </button>
                </>
              )}

              {/*//# кнопка удаления */}
              <button
                className={
                  editingStatus == false
                    ? "delete-button"
                    : "delete-button unactive"
                }
                onClick={() => deleteData(todo.id, activeStatusButton)}
              >
                <img src={deleteImg} alt="Button for delete task." />
              </button>
            </section>
          </div>
        ))}
      </div>
    </>
  );
}
