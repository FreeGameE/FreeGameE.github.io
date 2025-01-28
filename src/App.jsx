import Header from "./copmonents/Header";
import TaskInput from "./copmonents/TaskInput";

import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]); // храним данные, полученные с бэкенда
  const [loading, setLoading] = useState(true); // индикатор загрузки
  const [formAddData, setFormAddData] = useState({
    isDone: false,
    title: "",
    created: "",
    date: "",
  });
  const [allCount, setAllCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [inWorkCount, setInWorkCount] = useState(0);

  // функция для получения данных 123
  async function fetchData(status) {
    try {
      const response = await fetch(
        `https://easydev.club/api/v2/todos?filter=${status}`
      ); // запрос на бэкенд (all | completed | inWork)
      const result = await response.json(); // парсинг данных JSON

      const responseInfo = await fetch(`https://easydev.club/api/v2/todos`);
      const resultInfo = await responseInfo.json();
      setAllCount(resultInfo.info.all);
      setCompletedCount(resultInfo.info.completed);
      setInWorkCount(resultInfo.info.inWork);

      setData(result.data); // сохранение полученных данных
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setLoading(false); // скрыть индикатор загрузки
    }
  }

  // отправка данных на сервер
  async function updateData(status) {
    try {
      const response = await fetch("https://easydev.club/api/v2/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(formAddData),
      });
      if (response.ok) {
        // alert("Данные успешно обновлены!");
        fetchData(status); // обновляет данные после записи
      } else {
        alert("Ошибка при обновлении данных");
      }
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
    }
  }

  // удаление данных на сервере
  async function deleteData(id, activeStatusButton) {
    try {
      const response = await fetch(`https://easydev.club/api/v2/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // alert("Данные успешно удалены!");
        fetchData(activeStatusButton); // обновляет данные после удаления
      } else {
        alert("Ошибка при удалении данных");
      }
    } catch (error) {
      console.error("Ошибка при удалении данных:", error);
    } 
  }

  // изменение данных на сервере
  async function changeData(id, activeStatusButton) {
    try {
      const response = await fetch(`https://easydev.club/api/v2/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify(formAddData),
      });
      if (response.ok) {
        // alert("Данные успешно изменены!");
        fetchData(activeStatusButton); // обновляет данные после изменения
      } else {
        alert("Ошибка при изменении данных");
      }
    } catch (error) {
      console.error("Ошибка при изменении данных:", error);
    }
  }

  useEffect(() => {
    fetchData(); // загружаем данные при первом рендере
  }, []); // потому что в параметрах ничего не записано

  if (loading) {
    return <div>Загрузка...</div>; //
  }

  return (
    <>
      <Header />
      <section id="main-board">
        <TaskInput
          data={data}
          setFormAddData={setFormAddData}
          formAddData={formAddData}
          updateData={updateData}
          deleteData={deleteData}
          changeData={changeData}
          fetchData={fetchData}
          allCount={allCount}
          completedCount={completedCount}
          inWorkCount={inWorkCount}
          // maxId={maxId}
        />
      </section>
    </>
  );
}

export default App;
